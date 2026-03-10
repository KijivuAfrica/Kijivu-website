import React, { useState } from 'react';
import { Package, ShoppingBag, Users, TrendingUp, Plus, Edit, Trash2, Check, X, Download, MessageCircle, DollarSign } from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showAddProduct, setShowAddProduct] = useState(false);

  const stats = {
    totalRevenue: 1250000,
    totalOrders: 156,
    totalProducts: 5,
    totalCustomers: 142
  };

  const [products, setProducts] = useState([
    {
      id: 1,
      name: "MaryRuth Peach Mango Liquid Hair Supplement",
      price: 7499,
      stock: 45,
      category: "Hair Growth",
      status: "In Stock",
      sold: 89
    },
    {
      id: 2,
      name: "MaryRuth Dragon Fruit Liquid Hair Supplement",
      price: 7499,
      stock: 0,
      category: "Hair Growth",
      status: "Out of Stock",
      sold: 23
    },
    {
      id: 3,
      name: "Kids Immunity Gummies",
      price: 4000,
      stock: 67,
      category: "Kids Health",
      status: "In Stock",
      sold: 34
    },
    {
      id: 4,
      name: "Prenatal & Postnatal Gummies",
      price: 5500,
      stock: 52,
      category: "Maternal Health",
      status: "In Stock",
      sold: 28
    }
  ]);

  const [orders, setOrders] = useState([
    {
      id: "ORD-2026-001",
      customer: "Amina Kimani",
      email: "amina.k@email.com",
      phone: "+254712345678",
      items: ["MaryRuth Peach Mango (x2)", "Kids Immunity Gummies (x1)"],
      total: 18998,
      status: "Pending",
      location: "Nairobi CBD",
      deliveryFee: 200,
      paymentMethod: "M-Pesa",
      date: "2026-03-09",
      address: "Lavington, Nairobi"
    },
    {
      id: "ORD-2026-002",
      customer: "Sarah Wanjiku",
      email: "sarah.w@email.com",
      phone: "+254722456789",
      items: ["Prenatal Gummies (x2)"],
      total: 11350,
      status: "Shipped",
      location: "Westlands",
      deliveryFee: 350,
      paymentMethod: "Card",
      date: "2026-03-08",
      address: "Westlands, Nairobi"
    },
    {
      id: "ORD-2026-003",
      customer: "Grace Atieno",
      email: "grace.a@email.com",
      phone: "+256701234567",
      items: ["MaryRuth Peach Mango (x1)"],
      total: 8499,
      status: "Delivered",
      location: "Kampala",
      deliveryFee: 1000,
      paymentMethod: "M-Pesa",
      date: "2026-03-07",
      address: "Kololo, Kampala"
    }
  ]);

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const deleteProduct = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== productId));
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Shipped': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Delivered': return 'bg-green-100 text-green-800 border-green-200';
      case 'Cancelled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-[#E8E6E1]">
      {/* Header */}
      <header className="bg-[#2C3539] text-white py-6 px-6 lg:px-12">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#87A96B] flex items-center justify-center">
              <span className="text-2xl font-black">K</span>
            </div>
            <div>
              <h1 className="text-2xl font-black">KIJIVU ADMIN</h1>
              <p className="text-sm text-white/60 font-medium">Manage your store</p>
            </div>
          </div>
          <a 
            href="/"
            className="bg-white text-[#2C3539] px-6 py-3 font-black hover:bg-[#87A96B] hover:text-white transition-all"
          >
            VIEW STORE
          </a>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-[#2C3539]/10 min-h-screen p-6">
          <nav className="space-y-2">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-3 px-4 py-3 font-bold transition-all ${
                activeTab === 'overview'
                  ? 'bg-[#87A96B] text-white'
                  : 'text-[#2C3539] hover:bg-[#87A96B]/10'
              }`}
            >
              <TrendingUp className="w-5 h-5" />
              OVERVIEW
            </button>
            <button
              onClick={() => setActiveTab('products')}
              className={`w-full flex items-center gap-3 px-4 py-3 font-bold transition-all ${
                activeTab === 'products'
                  ? 'bg-[#87A96B] text-white'
                  : 'text-[#2C3539] hover:bg-[#87A96B]/10'
              }`}
            >
              <Package className="w-5 h-5" />
              PRODUCTS
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full flex items-center gap-3 px-4 py-3 font-bold transition-all ${
                activeTab === 'orders'
                  ? 'bg-[#87A96B] text-white'
                  : 'text-[#2C3539] hover:bg-[#87A96B]/10'
              }`}
            >
              <ShoppingBag className="w-5 h-5" />
              ORDERS
            </button>
            <button
              onClick={() => setActiveTab('customers')}
              className={`w-full flex items-center gap-3 px-4 py-3 font-bold transition-all ${
                activeTab === 'customers'
                  ? 'bg-[#87A96B] text-white'
                  : 'text-[#2C3539] hover:bg-[#87A96B]/10'
              }`}
            >
              <Users className="w-5 h-5" />
              CUSTOMERS
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-12">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <h2 className="text-4xl font-black text-[#2C3539]">dashboard overview</h2>

              {/* Stats Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-black text-[#2C3539]/60 uppercase">Total Revenue</p>
                    <DollarSign className="w-8 h-8 text-[#87A96B]" />
                  </div>
                  <p className="text-3xl font-black text-[#2C3539]">
                    KES {stats.totalRevenue.toLocaleString()}
                  </p>
                  <p className="text-sm font-medium text-green-600">+12% from last month</p>
                </div>

                <div className="bg-white p-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-black text-[#2C3539]/60 uppercase">Total Orders</p>
                    <ShoppingBag className="w-8 h-8 text-[#87A96B]" />
                  </div>
                  <p className="text-3xl font-black text-[#2C3539]">{stats.totalOrders}</p>
                  <p className="text-sm font-medium text-green-600">+8% from last month</p>
                </div>

                <div className="bg-white p-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-black text-[#2C3539]/60 uppercase">Products</p>
                    <Package className="w-8 h-8 text-[#87A96B]" />
                  </div>
                  <p className="text-3xl font-black text-[#2C3539]">{stats.totalProducts}</p>
                  <p className="text-sm font-medium text-[#2C3539]/60">4 in stock</p>
                </div>

                <div className="bg-white p-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-black text-[#2C3539]/60 uppercase">Customers</p>
                    <Users className="w-8 h-8 text-[#87A96B]" />
                  </div>
                  <p className="text-3xl font-black text-[#2C3539]">{stats.totalCustomers}</p>
                  <p className="text-sm font-medium text-green-600">+15% from last month</p>
                </div>
              </div>

              {/* Recent Orders */}
              <div className="bg-white p-8">
                <h3 className="text-2xl font-black text-[#2C3539] mb-6">recent orders</h3>
                <div className="space-y-4">
                  {orders.slice(0, 5).map(order => (
                    <div key={order.id} className="flex items-center justify-between p-4 border border-[#2C3539]/10 hover:border-[#87A96B] transition-all">
                      <div className="flex-1">
                        <p className="font-black text-[#2C3539]">{order.id}</p>
                        <p className="text-sm text-[#2C3539]/60 font-medium">{order.customer} • {order.date}</p>
                      </div>
                      <div className="text-right mr-6">
                        <p className="font-black text-[#2C3539]">KES {order.total.toLocaleString()}</p>
                        <p className="text-sm text-[#2C3539]/60 font-medium">{order.paymentMethod}</p>
                      </div>
                      <span className={`px-4 py-2 text-xs font-black border-2 ${getStatusColor(order.status)}`}>
                        {order.status.toUpperCase()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Products Tab */}
          {activeTab === 'products' && (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <h2 className="text-4xl font-black text-[#2C3539]">products</h2>
                <button 
                  onClick={() => setShowAddProduct(true)}
                  className="bg-[#2C3539] text-white px-6 py-3 font-black hover:bg-[#87A96B] transition-all flex items-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  ADD PRODUCT
                </button>
              </div>

              <div className="bg-white overflow-hidden">
                <table className="w-full">
                  <thead className="bg-[#2C3539] text-white">
                    <tr>
                      <th className="text-left p-4 font-black uppercase text-sm">Product</th>
                      <th className="text-left p-4 font-black uppercase text-sm">Category</th>
                      <th className="text-left p-4 font-black uppercase text-sm">Price</th>
                      <th className="text-left p-4 font-black uppercase text-sm">Stock</th>
                      <th className="text-left p-4 font-black uppercase text-sm">Sold</th>
                      <th className="text-left p-4 font-black uppercase text-sm">Status</th>
                      <th className="text-left p-4 font-black uppercase text-sm">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product, index) => (
                      <tr key={product.id} className={`border-b border-[#2C3539]/10 hover:bg-[#87A96B]/5 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-[#E8E6E1]/30'}`}>
                        <td className="p-4 font-bold text-[#2C3539]">{product.name}</td>
                        <td className="p-4 font-medium text-[#2C3539]/70">{product.category}</td>
                        <td className="p-4 font-black text-[#2C3539]">KES {product.price.toLocaleString()}</td>
                        <td className="p-4 font-bold text-[#2C3539]">{product.stock}</td>
                        <td className="p-4 font-medium text-[#2C3539]/70">{product.sold}</td>
                        <td className="p-4">
                          <span className={`px-3 py-1 text-xs font-black ${
                            product.stock > 0 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {product.status.toUpperCase()}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex gap-2">
                            <button className="p-2 hover:bg-[#87A96B] hover:text-white transition-all" title="Edit">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button className="p-2 hover:bg-red-500 hover:text-white transition-all" title="Delete" onClick={() => deleteProduct(product.id)}>
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <h2 className="text-4xl font-black text-[#2C3539]">orders</h2>
                <button className="bg-[#2C3539] text-white px-6 py-3 font-black hover:bg-[#87A96B] transition-all flex items-center gap-2">
                  <Download className="w-5 h-5" />
                  EXPORT
                </button>
              </div>

              <div className="space-y-4">
                {orders.map(order => (
                  <div key={order.id} className="bg-white p-6 space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <h3 className="text-xl font-black text-[#2C3539]">{order.id}</h3>
                          <span className={`px-3 py-1 text-xs font-black border-2 ${getStatusColor(order.status)}`}>
                            {order.status.toUpperCase()}
                          </span>
                        </div>
                        <p className="text-sm text-[#2C3539]/60 font-medium">{order.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-black text-[#87A96B]">KES {order.total.toLocaleString()}</p>
                        <p className="text-sm text-[#2C3539]/60 font-medium">{order.paymentMethod}</p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 pt-4 border-t border-[#2C3539]/10">
                      <div className="space-y-2">
                        <p className="text-xs font-black text-[#2C3539]/60 uppercase">Customer</p>
                        <p className="font-bold text-[#2C3539]">{order.customer}</p>
                        <p className="text-sm text-[#2C3539]/60 font-medium">{order.email}</p>
                        <p className="text-sm text-[#2C3539]/60 font-medium">{order.phone}</p>
                      </div>

                      <div className="space-y-2">
                        <p className="text-xs font-black text-[#2C3539]/60 uppercase">Delivery</p>
                        <p className="font-bold text-[#2C3539]">{order.location}</p>
                        <p className="text-sm text-[#2C3539]/60 font-medium">{order.address}</p>
                        <p className="text-sm text-[#2C3539]/60 font-medium">Fee: KES {order.deliveryFee}</p>
                      </div>
                    </div>

                    <div className="space-y-2 pt-4 border-t border-[#2C3539]/10">
                      <p className="text-xs font-black text-[#2C3539]/60 uppercase">Items</p>
                      <div className="space-y-1">
                        {order.items.map((item, idx) => (
                          <p key={idx} className="text-sm font-medium text-[#2C3539]">• {item}</p>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-3 pt-4">
                      {order.status === 'Pending' && (
                        <button 
                          onClick={() => updateOrderStatus(order.id, 'Shipped')}
                          className="bg-blue-500 text-white px-4 py-2 text-sm font-black hover:bg-blue-600 transition-all flex items-center gap-2"
                        >
                          <Check className="w-4 h-4" />
                          MARK AS SHIPPED
                        </button>
                      )}
                      {order.status === 'Shipped' && (
                        <button 
                          onClick={() => updateOrderStatus(order.id, 'Delivered')}
                          className="bg-green-500 text-white px-4 py-2 text-sm font-black hover:bg-green-600 transition-all flex items-center gap-2"
                        >
                          <Check className="w-4 h-4" />
                          MARK AS DELIVERED
                        </button>
                      )}
                      <a 
                        href={`https://wa.me/${order.phone.replace(/\s/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#87A96B] text-white px-4 py-2 text-sm font-black hover:bg-[#2C3539] transition-all flex items-center gap-2"
                      >
                        <MessageCircle className="w-4 h-4" />
                        CONTACT CUSTOMER
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Customers Tab */}
          {activeTab === 'customers' && (
            <div className="space-y-8">
              <h2 className="text-4xl font-black text-[#2C3539]">customers</h2>
              
              <div className="bg-white p-8">
                <p className="text-lg text-[#2C3539]/60 font-medium">
                  Customer management features coming soon. For now, view customer details in the Orders tab.
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