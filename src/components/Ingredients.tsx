import React from 'react';
import { motion } from 'motion/react';
import { ingredients } from '../data';

export function Ingredients() {
  return (
    <section id="ingredients" className="py-24 bg-darker relative border-y border-gold/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6">Nature's <span className="gold-text-gradient">Finest Elements</span></h2>
          <p className="text-gray-400 text-lg font-light">Crafted with a proprietary blend of ancient herbs and modern science.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ingredients.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative overflow-hidden glass-panel"
            >
              <div className="p-6 border-t border-gold/20">
                <h3 className="text-2xl font-serif font-bold mb-2 text-gold">{item.name}</h3>
                <p className="text-gray-400 text-sm font-light leading-relaxed">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
