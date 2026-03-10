import React, { useState } from 'react';
import { ShoppingCart, Trash2, CreditCard, MapPin, User, Lock, ArrowRight, Check, AlertCircle } from 'lucide-react';

const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "MaryRuth Peach Mango Liquid Hair Supplement",
      price: 7499,
      quantity: 2,
      image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=200&h=200&fit=crop"
    },
    {
      id: 3,
      name: "Kids Immunity Gummies",
      price: 4000,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=200&h=200&fit=crop"
    }
  ]);

  const [location, setLocation] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    county: '',
    town: '',
    address: ''
  });

  const deliveryFees = {
    'nairobi-cbd': 200,
    'nairobi-suburbs': 350,
    'nairobi-other': 500,
    'kampala': 1000,
    'other': 0
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = deliveryFees[location] || 0;
  const total = subtotal + deliveryFee;

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate Stripe checkout
    setTimeout(() => {
      setIsProcessing(false);
      setOrderComplete(true);
    }, 2000);
  };

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-[#E8E6E1] flex items-center justify-center px-6">
        <div className="max-w-2xl w-full bg-white p-12 text-center space-y-8">
          <div className="w-24 h-24 bg-[#87A96B] rounded-full mx-auto flex items-center justify-center">
            <Check className="w-12 h-12 text-white" />
          </div>
          
          <div className="space-y-4">
            <h1 className="text-5xl font-black text-[#2C3539]">
              order
              <br />
              complete!
            </h1>
            <p className="text-xl text-[#2C3539]/70">
              Thank you for your order. Check your email for confirmation.
            </p>
          </div>

          <div className="bg-[#E8E6E1] p-6 space-y-2 text-left">
            <div className="flex justify-between text-sm">
              <span className="font-medium text-[#2C3539]/60">Order Number:</span>
              <span className="font-black text-[#2C3539]">#{Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="font-medium text-[#2C3539]/60">Total Paid:</span>
              <span className="font-black text-[#2C3539]">KES {total.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="font-medium text-[#2C3539]/60">Payment Method:</span>
              <span className="font-black text-[#2C3539]">Stripe</span>
            </div>
          </div>

          <div className="space-y-4 pt-6">
            <a 
              href="/"
              className="block w-full bg-[#2C3539] text-white py-4 font-black hover:bg-[#87A96B] transition-all"
            >
              CONTINUE SHOPPING
            </a>
            <a 
              href="https://wa.me/254705016590"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full border-2 border-[#87A96B] text-[#87A96B] py-4 font-black hover:bg-[#87A96B] hover:text-white transition-all"
            >
              CONTACT SUPPORT
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#E8E6E1]">
      {/* Header */}
      <header className="bg-white border-b border-[#2C3539]/10 py-6">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between">
            <a href="/" className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-[#2C3539] flex items-center justify-center">
                <span className="text-xl font-black text-white">K</span>
              </div>
              <h1 className="text-2xl font-black text-[#2C3539]">KIJIVU</h1>
            </a>
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-[#87A96B]" />
              <span className="text-sm font-medium text-[#2C3539]/60">Secure Checkout</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
        <div className="mb-12">
          <h1 className="text-5xl lg:text-6xl font-black text-[#2C3539] mb-4">
            checkout
          </h1>
          <p className="text-lg text-[#2C3539]/70 font-medium">
            Complete your order in a few simple steps
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Left - Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Contact Information */}
            <div className="bg-white p-8 space-y-6">
              <h2 className="text-2xl font-black text-[#2C3539] flex items-center gap-3">
                <User className="w-6 h-6" />
                contact information
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-black text-[#2C3539] mb-2 uppercase tracking-wide">
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full border-2 border-[#2C3539]/20 p-4 focus:border-[#87A96B] focus:outline-none transition-colors font-medium"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-black text-[#2C3539] mb-2 uppercase tracking-wide">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full border-2 border-[#2C3539]/20 p-4 focus:border-[#87A96B] focus:outline-none transition-colors font-medium"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-black text-[#2C3539] mb-2 uppercase tracking-wide">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full border-2 border-[#2C3539]/20 p-4 focus:border-[#87A96B] focus:outline-none transition-colors font-medium"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-black text-[#2C3539] mb-2 uppercase tracking-wide">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+254 7XX XXX XXX"
                  className="w-full border-2 border-[#2C3539]/20 p-4 focus:border-[#87A96B] focus:outline-none transition-colors font-medium"
                  required
                />
              </div>
            </div>

            {/* Delivery Information */}
            <div className="bg-white p-8 space-y-6">
              <h2 className="text-2xl font-black text-[#2C3539] flex items-center gap-3">
                <MapPin className="w-6 h-6" />
                delivery information
              </h2>

              <div>
                <label className="block text-sm font-black text-[#2C3539] mb-2 uppercase tracking-wide">
                  Location *
                </label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full border-2 border-[#2C3539]/20 p-4 focus:border-[#87A96B] focus:outline-none transition-colors font-medium bg-white"
                  required
                >
                  <option value="">Select your location</option>
                  <option value="nairobi-cbd">Nairobi CBD (KES 200)</option>
                  <option value="nairobi-suburbs">Nairobi Suburbs (KES 350)</option>
                  <option value="nairobi-other">Other Nairobi Areas (KES 500)</option>
                  <option value="kampala">Kampala, Uganda (KES 1,000)</option>
                  <option value="other">Other Location (Contact for Quote)</option>
                </select>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-black text-[#2C3539] mb-2 uppercase tracking-wide">
                    County/Region *
                  </label>
                  <input
                    type="text"
                    name="county"
                    value={formData.county}
                    onChange={handleInputChange}
                    className="w-full border-2 border-[#2C3539]/20 p-4 focus:border-[#87A96B] focus:outline-none transition-colors font-medium"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-black text-[#2C3539] mb-2 uppercase tracking-wide">
                    Town/City *
                  </label>
                  <input
                    type="text"
                    name="town"
                    value={formData.town}
                    onChange={handleInputChange}
                    className="w-full border-2 border-[#2C3539]/20 p-4 focus:border-[#87A96B] focus:outline-none transition-colors font-medium"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-black text-[#2C3539] mb-2 uppercase tracking-wide">
                  Delivery Address *
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full border-2 border-[#2C3539]/20 p-4 focus:border-[#87A96B] focus:outline-none transition-colors font-medium resize-none"
                  placeholder="Building name, apartment number, street, landmarks..."
                  required
                />
              </div>

              {location === 'other' && (
                <div className="bg-[#F4C7C3]/20 border-2 border-[#F4C7C3] p-4 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-[#F4C7C3] flex-shrink-0 mt-0.5" />
                  <p className="text-sm font-medium text-[#2C3539]">
                    For locations outside our standard delivery zones, our team will contact you via WhatsApp (+254 705 016 590) to confirm delivery fee and timeline.
                  </p>
                </div>
              )}
            </div>

            {/* Payment Method */}
            <div className="bg-white p-8 space-y-6">
              <h2 className="text-2xl font-black text-[#2C3539] flex items-center gap-3">
                <CreditCard className="w-6 h-6" />
                payment method
              </h2>

              <div className="space-y-4">
                <div className="border-2 border-[#87A96B] bg-[#87A96B]/5 p-6">
                  <div className="flex items-center gap-4">
                    <CreditCard className="w-8 h-8 text-[#2C3539]" />
                    <div className="flex-1">
                      <p className="font-black text-[#2C3539]">SECURE PAYMENT VIA STRIPE</p>
                      <p className="text-sm text-[#2C3539]/60 font-medium">Cards & M-Pesa accepted</p>
                    </div>
                    <div className="bg-[#87A96B] text-white px-3 py-1 text-xs font-black">
                      RECOMMENDED
                    </div>
                  </div>
                  
                  <div className="mt-4 bg-[#87A96B]/10 p-4">
                    <p className="text-sm font-medium text-[#2C3539]">
                      ✓ All payment methods accepted (Cards + M-Pesa)
                      <br />
                      ✓ Secure checkout on next page
                      <br />
                      ✓ Bank-level encryption
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-[#87A96B]/10 p-4 flex items-start gap-3">
                <Lock className="w-5 h-5 text-[#87A96B] flex-shrink-0 mt-0.5" />
                <p className="text-sm font-medium text-[#2C3539]">
                  All payments are secured by <strong>Stripe</strong> with bank-level 256-bit SSL encryption. M-Pesa and all major cards accepted.
                </p>
              </div>
            </div>
          </div>

          {/* Right - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-8 space-y-6 sticky top-6">
              <h2 className="text-2xl font-black text-[#2C3539] flex items-center gap-3">
                <ShoppingCart className="w-6 h-6" />
                order summary
              </h2>

              {/* Cart Items */}
              <div className="space-y-4 border-b-2 border-[#2C3539]/10 pb-6">
                {cartItems.map(item => (
                  <div key={item.id} className="flex gap-4">
                    <img 
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover"
                    />
                    <div className="flex-1 space-y-2">
                      <h3 className="font-bold text-sm text-[#2C3539] leading-tight">
                        {item.name}
                      </h3>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-6 h-6 border border-[#2C3539]/20 flex items-center justify-center hover:bg-[#2C3539] hover:text-white transition-all"
                          >
                            -
                          </button>
                          <span className="text-sm font-black">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-6 h-6 border border-[#2C3539]/20 flex items-center justify-center hover:bg-[#2C3539] hover:text-white transition-all"
                          >
                            +
                          </button>
                        </div>
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="text-[#F4C7C3] hover:text-red-600 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-sm font-black text-[#2C3539]">
                        KES {(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-[#2C3539]/60 font-medium">Subtotal</span>
                  <span className="font-black text-[#2C3539]">KES {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#2C3539]/60 font-medium">Delivery Fee</span>
                  <span className="font-black text-[#2C3539]">
                    {location && deliveryFee > 0 ? `KES ${deliveryFee.toLocaleString()}` : 'TBD'}
                  </span>
                </div>
                <div className="border-t-2 border-[#2C3539]/10 pt-3 flex justify-between">
                  <span className="text-lg font-black text-[#2C3539] uppercase">Total</span>
                  <span className="text-2xl font-black text-[#87A96B]">
                    KES {total.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Place Order Button */}
              <button
                onClick={handleSubmit}
                disabled={isProcessing || !location || cartItems.length === 0}
                className="w-full bg-[#2C3539] text-white py-5 font-black hover:bg-[#87A96B] transition-all flex items-center justify-center gap-3 group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    PROCESSING...
                  </>
                ) : (
                  <>
                    PROCEED TO PAYMENT
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                  </>
                )}
              </button>

              <p className="text-xs text-[#2C3539]/60 text-center font-medium">
                Powered by Stripe • Accepts Cards & M-Pesa
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;