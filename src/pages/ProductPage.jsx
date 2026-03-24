import React, { useState } from 'react';
import { ShoppingCart, Menu, X, MessageCircle, ArrowRight, ArrowLeft, Plus, Minus, Star, Check, Leaf, Shield, Sparkles } from 'lucide-react';

const ProductPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState('benefits');

  const product = {
    id: 1,
    name: "MaryRuth Peach Mango Liquid Hair Supplement",
    price: 7499,
    category: "Hair Growth",
    stock: "In Stock",
    size: "16 fl oz (473 mL)",
    duration: "30-day supply",
    tagline: "Your hair grows from the inside out",
    description: "Premium American liquid hair supplement that supports thicker, stronger hair growth from within. Works as both a targeted hair supplement and daily multivitamin.",
    images: [
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&h=800&fit=crop"
    ],
    ingredients: [
      { name: "Lustriva®", benefit: "Clinically proven to increase hair thickness in 3 weeks" },
      { name: "Biotin", benefit: "Supports hair strength and growth" },
      { name: "B-Vitamins Complex", benefit: "Promotes healthy hair follicles" },
      { name: "Zinc", benefit: "Essential for hair growth and scalp health" },
      { name: "Iron", benefit: "Delivers oxygen to hair follicles" },
      { name: "Vitamin D", benefit: "Supports follicle health" }
    ],
    benefits: [
      "Reduces hair breakage and shedding",
      "Supports length retention",
      "Improves hair thickness and strength",
      "Nourishes from the inside out",
      "Doubles as daily multivitamin support"
    ],
    usage: {
      dosage: "1 tablespoon daily",
      timing: "Best taken with food for optimal absorption",
      duration: "One bottle lasts approximately 30 days"
    },
    reviews: [
      {
        name: "Amina K.",
        location: "Nairobi",
        rating: 5,
        comment: "My edges are finally filling in! I've tried everything but this is the first supplement that actually worked.",
        weeks: 8
      },
      {
        name: "Sarah M.",
        location: "Kampala",
        rating: 5,
        comment: "Less shedding in just 4 weeks. My hair feels stronger and I'm seeing new growth.",
        weeks: 4
      },
      {
        name: "Grace W.",
        location: "Mombasa",
        rating: 5,
        comment: "The peach mango taste is delicious and my hair has never been healthier. Worth every shilling!",
        weeks: 12
      }
    ]
  };

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const increaseQuantity = () => {
    if (quantity < 10) setQuantity(quantity + 1);
  };

  return (
    <div className="min-h-screen bg-[#E8E6E1]">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-[#2C3539]/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex justify-between items-center h-20">
            <a href="/" className="flex items-center space-x-4 group">
              <img src="/Kijivu Logo Design.png" alt="Kijivu" style={{ height: '48px', width: 'auto' }} />
            </a>

            <nav className="hidden md:flex items-center space-x-12">
              <a href="/#shop" className="text-[#2C3539] hover:text-[#87A96B] transition-colors text-base font-medium">shop</a>
              <a href="/#about" className="text-[#2C3539] hover:text-[#87A96B] transition-colors text-base font-medium">about</a>
              <a href="https://wa.me/254705016590" target="_blank" rel="noopener noreferrer" className="text-[#2C3539] hover:text-[#87A96B] transition-colors text-base font-medium">
                support
              </a>
              <button className="relative p-3 text-[#2C3539] hover:bg-[#87A96B]/10 rounded-xl transition-all">
                <ShoppingCart className="w-6 h-6" />
                <span className="absolute top-1 right-1 bg-[#F4C7C3] text-[#2C3539] text-xs w-5 h-5 rounded-full flex items-center justify-center font-black">
                  {quantity}
                </span>
              </button>
            </nav>

            <button 
              className="md:hidden p-3 hover:bg-[#87A96B]/10 rounded-xl transition-all"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <section className="pt-32 pb-8 px-6 lg:px-12">
        <div className="max-w-[1400px] mx-auto">
          <a href="/" className="inline-flex items-center text-[#2C3539]/60 hover:text-[#87A96B] transition-colors font-medium group">
            <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            back to shop
          </a>
        </div>
      </section>

      {/* Product Section */}
      <section className="pb-20 px-6 lg:px-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Left - Images */}
            <div className="space-y-6">
              <div className="relative bg-white overflow-hidden">
                <div className="absolute top-6 right-6 bg-[#87A96B] text-white px-4 py-2 text-sm font-black z-10">
                  {product.stock}
                </div>
                <img 
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-[600px] object-cover"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative overflow-hidden bg-white transition-all ${
                      selectedImage === index 
                        ? 'ring-4 ring-[#87A96B]' 
                        : 'opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img 
                      src={image}
                      alt={`Product view ${index + 1}`}
                      className="w-full h-32 object-cover"
                    />
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-4 pt-8">
                <div className="bg-white p-4 text-center">
                  <Shield className="w-8 h-8 mx-auto mb-2 text-[#87A96B]" />
                  <p className="text-xs font-black text-[#2C3539]">AMERICAN QUALITY</p>
                </div>
                <div className="bg-white p-4 text-center">
                  <Sparkles className="w-8 h-8 mx-auto mb-2 text-[#87A96B]" />
                  <p className="text-xs font-black text-[#2C3539]">CLINICALLY BACKED</p>
                </div>
                <div className="bg-white p-4 text-center">
                  <Leaf className="w-8 h-8 mx-auto mb-2 text-[#87A96B]" />
                  <p className="text-xs font-black text-[#2C3539]">BIOAVAILABLE</p>
                </div>
              </div>
            </div>

            {/* Right - Product Info */}
            <div className="space-y-8">
              <div className="space-y-4">
                <span className="inline-block bg-[#2C3539] text-white px-4 py-2 text-xs font-black tracking-wide">
                  {product.category.toUpperCase()}
                </span>
                
                <h1 className="text-5xl lg:text-6xl font-black text-[#2C3539] leading-tight">
                  {product.name}
                </h1>

                <p className="text-2xl font-bold text-[#87A96B] italic">
                  {product.tagline}
                </p>

                <p className="text-lg text-[#2C3539]/80 leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div className="border-t-2 border-b-2 border-[#2C3539]/10 py-6 space-y-4">
                <div className="flex items-baseline gap-3">
                  <span className="text-lg text-[#2C3539]/60 font-medium">KES</span>
                  <span className="text-5xl font-black text-[#2C3539]">
                    {product.price.toLocaleString()}
                  </span>
                </div>
                
                <div className="flex gap-4 text-sm text-[#2C3539]/70 font-medium">
                  <span>📦 {product.size}</span>
                  <span>•</span>
                  <span>⏱️ {product.duration}</span>
                </div>
              </div>

              <div className="space-y-4">
                <label className="block text-sm font-black text-[#2C3539] uppercase tracking-wide">
                  Quantity
                </label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border-2 border-[#2C3539]">
                    <button 
                      onClick={decreaseQuantity}
                      className="p-4 hover:bg-[#2C3539] hover:text-white transition-all"
                    >
                      <Minus className="w-5 h-5" />
                    </button>
                    <span className="px-8 text-2xl font-black">{quantity}</span>
                    <button 
                      onClick={increaseQuantity}
                      className="p-4 hover:bg-[#2C3539] hover:text-white transition-all"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                  <span className="text-sm text-[#2C3539]/60 font-medium">
                    Total: KES {(product.price * quantity).toLocaleString()}
                  </span>
                </div>
              </div>

              <button className="w-full bg-[#2C3539] text-white py-6 text-lg font-black hover:bg-[#87A96B] transition-all flex items-center justify-center gap-3 group">
                <ShoppingCart className="w-6 h-6" />
                ADD TO CART
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </button>

              <a 
                href="https://wa.me/254705016590"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-transparent border-2 border-[#87A96B] text-[#87A96B] py-6 text-lg font-black hover:bg-[#87A96B] hover:text-white transition-all flex items-center justify-center gap-3"
              >
                <MessageCircle className="w-6 h-6" />
                QUESTIONS? CHAT WITH US
              </a>

              <div className="bg-[#87A96B]/10 p-6 space-y-3">
                <p className="flex items-start gap-3 text-sm font-medium text-[#2C3539]">
                  <Check className="w-5 h-5 text-[#87A96B] flex-shrink-0 mt-0.5" />
                  Free delivery for orders over KES 10,000
                </p>
                <p className="flex items-start gap-3 text-sm font-medium text-[#2C3539]">
                  <Check className="w-5 h-5 text-[#87A96B] flex-shrink-0 mt-0.5" />
                  Delivery across Kenya & Uganda
                </p>
                <p className="flex items-start gap-3 text-sm font-medium text-[#2C3539]">
                  <Check className="w-5 h-5 text-[#87A96B] flex-shrink-0 mt-0.5" />
                  Secure payment via Stripe (M-Pesa & Cards)
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Details Tabs */}
      <section className="py-20 px-6 lg:px-12 bg-white">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex gap-6 border-b-2 border-[#2C3539]/10 mb-12">
            {['benefits', 'ingredients', 'usage', 'reviews'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 px-2 text-lg font-black uppercase tracking-wide transition-all ${
                  activeTab === tab
                    ? 'border-b-4 border-[#87A96B] text-[#2C3539]'
                    : 'text-[#2C3539]/40 hover:text-[#2C3539]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="max-w-4xl">
            {activeTab === 'benefits' && (
              <div className="space-y-6">
                <h3 className="text-4xl font-black text-[#2C3539] mb-8">
                  what you'll experience
                </h3>
                <div className="grid gap-4">
                  {product.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 bg-[#E8E6E1]">
                      <div className="w-8 h-8 bg-[#87A96B] flex items-center justify-center flex-shrink-0">
                        <Check className="w-5 h-5 text-white" />
                      </div>
                      <p className="text-lg font-medium text-[#2C3539]">{benefit}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'ingredients' && (
              <div className="space-y-6">
                <h3 className="text-4xl font-black text-[#2C3539] mb-8">
                  what's inside
                </h3>
                <div className="space-y-6">
                  {product.ingredients.map((ingredient, index) => (
                    <div key={index} className="border-b border-[#2C3539]/10 pb-6 last:border-0">
                      <h4 className="text-xl font-black text-[#87A96B] mb-2">
                        {ingredient.name}
                      </h4>
                      <p className="text-lg text-[#2C3539]/80">{ingredient.benefit}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'usage' && (
              <div className="space-y-8">
                <h3 className="text-4xl font-black text-[#2C3539] mb-8">
                  how to use
                </h3>
                <div className="space-y-6">
                  <div className="bg-[#E8E6E1] p-8">
                    <h4 className="text-lg font-black text-[#2C3539] mb-3 uppercase tracking-wide">
                      Dosage
                    </h4>
                    <p className="text-xl text-[#2C3539]/80">{product.usage.dosage}</p>
                  </div>
                  <div className="bg-[#E8E6E1] p-8">
                    <h4 className="text-lg font-black text-[#2C3539] mb-3 uppercase tracking-wide">
                      Best Time
                    </h4>
                    <p className="text-xl text-[#2C3539]/80">{product.usage.timing}</p>
                  </div>
                  <div className="bg-[#E8E6E1] p-8">
                    <h4 className="text-lg font-black text-[#2C3539] mb-3 uppercase tracking-wide">
                      Duration
                    </h4>
                    <p className="text-xl text-[#2C3539]/80">{product.usage.duration}</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-8">
                <div className="flex items-baseline justify-between">
                  <h3 className="text-4xl font-black text-[#2C3539]">
                    customer reviews
                  </h3>
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[1,2,3,4,5].map((star) => (
                        <Star key={star} className="w-5 h-5 fill-[#87A96B] text-[#87A96B]" />
                      ))}
                    </div>
                    <span className="text-lg font-black text-[#2C3539]">5.0</span>
                  </div>
                </div>

                <div className="space-y-6">
                  {product.reviews.map((review, index) => (
                    <div key={index} className="border-b border-[#2C3539]/10 pb-6 last:border-0">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="font-black text-[#2C3539]">{review.name}</h4>
                          <p className="text-sm text-[#2C3539]/60 font-medium">{review.location} • {review.weeks} weeks</p>
                        </div>
                        <div className="flex">
                          {[1,2,3,4,5].map((star) => (
                            <Star key={star} className="w-4 h-4 fill-[#87A96B] text-[#87A96B]" />
                          ))}
                        </div>
                      </div>
                      <p className="text-lg text-[#2C3539]/80 leading-relaxed">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#2C3539] text-white py-16 px-6 lg:px-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/60 text-sm font-medium">
                &copy; 2026 kijivu. delivering premium wellness across kenya & uganda 🇰🇪 🇺🇬
              </p>
            </div>
            <div className="flex items-center gap-4">
              <a href="https://www.tiktok.com/@Luke418free" target="_blank" rel="noopener noreferrer" className="text-white/90 font-bold hover:text-[#87A96B]">TikTok @Luke418free</a>
              <a href="mailto:luke4182026@gmail.com" className="text-white/90 font-medium hover:text-[#87A96B]">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProductPage;