import React from 'react';
import { Facebook, Instagram, Youtube } from 'lucide-react';
import { BUY_URL } from '../config';

export function Footer() {
  return (
    <footer className="bg-black pt-16 pb-24 md:pb-8 border-t border-white/5 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand */}
          <div className="space-y-6">
            <a href="#" className="font-serif text-2xl font-bold tracking-wider uppercase flex items-center gap-2">
              <span className="text-white">ManX</span>
              <span className="gold-text-gradient">360</span>
            </a>
            <p className="text-gray-400 text-sm leading-relaxed">
              Premium wellness designed for the modern man. Elevate your daily routine with science-backed, natural ingredients.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-gold transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-gold transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-gold transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-serif font-bold uppercase tracking-wider mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="#benefits" className="text-gray-400 hover:text-gold transition-colors text-sm">Benefits</a></li>
              <li><a href="#ingredients" className="text-gray-400 hover:text-gold transition-colors text-sm">Ingredients</a></li>
              <li><a href="#reviews" className="text-gray-400 hover:text-gold transition-colors text-sm">Customer Reviews</a></li>
              <li><a href="#faq" className="text-gray-400 hover:text-gold transition-colors text-sm">FAQ</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-serif font-bold uppercase tracking-wider mb-6">Legal</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Terms & Conditions</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Shipping Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Refund Policy</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-serif font-bold uppercase tracking-wider mb-6">Contact Us</h4>
            <ul className="space-y-3">
              <li className="text-gray-400 text-sm">Support: care@manx360.com</li>
              <li className="text-gray-400 text-sm">Available Mon-Sat, 9AM to 6PM</li>
              <li>
                <a href={BUY_URL} target="_blank" rel="noopener noreferrer" className="inline-block mt-4 text-gold hover:text-white text-sm font-medium border-b border-gold pb-1 transition-colors">
                  Contact Support
                </a>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>Disclaimer: These statements have not been evaluated by the FDA. This product is not intended to diagnose, treat, cure, or prevent any disease.</p>
          <p>&copy; 2025 ManX360. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
