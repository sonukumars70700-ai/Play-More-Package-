import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { BuyNowButton } from './Button';
import { BUY_URL } from '../config';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Benefits', href: '#benefits' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'FAQ', href: '#faq' },
  ];

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'glass-panel py-3' : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex-shrink-0 cursor-pointer">
              <a href="#" className="font-serif text-2xl font-bold tracking-wider uppercase flex items-center gap-2">
                <span className="text-white">ManX</span>
                <span className="gold-text-gradient">360</span>
              </a>
            </div>
            
            <nav className="hidden md:flex space-x-8">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  className="text-sm font-medium text-gray-300 hover:text-gold transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            <div className="hidden md:block">
              <BuyNowButton href="https://superprofile.bio/vp/FuelYourFitness-Journey" className="py-2 px-6 text-sm">Buy Now</BuyNowButton>
            </div>

            <div className="md:hidden">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gold p-2"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-black/95 pt-24 px-4 flex flex-col items-center gap-8 md:hidden glass-panel"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="font-serif text-2xl text-white hover:text-gold transition-colors"
              >
                {link.name}
              </a>
            ))}
            <BuyNowButton 
              href="https://superprofile.bio/vp/FuelYourFitness-Journey"
              className="mt-8 w-full"
            >
              Buy Now
            </BuyNowButton>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
