import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { reviews } from '../data';
import { Star, CheckCircle2, ThumbsUp } from 'lucide-react';

export function Reviews() {
  const [visibleReviews, setVisibleReviews] = useState(6);

  const loadMore = () => {
    setVisibleReviews(prev => Math.min(prev + 6, reviews.length));
  };

  return (
    <section id="reviews" className="py-24 bg-dark relative border-y border-gold/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Stats */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6">Customer <span className="gold-text-gradient">Experiences</span></h2>
          
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 sm:gap-8 glass-panel px-8 py-6 rounded-sm border-gold/30">
            <div className="flex flex-col items-center">
              <div className="text-4xl font-bold text-white mb-2">4.8<span className="text-2xl text-gray-400">/5</span></div>
              <div className="flex text-gold mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={20} className="fill-current" />
                ))}
              </div>
              <p className="text-sm text-gray-400">Based on 62,040+ Reviews</p>
            </div>
            
            <div className="hidden sm:block w-px h-20 bg-white/10"></div>
            
            <div className="flex flex-col gap-2 w-full sm:w-64">
              {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center gap-2 text-sm text-gray-400">
                  <span className="w-3 text-right">{rating}</span>
                  <Star size={12} className="text-gold fill-current" />
                  <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gold rounded-full"
                      style={{ width: rating === 5 ? '85%' : rating === 4 ? '12%' : '1%' }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <AnimatePresence>
            {reviews.slice(0, visibleReviews).map((review) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-black/50 border border-white/5 p-6 rounded-sm hover:border-gold/30 transition-colors"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-gold font-serif text-lg font-bold">
                      {review.avatar}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-semibold text-white">{review.name}</span>
                        <CheckCircle2 size={14} className="text-green-500" />
                      </div>
                      <span className="text-xs text-gray-500">{review.city} • Verified Buyer</span>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500">{review.date}</div>
                </div>
                
                <div className="flex text-gold mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className={i < review.rating ? "fill-current" : "text-gray-600"} />
                  ))}
                </div>
                
                <p className="text-gray-300 text-sm leading-relaxed mb-6">"{review.text}"</p>
                
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <button className="flex items-center gap-1.5 hover:text-gold transition-colors">
                    <ThumbsUp size={14} />
                    <span>Helpful ({review.helpfulCount})</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {visibleReviews < reviews.length && (
          <div className="text-center">
            <button 
              onClick={loadMore}
              className="px-8 py-3 bg-transparent border border-gold/50 text-gold hover:bg-gold/10 transition-colors font-medium tracking-wide"
            >
              Load More Reviews
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
