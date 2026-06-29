import React from 'react';
import { motion } from 'motion/react';

export function HowToUse() {
  return (
    <section className="py-24 bg-black relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6">The Daily <span className="gold-text-gradient">Ritual</span></h2>
          <p className="text-gray-400 text-lg font-light max-w-2xl mx-auto">Seamlessly integrate PlayMore Max into your morning routine for optimal sustained results.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-5xl mx-auto">
          {/* Powder */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-panel p-8 md:p-12 border-gold/30 text-center"
          >
            <h3 className="text-3xl font-serif font-bold text-white mb-8">Powder Routine</h3>
            
            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-auto before:mr-auto before:w-px before:bg-gold/20 before:-z-10 z-10">
              <div className="bg-black border border-gold/30 p-4 w-48 mx-auto rounded-sm">
                <span className="block text-gold font-bold text-xl mb-1">Step 1</span>
                <span className="text-gray-300 text-sm">Take 1 Scoop</span>
              </div>
              
              <div className="w-8 h-8 rounded-full bg-gold text-black mx-auto flex items-center justify-center font-bold">↓</div>
              
              <div className="bg-black border border-gold/30 p-4 w-48 mx-auto rounded-sm">
                <span className="block text-gold font-bold text-xl mb-1">Step 2</span>
                <span className="text-gray-300 text-sm">Mix with 200ml Water/Milk</span>
              </div>
              
              <div className="w-8 h-8 rounded-full bg-gold text-black mx-auto flex items-center justify-center font-bold">↓</div>
              
              <div className="bg-black border border-gold/30 p-4 w-48 mx-auto rounded-sm">
                <span className="block text-gold font-bold text-xl mb-1">Step 3</span>
                <span className="text-gray-300 text-sm">Drink Daily</span>
              </div>
            </div>
          </motion.div>

          {/* Capsules */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-panel p-8 md:p-12 border-gold/30 text-center"
          >
            <h3 className="text-3xl font-serif font-bold text-white mb-8">Capsule Routine</h3>
            
            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-auto before:mr-auto before:w-px before:bg-gold/20 before:-z-10 z-10">
              <div className="bg-black border border-gold/30 p-4 w-48 mx-auto rounded-sm">
                <span className="block text-gold font-bold text-xl mb-1">Step 1</span>
                <span className="text-gray-300 text-sm">Take 2 Capsules</span>
              </div>
              
              <div className="w-8 h-8 rounded-full bg-gold text-black mx-auto flex items-center justify-center font-bold">↓</div>
              
              <div className="bg-black border border-gold/30 p-4 w-48 mx-auto rounded-sm">
                <span className="block text-gold font-bold text-xl mb-1">Step 2</span>
                <span className="text-gray-300 text-sm">With Water</span>
              </div>
              
              <div className="w-8 h-8 rounded-full bg-gold text-black mx-auto flex items-center justify-center font-bold">↓</div>
              
              <div className="bg-black border border-gold/30 p-4 w-48 mx-auto rounded-sm">
                <span className="block text-gold font-bold text-xl mb-1">Step 3</span>
                <span className="text-gray-300 text-sm">Drink Daily</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
