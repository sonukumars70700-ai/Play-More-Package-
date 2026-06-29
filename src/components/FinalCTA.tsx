import React from 'react';
import { packages } from '../data';
import { BuyNowButton } from './Button';
import { motion } from 'motion/react';

export function FinalCTA() {
  return (
    <section className="py-24 bg-darker relative border-t border-gold/20 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-darker z-0">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gold/10 rounded-full blur-[120px] pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-serif font-bold mb-6">Don't Settle For <span className="gold-text-gradient">Average</span></h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">Choose your premium package today and start your journey towards peak performance and vitality.</p>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-12">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`flex-1 w-full max-w-sm glass-panel p-6 flex flex-col items-center text-center ${
                pkg.popular ? 'border-gold gold-border-glow scale-105 z-10' : 'border-white/10'
              }`}
            >
              {pkg.popular && <div className="text-gold text-xs font-bold uppercase tracking-widest mb-2">Most Popular</div>}
              <h3 className="font-serif text-xl font-bold text-white mb-2">{pkg.title}</h3>
              <div className="text-3xl font-bold gold-text-gradient mb-6">₹{pkg.price}</div>
              <BuyNowButton href={pkg.url} className="w-full py-3 text-sm">Buy Now</BuyNowButton>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
