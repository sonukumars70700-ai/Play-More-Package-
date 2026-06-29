/// <reference types="vite/client" />
import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { Star, ShieldCheck, Truck, CreditCard, Pencil } from 'lucide-react';
import { BuyNowButton } from './Button';
import { useImages } from '../ImageContext';

export function Hero() {
  const { images, replaceImage } = useImages();
  const heroImage = images.hero && images.hero.length > 0 ? images.hero[0] : null;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleReplace = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newUrl = URL.createObjectURL(e.target.files[0]);
      // We assume there's always at least one image in hero, or we can use setImages if empty
      replaceImage('hero', 0, newUrl);
    }
  };

  return (
    <section className="relative min-h-[90vh] flex items-center pt-24 md:pt-32 pb-16 overflow-hidden">
      {/* Background with luxury glow */}
      <div className="absolute inset-0 bg-[#0A0A0A] z-0">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="flex flex-col items-center lg:items-start text-center lg:text-left pt-2 lg:pt-8"
            >
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-serif font-bold leading-tight mb-4 text-white">
                PlayMore Max
              </h1>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mb-8">
                <div className="flex items-center text-gold">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} className="fill-current" />
                  ))}
                </div>
                <span className="text-sm md:text-base font-medium text-gray-300">4.8/5</span>
                <span className="w-1 h-1 bg-gray-600 rounded-full hidden sm:block" />
                <span className="text-sm md:text-base font-medium text-gold border-b border-gold/30 pb-0.5">Trusted by 62,040+ Customers</span>
              </div>

              <p className="text-lg md:text-xl text-gray-400 font-light leading-relaxed mb-10 max-w-2xl">
                Experience the pinnacle of daily wellness with PlayMore Max. A premium, science-backed formula designed to support your active lifestyle and naturally elevate your energy and performance.
              </p>
              
              <div className="mb-10">
                <span className="text-sm text-gray-400 uppercase tracking-widest font-medium mb-2 block">Starting From</span>
                <div className="flex items-baseline justify-center lg:justify-start gap-3">
                  <span className="text-5xl md:text-6xl font-bold gold-text-gradient">₹999</span>
                  <span className="text-xl md:text-2xl text-gray-500 line-through">₹1,499</span>
                </div>
              </div>

              <div className="w-full max-w-md mx-auto lg:mx-0 flex flex-col space-y-4 mb-12">
                <BuyNowButton href="https://superprofile.bio/vp/unlock-your-energy" className="w-full text-lg py-5 px-12 uppercase tracking-wider shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]">
                  Buy Now
                </BuyNowButton>
              </div>

              <div className="grid grid-cols-3 gap-4 md:gap-8 pt-10 w-full border-t border-white/10">
                <div className="flex flex-col items-center lg:items-start space-y-3">
                  <Truck className="text-gold" size={24} />
                  <span className="text-xs md:text-sm text-gray-300 font-medium">Free Shipping</span>
                </div>
                <div className="flex flex-col items-center lg:items-start space-y-3">
                  <CreditCard className="text-gold" size={24} />
                  <span className="text-xs md:text-sm text-gray-300 font-medium">Secure Payment</span>
                </div>
                <div className="flex flex-col items-center lg:items-start space-y-3">
                  <ShieldCheck className="text-gold" size={24} />
                  <span className="text-xs md:text-sm text-gray-300 font-medium">Premium Packaging</span>
                </div>
              </div>
            </motion.div>

            {/* Hero Image Section */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="relative w-full aspect-square max-w-lg mx-auto"
            >
              <div className="absolute inset-0 bg-gold/10 rounded-full blur-[100px] pointer-events-none" />
              <div className="relative w-full h-full rounded-lg overflow-hidden group">
                {heroImage ? (
                  <img src={heroImage} alt="PlayMore Max Product" className="w-full h-full object-contain drop-shadow-2xl" />
                ) : (
                  <div className="w-full h-full border-2 border-dashed border-white/20 flex items-center justify-center text-white/50">
                    No Image Selected
                  </div>
                )}
                
                {/* Edit Button overlay */}
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute top-4 right-4 bg-black/60 p-3 rounded-full text-white hover:text-gold border border-white/20 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label="Replace Hero Image"
                >
                  <Pencil size={20} />
                </button>
              </div>
            </motion.div>

          </div>
      </div>
      
      {/* Hidden file input for replacing hero image */}
      <input 
        type="file" 
        accept="image/*" 
        className="hidden" 
        ref={fileInputRef} 
        onChange={handleReplace}
      />
    </section>
  );
}
