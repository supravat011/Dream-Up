import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const HomeParallax: React.FC = () => {
  return (
    <div className="relative">
      {/* SECTION 1: HERO PARALLAX */}
      <section className="sticky top-0 h-screen w-full overflow-hidden z-0">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop"
            alt="Fashion Hero"
            className="w-full h-full object-cover brightness-[0.6]"
          />
        </div>
        <div className="relative h-full flex flex-col justify-center items-center text-center text-white p-4">
          <h1 className="text-6xl md:text-8xl font-serif tracking-tight mb-6 animate-fade-in-up">
            Ethereal <br /> Elegance
          </h1>
          <p className="text-xl md:text-2xl font-light tracking-widest uppercase mb-12 opacity-90">
            Fall / Winter 2025
          </p>
          <Link
            to="/shop"
            className="group flex items-center gap-4 text-lg tracking-widest hover:text-brand transition-colors duration-300"
          >
            DISCOVER COLLECTION
            <span className="group-hover:translate-x-2 transition-transform duration-300">
              <ArrowRight className="w-5 h-5" />
            </span>
          </Link>
        </div>
      </section>

      {/* SECTION 2: INTRO (White Background covers fixed hero) */}
      <section className="relative bg-white py-32 px-4 md:px-12 z-10 shadow-[0_-20px_40px_rgba(0,0,0,0.1)]">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm font-bold tracking-[0.3em] text-gray-400 mb-8 uppercase">Philosophy</p>
          <h2 className="text-4xl md:text-6xl font-serif leading-tight text-gray-900 mb-8">
            "Fashion is the armor to survive the reality of everyday life."
          </h2>
          <p className="text-lg text-gray-500 font-light leading-relaxed">
            DreamUp isn't just a store; it's a curated experience. We blend the physical and digital worlds to bring you a wardrobe that transcends boundaries.
          </p>
        </div>
      </section>

      {/* SECTION 3: SPLIT PARALLAX */}
      <section className="relative z-10 bg-gray-100">
        <div className="flex flex-col md:flex-row min-h-screen">
          {/* Left Image - Sticky */}
          <div className="md:w-1/2 relative h-[50vh] md:h-screen sticky top-0">
            <img
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2000&auto=format&fit=crop"
              alt="Model Posing"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/10"></div>
          </div>

          {/* Right Content - Scrollable */}
          <div className="md:w-1/2 flex items-center bg-white p-12 md:p-24">
            <div className="max-w-md">
              <span className="text-brand font-mono text-sm mb-4 block">01 — INNOVATION</span>
              <h3 className="text-4xl font-serif mb-6">Virtual Fitting Room</h3>
              <p className="text-gray-600 leading-relaxed mb-8">
                No more guessing. Our AI-powered virtual dressing room allows you to visualize textures, cuts, and fits on your own digital avatar before you buy. Experience the perfect fit from the comfort of your home.
              </p>
              <Link to="/try-on" className="inline-block border-b border-black pb-1 uppercase text-sm tracking-widest hover:text-brand hover:border-brand transition-all">
                Try It Now
              </Link>
            </div>
          </div>
        </div>

        <div className="flex flex-col-reverse md:flex-row min-h-screen">
          {/* Left Content - Scrollable */}
          <div className="md:w-1/2 flex items-center bg-[#f8f5f2] p-12 md:p-24">
            <div className="max-w-md ml-auto text-right md:text-left">
              <span className="text-brand font-mono text-sm mb-4 block">02 — STYLING</span>
              <h3 className="text-4xl font-serif mb-6">AI Outfit Planner</h3>
              <p className="text-gray-600 leading-relaxed mb-8">
                Stuck in a style rut? Let our intelligent algorithms curate outfits tailored to your specific occasions, weather, and mood. It's like having a personal stylist in your pocket.
              </p>
              <Link to="/planner" className="inline-block border-b border-black pb-1 uppercase text-sm tracking-widest hover:text-brand hover:border-brand transition-all">
                Plan Your Look
              </Link>
            </div>
          </div>

          {/* Right Image - Sticky */}
          <div className="md:w-1/2 relative h-[50vh] md:h-screen sticky top-0">
            <img
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop"
              alt="Outfit Planning"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* SECTION 4: FULL WIDTH VIDEO/IMAGE BREAK */}
      <section className="relative h-[80vh] z-10 flex items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0 opacity-60">
          <img
            src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070&auto=format&fit=crop"
            className="w-full h-full object-cover"
            alt="Runway"
          />
        </div>
        <div className="relative z-20 text-center text-white px-4">
          <h2 className="text-5xl md:text-7xl font-serif italic mb-6">"Style is a way to say who you are without having to speak."</h2>
          <p className="text-xl uppercase tracking-widest">— Rachel Zoe</p>
        </div>
      </section>

      {/* SECTION 5: SHOP TEASER */}
      <section className="relative z-10 bg-white py-32 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-16">
            <h2 className="text-4xl font-serif text-gray-900">New Arrivals</h2>
            <Link to="/shop" className="text-sm border-b border-gray-300 pb-1 hover:border-black transition-all">VIEW ALL</Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Silk Evening Dress",
                price: "$250",
                img: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1966&auto=format&fit=crop"
              },
              {
                name: "Structured Blazer",
                price: "$180",
                img: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1936&auto=format&fit=crop"
              },
              {
                name: "Leather Boots",
                price: "$150",
                img: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?q=80&w=1974&auto=format&fit=crop"
              }
            ].map((item, idx) => (
              <div key={idx} className="group cursor-pointer">
                <div className="relative overflow-hidden mb-4 h-[500px]">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="bg-white text-black px-8 py-3 uppercase tracking-widest text-xs font-bold hover:bg-black hover:text-white transition-colors">
                      Quick View
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-serif">{item.name}</h3>
                    <p className="text-sm text-gray-500">New Collection</p>
                  </div>
                  <span className="font-medium font-serif">{item.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeParallax;
