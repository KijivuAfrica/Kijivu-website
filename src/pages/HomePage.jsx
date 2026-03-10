import React, { useState } from 'react';
import { ShoppingCart, Menu, X, MessageCircle, ArrowRight, Star, Leaf, Shield, Heart } from 'lucide-react';

const HomePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cart, setCart] = useState([]);

  const products = [
    {
      id: 1,
      name: "MaryRuth Peach Mango Liquid Hair Supplement",
      price: 7499,
      image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500&h=500&fit=crop",
      badge: "Best Seller",
      category: "Hair Growth",
      stock: "In Stock"
    },
    {
      id: 2,
      name: "MaryRuth Dragon Fruit Liquid Hair Supplement",
      price: 7499,
      image: "https://images.unsplash.com/photo-1620411284481-0b56a0c351e2?w=500&h=500&fit=crop",
      badge: "Waitlist",
      category: "Hair Growth",
      stock: "Coming Soon"
    },
    {
      id: 3,
      name: "Kids Immunity Gummies",
      price: 4000,
      image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=500&h=500&fit=crop",
      category: "Kids Health",
      stock: "In Stock"
    },
    {
      id: 4,
      name: "Prenatal & Postnatal Gummies",
      price: 5500,
      image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&h=500&fit=crop",
      category: "Maternal Health",
      stock: "In Stock"
    }
  ];

  const benefits = [
    { icon: Shield, title: "American Quality", desc: "Premium ingredients, clinically-backed" },
    { icon: Leaf, title: "Bioavailable", desc: "Your body actually absorbs it" },
    { icon: Heart, title: "African-Focused", desc: "Addressing our nutritional gaps" },
    { icon: Star, title: "Real Results", desc: "Trusted by 500+ Kenyan women" }
  ];

  return (
    <div className="min-h-screen bg-[#E8E6E1]">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-[#2C3539]/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <a href="/" className="flex items-center space-x-4 group">
              <div className="relative">
                <div className="absolute inset-0 bg-[#87A96B] rounded-2xl blur-sm group-hover:blur-md transition-all"></div>
                <div className="relative w-14 h-14 bg-[#2C3539] rounded-2xl flex items-center justify-center transform group-hover:rotate-6 transition-transform">
                  <span className="text-2xl font-black text-white">K</span>
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-black text-[#2C3539] tracking-tight">KIJIVU</h1>
              </div>
            </a>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center space-x-12">
              <a href="#shop" className="text-[#2C3539] hover:text-[#87A96B] transition-colors text-base font-medium">shop</a>
              <a href="#about" className="text-[#2C3539] hover:text-[#87A96B] transition-colors text-base font-medium">about</a>
              <a href="https://wa.me/254705016590" target="_blank" rel="noopener noreferrer" className="text-[#2C3539] hover:text-[#87A96B] transition-colors text-base font-medium">
                support
              </a>
              <button className="relative p-3 text-[#2C3539] hover:bg-[#87A96B]/10 rounded-xl transition-all">
                <ShoppingCart className="w-6 h-6" />
                {cart.length > 0 && (
                  <span className="absolute top-1 right-1 bg-[#F4C7C3] text-[#2C3539] text-xs w-5 h-5 rounded-full flex items-center justify-center font-black">
                    {cart.length}
                  </span>
                )}
              </button>
            </nav>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-3 hover:bg-[#87A96B]/10 rounded-xl transition-all"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-[#2C3539]/10">
            <div className="px-6 py-6 space-y-4">
              <a href="#shop" className="block text-[#2C3539] hover:text-[#87A96B] py-3 text-lg font-medium">shop</a>
              <a href="#about" className="block text-[#2C3539] hover:text-[#87A96B] py-3 text-lg font-medium">about</a>
              <a href="https://wa.me/254705016590" target="_blank" rel="noopener noreferrer" className="block text-[#87A96B] py-3 text-lg font-medium">
                whatsapp support
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-32 px-6 lg:px-12 bg-[#E8E6E1] relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-8 lg:space-y-12">
              <div className="space-y-6">
                <div className="inline-block">
                  <span className="bg-[#2C3539] text-white px-5 py-2 text-sm font-bold tracking-wide">
                    PREMIUM WELLNESS
                  </span>
                </div>
                
                <h1 className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-black text-[#2C3539] leading-[0.9] tracking-tight">
                  premium
                  <br />
                  <span className="relative inline-block">
                    wellness
                    <svg className="absolute -bottom-4 left-0 w-full" viewBox="0 0 400 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2 15C102 5 298 5 398 15" stroke="#87A96B" strokeWidth="8" strokeLinecap="round"/>
                    </svg>
                  </span>
                </h1>

                <p className="text-2xl lg:text-3xl font-medium text-[#2C3539]/80 leading-snug max-w-2xl">
                  for the modern
                  <br />
                  <span className="text-[#87A96B] font-bold">African woman</span>
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="#shop"
                  className="group bg-[#2C3539] text-white px-10 py-5 text-lg font-bold hover:bg-[#87A96B] transition-all flex items-center justify-center gap-3"
                >
                  start your wellness journey
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </a>
              </div>

              <div className="pt-8 border-t-2 border-[#2C3539]/10">
                <p className="text-base text-[#2C3539]/60 italic font-light max-w-xl">
                  "Work willingly at whatever you do, as though you were working for the Lord rather than for the people."
                  <span className="block mt-1 not-italic font-medium">— Colossians 3:23</span>
                </p>
              </div>
            </div>

            {/* Right Image */}
            <div className="lg:col-span-5 relative">
              <div className="relative">
                <div className="absolute inset-0 bg-[#87A96B] translate-x-6 translate-y-6"></div>
                <div className="relative overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=800&h=1000&fit=crop"
                    alt="Beautiful African woman"
                    className="w-full h-[600px] object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-16 bg-[#2C3539]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center space-y-2">
                <div className="flex items-center justify-center gap-2">
                  <benefit.icon className="w-8 h-8 text-[#87A96B]" />
                </div>
                <h3 className="text-4xl lg:text-5xl font-black text-white">{benefit.title}</h3>
                <p className="text-white/70 font-medium">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="shop" className="py-24 lg:py-32 px-6 lg:px-12 bg-[#E8E6E1]">
        <div className="max-w-[1400px] mx-auto">
          {/* Section Header */}
          <div className="mb-20">
            <h2 className="text-6xl lg:text-8xl font-black text-[#2C3539] leading-tight mb-6">
              shop
              <br />
              premium
              <br />
              supplements
            </h2>
            <p className="text-xl lg:text-2xl text-[#2C3539]/70 font-medium max-w-2xl">
              curated for your wellness,
              <br />
              backed by science
            </p>
          </div>

          {/* Product Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <div key={product.id} className="group">
                <div className="relative mb-6 overflow-hidden bg-white">
                  <img 
                    src={product.image}
                    alt={product.name}
                    className="w-full h-80 object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                  />
                  {product.badge && (
                    <span className="absolute top-4 right-4 bg-[#2C3539] text-white px-4 py-2 text-xs font-black tracking-wide">
                      {product.badge}
                    </span>
                  )}
                  <span className={`absolute top-4 left-4 ${product.stock === "In Stock" ? "bg-[#87A96B]" : "bg-[#F4C7C3]"} text-white px-4 py-2 text-xs font-black`}>
                    {product.stock}
                  </span>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-[#87A96B] font-black uppercase tracking-widest mb-2">
                      {product.category}
                    </p>
                    <h3 className="text-xl font-bold text-[#2C3539] leading-tight">
                      {product.name}
                    </h3>
                  </div>
                  
                  <div className="flex items-baseline gap-2">
                    <span className="text-sm text-[#2C3539]/60 font-medium">KES</span>
                    <span className="text-3xl font-black text-[#2C3539]">
                      {product.price.toLocaleString()}
                    </span>
                  </div>

                  <button className="w-full bg-[#2C3539] text-white py-4 font-bold hover:bg-[#87A96B] transition-all group-hover:translate-y-0 translate-y-1">
                    {product.stock === "In Stock" ? "ADD TO CART" : "JOIN WAITLIST"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Section */}
      <section id="about" className="py-24 lg:py-32 px-6 lg:px-12 bg-white">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <div className="lg:sticky lg:top-32">
              <h2 className="text-6xl lg:text-8xl font-black text-[#2C3539] leading-[0.9] mb-8">
                why
                <br />
                premium
                <br />
                supplements
                <br />
                <span className="text-[#87A96B]">matter</span>
              </h2>
            </div>

            <div className="space-y-8 text-lg lg:text-xl text-[#2C3539]/80 leading-relaxed">
              <p className="text-2xl lg:text-3xl font-bold text-[#2C3539]">
                We're not here to sell you cheap vitamins filled with fillers.
              </p>
              
              <p>
                <strong className="text-[#87A96B] font-black">70% of Kenyans are zinc deficient.</strong> <strong className="text-[#87A96B] font-black">36% of women lack essential iron.</strong> These are the exact nutrients your hair follicles need to grow.
              </p>
              
              <p>
                You can spend thousands on external hair products, but if your body doesn't have the nutrients to build healthy strands from within, you're fighting an uphill battle.
              </p>
              
              <p>
                Kijivu brings you premium American supplements with clinically-backed ingredients like <strong className="font-black">Lustriva®, Biotin, and bioavailable vitamins</strong> your body can actually absorb.
              </p>

              <div className="pt-8 border-t-2 border-[#87A96B]">
                <p className="text-2xl font-black text-[#87A96B] italic">
                  Real nutrition. Real results.
                  <br />
                  Real transformation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 lg:py-32 px-6 lg:px-12 bg-[#87A96B] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[#2C3539] transform skew-x-12 translate-x-1/2"></div>
        
        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="max-w-4xl">
            <h2 className="text-6xl lg:text-8xl font-black text-white leading-[0.9] mb-8">
              ready to
              <br />
              transform
              <br />
              your wellness
              <br />
              journey?
            </h2>
            
            <p className="text-xl lg:text-2xl text-white/90 font-medium mb-12 max-w-2xl">
              Join hundreds of East African women who've chosen to nourish their bodies from within.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="#shop"
                className="group bg-white text-[#87A96B] px-10 py-5 text-lg font-black hover:bg-[#2C3539] hover:text-white transition-all flex items-center justify-center gap-3"
              >
                START YOUR WELLNESS JOURNEY
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </a>
              
              <a 
                href="https://wa.me/254705016590"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-transparent border-4 border-white text-white px-10 py-5 text-lg font-black hover:bg-white hover:text-[#87A96B] transition-all flex items-center justify-center gap-3"
              >
                <MessageCircle className="w-6 h-6" />
                CHAT ON WHATSAPP
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#2C3539] text-white py-16 px-6 lg:px-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-[#87A96B] flex items-center justify-center">
                  <span className="text-xl font-black text-white">K</span>
                </div>
                <h3 className="text-2xl font-black">KIJIVU</h3>
              </div>
              <p className="text-white/60 text-sm font-medium">
                premium wellness for the
                <br />
                modern african woman
              </p>
            </div>

            <div>
              <h4 className="font-black mb-6 text-lg">SHOP</h4>
              <ul className="space-y-3 text-white/70 text-sm font-medium">
                <li><a href="#" className="hover:text-white transition-colors">hair growth</a></li>
                <li><a href="#" className="hover:text-white transition-colors">kids health</a></li>
                <li><a href="#" className="hover:text-white transition-colors">maternal health</a></li>
                <li><a href="#" className="hover:text-white transition-colors">all products</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-black mb-6 text-lg">SUPPORT</h4>
              <ul className="space-y-3 text-white/70 text-sm font-medium">
                <li><a href="#" className="hover:text-white transition-colors">faqs</a></li>
                <li><a href="#" className="hover:text-white transition-colors">delivery info</a></li>
                <li><a href="#" className="hover:text-white transition-colors">returns</a></li>
                <li><a href="https://wa.me/254705016590" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">contact us</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-black mb-6 text-lg">CONNECT</h4>
              <div className="space-y-4">
                <a 
                  href="https://wa.me/254705016590"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-white/70 hover:text-white transition-colors text-sm font-medium group"
                >
                  <MessageCircle className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
                  whatsapp support
                </a>
                <p className="text-white/70 text-sm font-medium">
                  +254 705 016 590
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-white/50 font-medium">
            <p>&copy; 2026 kijivu. all rights reserved.</p>
            <p className="mt-4 md:mt-0">
              delivering premium wellness across kenya & uganda 🇰🇪 🇺🇬
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;