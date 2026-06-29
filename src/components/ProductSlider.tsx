import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Upload, X, ArrowLeft, ArrowRight, Trash2, Image as ImageIcon, Pencil, Replace, Upload as UploadIcon } from 'lucide-react';
import { ProductId, useImages } from '../ImageContext';

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

interface ProductSliderProps {
  productId: ProductId;
}

export function ProductSlider({ productId }: ProductSliderProps) {
  const { images, setImages, removeImage, reorderImages, replaceImage } = useImages();
  const productImages = images[productId];
  const [activeImage, setActiveImage] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isMenuOpen) return;
    const handleClickOutside = () => setIsMenuOpen(false);
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMenuOpen]);

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (productImages.length > 0) {
      setActiveImage((prev) => (prev + 1) % productImages.length);
    }
  };

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (productImages.length > 0) {
      setActiveImage((prev) => (prev === 0 ? productImages.length - 1 : prev - 1));
    }
  };

  const handleDragEnd = (e: any, { offset, velocity }: any) => {
    const swipe = swipePower(offset.x, velocity.x);
    if (swipe < -swipeConfidenceThreshold) {
      nextImage();
    } else if (swipe > swipeConfidenceThreshold) {
      prevImage();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newImages: string[] = [];
      Array.from(e.target.files).forEach((file: File) => {
        if (file.type.startsWith('image/')) {
          newImages.push(URL.createObjectURL(file));
        }
      });
      setImages(productId, newImages);
    }
  };

  const moveLeft = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeImage > 0) {
      reorderImages(productId, activeImage, activeImage - 1);
      setActiveImage(activeImage - 1);
    }
  };

  const moveRight = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeImage < productImages.length - 1) {
      reorderImages(productId, activeImage, activeImage + 1);
      setActiveImage(activeImage + 1);
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    removeImage(productId, activeImage);
    if (activeImage > 0) {
      setActiveImage(activeImage - 1);
    }
  };

  const handleReplace = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newUrl = URL.createObjectURL(e.target.files[0]);
      replaceImage(productId, activeImage, newUrl);
    }
  };

  return (
    <div className="w-full flex flex-col mb-8 relative">
      {/* Main Image View */}
      <div className="relative aspect-square w-full bg-darker rounded-sm border border-white/5 overflow-hidden group">
        {productImages.length === 0 ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center border-2 border-dashed border-white/10 hover:border-gold/30 transition-colors bg-white/5 hover:bg-white/10 cursor-pointer" onClick={() => fileInputRef.current?.click()}>
            <ImageIcon size={32} className="text-gray-500 mb-4" />
            <p className="text-white font-medium mb-2">No Images Added Yet</p>
            <p className="text-gray-400 text-sm mb-4">Click to upload up to 5 images</p>
            <button className="bg-gold text-black text-xs font-bold py-2 px-4 rounded-sm flex items-center gap-2">
              <Upload size={14} /> Upload Images
            </button>
          </div>
        ) : (
          <>
            <AnimatePresence mode="wait">
              <motion.img 
                key={activeImage}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                src={productImages[activeImage]} 
                alt={`${productId} - Image ${activeImage + 1}`} 
                className="w-full h-full object-cover cursor-grab active:cursor-grabbing"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={handleDragEnd}
                loading="lazy"
              />
            </AnimatePresence>
            
            {/* Arrows */}
            {productImages.length > 1 && (
              <>
                <button 
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white hover:text-gold border border-white/10 opacity-0 group-hover:opacity-100 transition-all md:block hidden"
                >
                  <ChevronLeft size={20} />
                </button>
                <button 
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white hover:text-gold border border-white/10 opacity-0 group-hover:opacity-100 transition-all md:block hidden"
                >
                  <ChevronRight size={20} />
                </button>
              </>
            )}

            {/* Counter */}
            <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-sm text-xs text-white/80 border border-white/10">
              {activeImage + 1} / {productImages.length}
            </div>

            {/* Edit Menu Trigger */}
            <div className="absolute top-3 right-3 z-20">
              <button 
                onClick={(e) => { e.stopPropagation(); setIsMenuOpen(!isMenuOpen); }}
                className={`bg-black/60 p-2 rounded-full text-white hover:text-gold border border-white/20 shadow-lg transition-opacity ${isMenuOpen ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
              >
                <Pencil size={16} />
              </button>
              
              {isMenuOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-[#1A1A1A] border border-white/10 rounded-sm shadow-xl py-1 overflow-hidden" onClick={e => e.stopPropagation()}>
                  <label className="flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:bg-white/5 hover:text-gold cursor-pointer transition-colors">
                    <Replace size={14} />
                    <span>Replace Image</span>
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => { handleReplace(e); setIsMenuOpen(false); }} />
                  </label>
                  
                  {productImages.length < 5 && (
                    <label className="flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:bg-white/5 hover:text-gold cursor-pointer transition-colors border-t border-white/5">
                      <UploadIcon size={14} />
                      <span>Upload New Image</span>
                      <input type="file" multiple accept="image/*" className="hidden" onChange={(e) => { handleFileChange(e); setIsMenuOpen(false); }} />
                    </label>
                  )}
                  
                  <button 
                    onClick={(e) => {
                      if(window.confirm('Are you sure you want to delete this image?')) {
                        handleRemove(e);
                      }
                      setIsMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors border-t border-white/5 text-left"
                  >
                    <Trash2 size={14} />
                    <span>Delete Image</span>
                  </button>
                  
                  <button 
                    onClick={() => setIsMenuOpen(false)}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-400 hover:bg-white/5 transition-colors border-t border-white/5 text-left"
                  >
                    <X size={14} />
                    <span>Cancel</span>
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {productImages.length > 0 && (
        <div className="flex justify-center gap-2 mt-4">
          {productImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveImage(idx)}
              className={`w-12 h-12 rounded-sm overflow-hidden border-2 transition-all ${activeImage === idx ? 'border-gold shadow-[0_0_10px_rgba(212,175,55,0.3)]' : 'border-white/10 opacity-60 hover:opacity-100'}`}
            >
              <img src={img} alt={`Thumb ${idx + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
          {productImages.length < 5 && (
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="w-12 h-12 rounded-sm border-2 border-dashed border-white/20 flex items-center justify-center text-white/50 hover:text-gold hover:border-gold/50 transition-colors bg-white/5"
            >
              <Upload size={16} />
            </button>
          )}
        </div>
      )}

      {/* Global Hidden Input for adding new images */}
      <input 
        type="file" 
        multiple 
        accept="image/*" 
        className="hidden" 
        ref={fileInputRef} 
        onChange={handleFileChange}
      />
    </div>
  );
}
