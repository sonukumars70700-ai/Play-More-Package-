import React from 'react';
import { motion } from 'motion/react';
import { features, benefits } from '../data';
import { ShieldCheck } from 'lucide-react';

export function Features() {
  return (
    <section id="benefits" className="py-24 bg-black relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* About Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl md:text-5xl font-serif font-bold">
              Elevate Your <span className="gold-text-gradient">Daily Standard</span>
            </h2>
            <p className="text-gray-400 text-lg font-light leading-relaxed">
              PlayMore Max isn't just a supplement; it's a commitment to excellence. We source only the most potent, premium natural ingredients to formulate a wellness solution that supports your dynamic lifestyle. 
            </p>
            <p className="text-gray-400 text-lg font-light leading-relaxed">
              Experience the luxury of sustained energy, enhanced focus, and robust vitality without compromise.
            </p>
          </motion.div>
        </div>

        {/* Why Choose Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Why Choose <span className="gold-text-gradient">PlayMore Max</span></h2>
          <div className="w-24 h-1 bg-gold mx-auto mb-12"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-panel p-8 text-center hover:-translate-y-2 transition-transform duration-300"
              >
                <div className="mx-auto w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mb-6 border border-gold/20 text-gold">
                  <Icon size={32} />
                </div>
                <h3 className="text-xl font-serif font-bold mb-3 text-white">{feature.title}</h3>
                <p className="text-gray-400 text-sm font-light">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Core Benefits */}
        <div className="max-w-4xl mx-auto glass-panel p-8 md:p-12 border-gold/30">
          <h2 className="text-3xl font-serif font-bold text-center mb-12">Core <span className="gold-text-gradient">Benefits</span></h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center space-x-4 bg-white/5 p-4 rounded-sm border border-white/10"
              >
                <ShieldCheck className="text-gold shrink-0" size={24} />
                <span className="text-gray-200 font-medium">{benefit}</span>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
