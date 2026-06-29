import React from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductGallery } from './components/ProductGallery';
import { Packages } from './components/Packages';
import { Features } from './components/Features';
import { Ingredients } from './components/Ingredients';
import { HowToUse } from './components/HowToUse';
import { Reviews } from './components/Reviews';
import { FAQ } from './components/FAQ';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { ImageProvider } from './ImageContext';

export default function App() {
  return (
    <ImageProvider>
      <div className="min-h-screen bg-[#0A0A0A] text-white selection:bg-gold/30 selection:text-white">
        <Header />
        
        <main>
          <Hero />
          <Packages />
          <ProductGallery />
          <Features />
          <Ingredients />
          <HowToUse />
          <Reviews />
          <FAQ />
          <FinalCTA />
        </main>
        
        <Footer />
      </div>
    </ImageProvider>
  );
}

