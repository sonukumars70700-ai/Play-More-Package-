import React from 'react';
import { motion } from 'motion/react';
import { packages } from '../data';
import { BuyNowButton } from './Button';
import { Check } from 'lucide-react';
import { ProductSlider } from './ProductSlider';
import { ProductId } from '../ImageContext';

export function Packages() {
  return (
    <section id="packages" className="py-24 bg-dark relative border-t border-gold/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6">Choose Your <span className="gold-text-gradient">Premium Regimen</span></h2>
          <p className="text-gray-400 text-lg font-light">Select the package that best fits your lifestyle. Unlock exclusive savings with our Ultimate Combo.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative flex flex-col p-1 ${
                pkg.popular ? 'gold-gradient' : 'bg-white/5'
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-black border border-gold px-4 py-1 text-xs font-bold text-gold uppercase tracking-widest whitespace-nowrap z-10">
                  Most Popular
                </div>
              )}
              
              <div className="flex-1 bg-black flex flex-col p-6 md:p-8 glass-panel h-full">
                <h3 className="font-serif text-2xl font-bold mb-2 text-white">{pkg.title}</h3>
                
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-4xl font-bold gold-text-gradient">₹{pkg.price}</span>
                  <span className="text-lg text-gray-500 line-through">₹{pkg.originalPrice}</span>
                </div>

                {pkg.save && (
                  <div className="mb-6 inline-block bg-gold/10 text-gold text-sm font-semibold px-3 py-1 rounded-sm border border-gold/20">
                    Save ₹{pkg.save}
                  </div>
                )}
                
                <ProductSlider productId={pkg.id as ProductId} />

                <ul className="flex-1 space-y-4 mb-8">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-start text-gray-300">
                      <Check className="text-gold mr-3 shrink-0" size={20} />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <BuyNowButton href={pkg.url} className="w-full py-4 text-sm tracking-widest mt-auto">
                  Buy Now
                </BuyNowButton>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
