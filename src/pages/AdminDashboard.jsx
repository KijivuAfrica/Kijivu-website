import { useState, useEffect } from 'react';
import { Package, ShoppingBag, Users, TrendingUp, Plus, Check, X, Download, MessageCircle, DollarSign, Truck } from 'lucide-react';
import { supabase } from '../lib/supabase';

const DELIVERY_COORDINATOR = '254708014547';

const STATUS_LABELS = {
  pending_payment:  'Awaiting Deposit',
  deposit_received: 'Deposit Received',
  out_for_delivery: 'Out for Delivery',
  delivered:        'Delivered',
  cancelled:        'Cancelled',
};

const STATUS_COLORS = {
  pending_payment:  'bg-yellow-50 text-yellow-800 border-yellow-300',
  deposit_received: 'bg-blue-50 text-blue-800 border-blue-300',
  out_for_delivery: 'bg-purple-50 text-purple-800 border-purple-300',
  delivered:        'bg-green-100 text-green-800 border-green-300',
  cancelled:        'bg-red-100 text-red-800 border-red-300',
};

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [stock, setStock] = useState([]);
  const [orders, setOrders] = useState([]);
  const [savingStock, setSavingStock] = useState({});

  useEffect(() => {
    supabase.from('product_stock').select('*').order('product_id').then(({ data }) => {
      if (data) setStock(data);
    });
    supabase.from('orders').select('*').order('created_at', { ascending: false }).then(({ data }) => {
      if (data) setOrders(data);
    });
  }, []);

  const updateStockQty = async (productId, newQty) => {
    if (newQty < 0) return;
    setStock(prev => prev.map(s => s.product_id === productId ? { ...s, quantity: newQty } : s));
    setSavingStock(prev => ({ ...prev, [productId]: true }));
    await supabase.from('product_stock').update({ quantity: newQty, updated_at: new Date().toISOString() }).eq('product_id', productId);
    setSavingStock(prev => ({ ...prev, [productId]: false }));
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, payment_status: newStatus } : o));
    await supabase.from('orders').update({ payment_status: newStatus }).eq('id', orderId);
  };

  // WhatsApp to delivery coordinator with order details
  const coordinatorWhatsApp = (order) => {
    const deposit  = Math.ceil((order.total_amount || 0) / 2);
    const balance  = (order.total_amount || 0) - deposit;
    const itemList = (order.items || []).map(i => `${i.name} x${i.quantity}`).join(', ');
    const msg = encodeURIComponent(
      `*New Kijivu Delivery 📦*\n\nCustomer: ${order.customer_name}\nPhone: ${order.customer_phone}\nAddress: ${order.delivery_address}, ${order.delivery_city}, ${order.delivery_country}\n\nItems: ${itemList}\n\nBalance to collect: KES ${balance.toLocaleString()}\n(+ your delivery fee, agreed with customer)\n\nPlease confirm and contact the customer to arrange delivery. Thank you!`
    );
    return `https://wa.me/${DELIVERY_COORDINATOR}?text=${msg}`;
  };

  // WhatsApp to customer with delivery update
  const customerWhatsApp = (order, stage) => {
    const balance = (order.total_amount || 0) - Math.ceil((order.total_amount || 0) / 2);
    const msgs = {
      out_for_delivery: encodeURIComponent(
        `Hi ${order.customer_name}! 👋 Your Kijivu order is on its way!\n\nOur delivery team will reach you shortly. Please have KES ${balance.toLocaleString()} ready for the balance + the delivery fee for the rider.\n\nAny questions? Just reply here!\n\n– Team Kijivu 🌿`
      ),
      delivered: encodeURIComponent(
        `Hi ${order.customer_name}! ✅ Your Kijivu order has been delivered. We hope you love it!\n\nDon't forget to follow us on Instagram & TikTok @kijivu_ for wellness tips. Thank you for shopping with us! 🌿`
      ),
    };
    const phone = (order.customer_phone || '').replace(/[\s+\-()]/g, '');
    return `https://wa.me/${phone}?text=${msgs[stage] || ''}`;
  };

  const totalRevenue = orders.filter(o => o.payment_status === 'delivered').reduce((s, o) => s + (o.total_amount || 0), 0);
  const stats = {
    totalRevenue,
    totalOrders:   orders.length,
    totalProducts: stock.length,
    inStock:       stock.filter(s => s.quantity > 0).length,
  };

  return (
    <div className="min-h-screen bg-[#E8E6E1]">
      {/* Header */}
      <header className="bg-[#2C3539] text-white py-6 px-6 lg:px-12">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src="/Kijivu Logo Design.png" alt="Kijivu" style={{ height: '44px', width: 'auto', filter: 'brightness(0) invert(1)' }} />
            <div>
              <h1 className="text-2xl font-black">ADMIN</h1>
              <p className="text-sm text-white/60 font-medium">Manage your store</p>
            </div>
          </div>
          <a href="/" className="bg-white text-[#2C3539] px-6 py-3 font-black hover:bg-[#87A96B] hover:text-white transition-all">
            VIEW STORE
          </a>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-[#2C3539]/10 min-h-screen p-6">
          <nav className="space-y-2">
            {[
              { id: 'overview',  label: 'OVERVIEW',  Icon: TrendingUp },
              { id: 'products',  label: 'PRODUCTS',  Icon: Package },
              { id: 'orders',    label: 'ORDERS',    Icon: ShoppingBag },
              { id: 'customers', label: 'CUSTOMERS', Icon: Users },
            ].map(({ id, label, Icon }) => (
              <button key={id} onClick={() => setActiveTab(id)}
                className={`w-full flex items-center gap-3 px-4 py-3 font-bold transition-all ${
                  activeTab === id ? 'bg-[#87A96B] text-white' : 'text-[#2C3539] hover:bg-[#87A96B]/10'
                }`}>
                <Icon className="w-5 h-5" /> {label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-12">

          {/* ── OVERVIEW ── */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <h2 className="text-4xl font-black text-[#2C3539]">dashboard overview</h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-black text-[#2C3539]/60 uppercase">Total Revenue</p>
                    <DollarSign className="w-8 h-8 text-[#87A96B]" />
                  </div>
                  <p className="text-3xl font-black text-[#2C3539]">KES {stats.totalRevenue.toLocaleString()}</p>
                  <p className="text-sm font-medium text-[#2C3539]/50">from delivered orders</p>
                </div>
                <div className="bg-white p-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-black text-[#2C3539]/60 uppercase">Total Orders</p>
                    <ShoppingBag className="w-8 h-8 text-[#87A96B]" />
                  </div>
                  <p className="text-3xl font-black text-[#2C3539]">{stats.totalOrders}</p>
                  <p className="text-sm font-medium text-[#2C3539]/50">all time</p>
                </div>
                <div className="bg-white p-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-black text-[#2C3539]/60 uppercase">Products</p>
                    <Package className="w-8 h-8 text-[#87A96B]" />
                  </div>
                  <p className="text-3xl font-black text-[#2C3539]">{stats.totalProducts}</p>
                  <p className="text-sm font-medium text-[#2C3539]/50">{stats.inStock} in stock</p>
                </div>
                <div className="bg-white p-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-black text-[#2C3539]/60 uppercase">Customers</p>
                    <Users className="w-8 h-8 text-[#87A96B]" />
                  </div>
                  <p className="text-3xl font-black text-[#2C3539]">{stats.totalOrders}</p>
                  <p className="text-sm font-medium text-[#2C3539]/50">unique customers</p>
                </div>
              </div>

              {/* Recent Orders */}
              <div className="bg-white p-8">
                <h3 className="text-2xl font-black text-[#2C3539] mb-6">recent orders</h3>
                <div className="space-y-4">
                  {orders.slice(0, 5).map(order => (
                    <div key={order.id} className="flex items-center justify-between p-4 border border-[#2C3539]/10 hover:border-[#87A96B] transition-all">
                      <div className="flex-1">
                        <p className="font-black text-[#2C3539] font-mono">{order.id?.slice(0, 8)}…</p>
                        <p className="text-sm text-[#2C3539]/60 font-medium">
                          {order.customer_name} · {new Date(order.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right mr-6">
                        <p className="font-black text-[#2C3539]">KES {(order.total_amount || 0).toLocaleString()}</p>
                      </div>
                      <span className={`px-4 py-2 text-xs font-black border-2 ${STATUS_COLORS[order.payment_status] || 'bg-gray-100 text-gray-800 border-gray-200'}`}>
                        {STATUS_LABELS[order.payment_status] || (order.payment_status || 'pending').toUpperCase()}
                      </span>
                    </div>
                  ))}
                  {orders.length === 0 && <p className="text-[#2C3539]/50 font-medium">No orders yet.</p>}
                </div>
              </div>
            </div>
          )}

          {/* ── PRODUCTS ── */}
          {activeTab === 'products' && (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <h2 className="text-4xl font-black text-[#2C3539]">stock management</h2>
                <button onClick={() => setShowAddProduct(true)}
                  className="bg-[#2C3539] text-white px-6 py-3 font-black hover:bg-[#87A96B] transition-all flex items-center gap-2">
                  <Plus className="w-5 h-5" /> ADD PRODUCT
                </button>
              </div>

              <div className="bg-white overflow-hidden">
                <table className="w-full">
                  <thead className="bg-[#2C3539] text-white">
                    <tr>
                      <th className="text-left p-4 font-black uppercase text-sm">Product</th>
                      <th className="text-left p-4 font-black uppercase text-sm">Qty in Stock</th>
                      <th className="text-left p-4 font-black uppercase text-sm">Status</th>
                      <th className="text-left p-4 font-black uppercase text-sm">Last Updated</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stock.map((item, index) => (
                      <tr key={item.product_id} className={`border-b border-[#2C3539]/10 ${index % 2 === 0 ? 'bg-white' : 'bg-[#E8E6E1]/30'}`}>
                        <td className="p-4 font-bold text-[#2C3539]">{item.product_name}</td>
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <button onClick={() => updateStockQty(item.product_id, item.quantity - 1)}
                              className="w-8 h-8 bg-[#2C3539] text-white font-black flex items-center justify-center hover:bg-[#87A96B] transition-all">−</button>
                            <span className="font-black text-[#2C3539] w-8 text-center text-lg">{item.quantity}</span>
                            <button onClick={() => updateStockQty(item.product_id, item.quantity + 1)}
                              className="w-8 h-8 bg-[#2C3539] text-white font-black flex items-center justify-center hover:bg-[#87A96B] transition-all">+</button>
                            {savingStock[item.product_id] && <span className="text-xs text-[#87A96B] font-medium">saving…</span>}
                          </div>
                        </td>
                        <td className="p-4">
                          <span className={`px-3 py-1 text-xs font-black ${item.quantity > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {item.quantity > 0 ? 'IN STOCK' : 'OUT OF STOCK'}
                          </span>
                        </td>
                        <td className="p-4 text-sm text-[#2C3539]/60 font-medium">
                          {new Date(item.updated_at).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-[#2C3539]/50">Changes save automatically.</p>
            </div>
          )}

          {/* ── ORDERS ── */}
          {activeTab === 'orders' && (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <h2 className="text-4xl font-black text-[#2C3539]">orders</h2>
                <button className="bg-[#2C3539] text-white px-6 py-3 font-black hover:bg-[#87A96B] transition-all flex items-center gap-2">
                  <Download className="w-5 h-5" /> EXPORT
                </button>
              </div>

              {/* Delivery pipeline legend */}
              <div className="bg-white p-4 flex gap-2 items-center flex-wrap text-xs font-bold">
                <span className="text-[#2C3539]/40 uppercase mr-2">Pipeline:</span>
                {Object.entries(STATUS_LABELS).map(([key, label], i, arr) => (
                  <span key={key} className="flex items-center gap-1">
                    <span className={`px-2 py-1 border ${STATUS_COLORS[key]}`}>{label}</span>
                    {i < arr.length - 2 && <span className="text-[#2C3539]/30">→</span>}
                  </span>
                ))}
              </div>

              {orders.length === 0 ? (
                <div className="bg-white p-8 text-center text-[#2C3539]/50 font-medium">No orders yet.</div>
              ) : (
                <div className="space-y-4">
                  {orders.map(order => {
                    const deposit = Math.ceil((order.total_amount || 0) / 2);
                    const balance = (order.total_amount || 0) - deposit;
                    const st = order.payment_status || 'pending_payment';

                    return (
                      <div key={order.id} className="bg-white p-6 space-y-4">
                        <div className="flex items-start justify-between">
                          <div className="space-y-2">
                            <div className="flex items-center gap-3 flex-wrap">
                              <h3 className="text-base font-black text-[#2C3539] font-mono">{order.id?.slice(0, 8)}…</h3>
                              <span className={`px-3 py-1 text-xs font-black border-2 ${STATUS_COLORS[st] || 'bg-gray-100 text-gray-800 border-gray-200'}`}>
                                {STATUS_LABELS[st] || st.toUpperCase()}
                              </span>
                            </div>
                            <p className="text-sm text-[#2C3539]/60 font-medium">{new Date(order.created_at).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-black text-[#87A96B]">KES {(order.total_amount || 0).toLocaleString()}</p>
                            <p className="text-xs text-[#2C3539]/50 font-medium">Deposit: KES {deposit.toLocaleString()} · Balance: KES {balance.toLocaleString()}</p>
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6 pt-4 border-t border-[#2C3539]/10">
                          <div className="space-y-1">
                            <p className="text-xs font-black text-[#2C3539]/60 uppercase mb-2">Customer</p>
                            <p className="font-bold text-[#2C3539]">{order.customer_name}</p>
                            <p className="text-sm text-[#2C3539]/60 font-medium">{order.customer_phone}</p>
                            {order.customer_email && <p className="text-sm text-[#2C3539]/60 font-medium">{order.customer_email}</p>}
                          </div>
                          <div className="space-y-1">
                            <p className="text-xs font-black text-[#2C3539]/60 uppercase mb-2">Delivery</p>
                            <p className="font-bold text-[#2C3539]">{order.delivery_city}, {order.delivery_country}</p>
                            <p className="text-sm text-[#2C3539]/60 font-medium">{order.delivery_address}</p>
                          </div>
                        </div>

                        {order.items && (
                          <div className="pt-4 border-t border-[#2C3539]/10">
                            <p className="text-xs font-black text-[#2C3539]/60 uppercase mb-2">Items</p>
                            {order.items.map((item, idx) => (
                              <p key={idx} className="text-sm font-medium text-[#2C3539]">
                                · {item.name} × {item.quantity} — KES {(item.price * item.quantity).toLocaleString()}
                              </p>
                            ))}
                          </div>
                        )}

                        {order.notes && (
                          <p className="text-sm text-[#2C3539]/60 italic">Note: {order.notes}</p>
                        )}

                        {/* ── Action Buttons based on status ── */}
                        <div className="pt-4 border-t border-[#2C3539]/10">
                          <p className="text-xs font-black text-[#2C3539]/40 uppercase mb-3">Actions</p>
                          <div className="flex gap-3 flex-wrap">

                            {/* Step 1: Confirm deposit received */}
                            {st === 'pending_payment' && (
                              <button onClick={() => updateOrderStatus(order.id, 'deposit_received')}
                                className="bg-blue-600 text-white px-4 py-2 text-sm font-black hover:bg-blue-700 transition-all flex items-center gap-2">
                                <Check className="w-4 h-4" /> DEPOSIT RECEIVED
                              </button>
                            )}

                            {/* Step 2: Notify delivery coordinator, then mark out for delivery */}
                            {st === 'deposit_received' && (
                              <>
                                <a href={coordinatorWhatsApp(order)} target="_blank" rel="noopener noreferrer"
                                  className="bg-[#25D366] text-white px-4 py-2 text-sm font-black hover:opacity-90 transition-all flex items-center gap-2">
                                  <Truck className="w-4 h-4" /> NOTIFY DELIVERY TEAM
                                </a>
                                <button onClick={() => updateOrderStatus(order.id, 'out_for_delivery')}
                                  className="bg-purple-600 text-white px-4 py-2 text-sm font-black hover:bg-purple-700 transition-all flex items-center gap-2">
                                  <Truck className="w-4 h-4" /> MARK OUT FOR DELIVERY
                                </button>
                              </>
                            )}

                            {/* Step 3: Notify customer, mark delivered */}
                            {st === 'out_for_delivery' && (
                              <>
                                <a href={customerWhatsApp(order, 'out_for_delivery')} target="_blank" rel="noopener noreferrer"
                                  className="bg-[#25D366] text-white px-4 py-2 text-sm font-black hover:opacity-90 transition-all flex items-center gap-2">
                                  <MessageCircle className="w-4 h-4" /> NOTIFY CUSTOMER
                                </a>
                                <button onClick={() => updateOrderStatus(order.id, 'delivered')}
                                  className="bg-green-600 text-white px-4 py-2 text-sm font-black hover:bg-green-700 transition-all flex items-center gap-2">
                                  <Check className="w-4 h-4" /> MARK DELIVERED
                                </button>
                              </>
                            )}

                            {/* Step 4: Send thank-you */}
                            {st === 'delivered' && (
                              <a href={customerWhatsApp(order, 'delivered')} target="_blank" rel="noopener noreferrer"
                                className="bg-[#87A96B] text-white px-4 py-2 text-sm font-black hover:opacity-90 transition-all flex items-center gap-2">
                                <MessageCircle className="w-4 h-4" /> SEND THANK-YOU
                              </a>
                            )}

                            {/* Cancel (always available unless delivered) */}
                            {st !== 'delivered' && st !== 'cancelled' && (
                              <button onClick={() => updateOrderStatus(order.id, 'cancelled')}
                                className="border-2 border-red-300 text-red-600 px-4 py-2 text-sm font-black hover:bg-red-50 transition-all flex items-center gap-2">
                                <X className="w-4 h-4" /> CANCEL
                              </button>
                            )}

                            {/* WhatsApp customer (always) */}
                            <a href={`https://wa.me/${(order.customer_phone || '').replace(/[\s+\-()]/g, '')}`}
                              target="_blank" rel="noopener noreferrer"
                              className="border-2 border-[#2C3539]/20 text-[#2C3539] px-4 py-2 text-sm font-black hover:bg-[#2C3539]/5 transition-all flex items-center gap-2">
                              <MessageCircle className="w-4 h-4" /> WHATSAPP CUSTOMER
                            </a>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* ── CUSTOMERS ── */}
          {activeTab === 'customers' && (
            <div className="space-y-8">
              <h2 className="text-4xl font-black text-[#2C3539]">customers</h2>
              <div className="bg-white p-8">
                <p className="text-lg text-[#2C3539]/60 font-medium">
                  View customer details in the Orders tab. Full customer management coming soon.
                </p>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Add Product Modal */}
      {showAddProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50">
          <div className="bg-white max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-3xl font-black text-[#2C3539]">add new product</h3>
              <button onClick={() => setShowAddProduct(false)} className="p-2 hover:bg-[#2C3539]/10 transition-all">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-black text-[#2C3539] mb-2 uppercase">Product Name *</label>
                <input type="text" className="w-full border-2 border-[#2C3539]/20 p-4 focus:border-[#87A96B] focus:outline-none" />
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-black text-[#2C3539] mb-2 uppercase">Price (KES) *</label>
                  <input type="number" className="w-full border-2 border-[#2C3539]/20 p-4 focus:border-[#87A96B] focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-black text-[#2C3539] mb-2 uppercase">Stock Quantity *</label>
                  <input type="number" className="w-full border-2 border-[#2C3539]/20 p-4 focus:border-[#87A96B] focus:outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-black text-[#2C3539] mb-2 uppercase">Category *</label>
                <select className="w-full border-2 border-[#2C3539]/20 p-4 focus:border-[#87A96B] focus:outline-none bg-white">
                  <option>Hair Growth</option>
                  <option>Kids Health</option>
                  <option>Maternal Health</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-black text-[#2C3539] mb-2 uppercase">Description</label>
                <textarea rows={4} className="w-full border-2 border-[#2C3539]/20 p-4 focus:border-[#87A96B] focus:outline-none resize-none"></textarea>
              </div>
              <div className="flex gap-4">
                <button onClick={() => setShowAddProduct(false)} className="flex-1 bg-[#2C3539] text-white py-4 font-black hover:bg-[#87A96B] transition-all">
                  ADD PRODUCT
                </button>
                <button onClick={() => setShowAddProduct(false)} className="px-8 border-2 border-[#2C3539]/20 text-[#2C3539] py-4 font-black hover:bg-[#2C3539]/10 transition-all">
                  CANCEL
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
