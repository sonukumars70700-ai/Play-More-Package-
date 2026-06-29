import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Maximize2, ChevronLeft, ChevronRight, Image as ImageIcon, Pencil, Replace, Upload as UploadIcon, Trash2 } from 'lucide-react';
import { useImages } from '../ImageContext';

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

export function ProductGallery() {
  const { images, setImages, removeImage, replaceImage } = useImages();
  const galleryImages = images.gallery;
  
  const [activeImage, setActiveImage] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
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
    if (galleryImages.length > 0) {
      setActiveImage((prev) => (prev + 1) % galleryImages.length);
    }
  };

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (galleryImages.length > 0) {
      setActiveImage((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
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
      setImages('gallery', newImages);
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    removeImage('gallery', activeImage);
    if (activeImage > 0) {
      setActiveImage(activeImage - 1);
    } else {
      setActiveImage(0); // stays at 0, which might point to next img if one exists
    }
  };

  const handleReplace = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newUrl = URL.createObjectURL(e.target.files[0]);
      replaceImage('gallery', activeImage, newUrl);
    }
  };

  // Ensure activeImage is valid if images are removed
  if (activeImage >= galleryImages.length && galleryImages.length > 0) {
    setActiveImage(0);
  }

  return (
    <section id="gallery" className="py-24 bg-dark relative border-t border-gold/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6">Product <span className="gold-text-gradient">Gallery</span></h2>
          <p className="text-gray-400 text-lg font-light">Experience the premium details of PlayMore Max.</p>
        </div>

        {galleryImages.length === 0 ? (
          <div className="max-w-3xl mx-auto border-2 border-dashed rounded-lg p-16 text-center border-white/10 bg-white/5 cursor-pointer hover:bg-white/10 hover:border-gold/30 transition-all" onClick={() => fileInputRef.current?.click()}>
            <div className="flex flex-col items-center justify-center">
              <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center mb-6 border border-white/10 shadow-[0_0_15px_rgba(212,175,55,0.1)] text-gray-500">
                <ImageIcon size={32} />
              </div>
              <h3 className="text-2xl font-serif font-bold mb-3 text-white">No Images Added Yet</h3>
              <p className="text-gray-400 mb-8 max-w-md">Click here to upload images to your gallery.</p>
              <button className="bg-gold text-black text-sm font-bold py-3 px-6 rounded-sm flex items-center gap-2">
                <UploadIcon size={16} /> Upload Images
              </button>
            </div>
          </div>
        ) : (
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Main Image Display */}
              <div className="lg:col-span-8 w-full">
                <div 
                  className="relative aspect-square md:aspect-[4/3] w-full rounded-sm overflow-hidden gold-border-glow bg-black/80 group cursor-zoom-in"
                  onClick={() => setIsFullscreen(true)}
                >
                  <AnimatePresence mode="wait">
                    <motion.img 
                      key={activeImage}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      src={galleryImages[activeImage]} 
                      alt="Product Gallery Main" 
                      className="object-contain w-full h-full cursor-grab active:cursor-grabbing"
                      loading="lazy"
                      drag="x"
                      dragConstraints={{ left: 0, right: 0 }}
                      dragElastic={1}
                      onDragEnd={handleDragEnd}
                    />
                  </AnimatePresence>
                  
                  <button 
                    className="absolute top-4 right-14 bg-black/50 p-2 rounded-full text-white/80 hover:text-gold hover:bg-black/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 md:flex hidden"
                    aria-label="Fullscreen"
                  >
                    <Maximize2 size={20} />
                  </button>

                  {/* Edit Menu Trigger */}
                  <div className="absolute top-4 right-4 z-20">
                    <button 
                      onClick={(e) => { e.stopPropagation(); setIsMenuOpen(!isMenuOpen); }}
                      className={`bg-black/60 p-2 rounded-full text-white hover:text-gold border border-white/20 shadow-lg transition-opacity ${isMenuOpen ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
                    >
                      <Pencil size={18} />
                    </button>
                    
                    {isMenuOpen && (
                      <div className="absolute top-full right-0 mt-2 w-48 bg-[#1A1A1A] border border-white/10 rounded-sm shadow-xl py-1 overflow-hidden" onClick={e => e.stopPropagation()}>
                        <label className="flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:bg-white/5 hover:text-gold cursor-pointer transition-colors">
                          <Replace size={14} />
                          <span>Replace Image</span>
                          <input type="file" accept="image/*" className="hidden" onChange={(e) => { handleReplace(e); setIsMenuOpen(false); }} />
                        </label>
                        
                        {galleryImages.length < 10 && (
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

                  <button 
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 p-3 rounded-full text-white hover:text-gold border border-white/10 opacity-0 group-hover:opacity-100 transition-all hidden md:block"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button 
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 p-3 rounded-full text-white hover:text-gold border border-white/10 opacity-0 group-hover:opacity-100 transition-all hidden md:block"
                  >
                    <ChevronRight size={24} />
                  </button>
                </div>
              </div>

              {/* Thumbnails Sidebar */}
              <div className="lg:col-span-4 flex flex-col gap-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-serif font-bold text-white">All Photos ({galleryImages.length})</h3>
                  {galleryImages.length < 10 && (
                    <button 
                      onClick={() => fileInputRef.current?.click()}
                      className="text-gold text-sm flex items-center gap-1 hover:text-gold/80"
                    >
                      <UploadIcon size={14} /> Add
                    </button>
                  )}
                </div>
                
                <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-3 gap-3 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                  {galleryImages.map((img, idx) => (
                    <div key={idx} className="relative group">
                      <button 
                        onClick={() => setActiveImage(idx)}
                        className={`w-full aspect-square rounded-sm overflow-hidden border-2 transition-all duration-300 ${activeImage === idx ? 'border-gold shadow-[0_0_15px_rgba(212,175,55,0.3)]' : 'border-white/10 opacity-60 hover:opacity-100 hover:border-gold/50'}`}
                      >
                        <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" loading="lazy" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}
      </div>

      {/* Global Hidden Input for adding new images */}
      <input 
        type="file" 
        multiple 
        accept="image/*" 
        className="hidden" 
        ref={fileInputRef} 
        onChange={handleFileChange}
      />

      {/* Fullscreen Gallery Modal */}
      <AnimatePresence>
        {isFullscreen && galleryImages.length > 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[#0A0A0A]/95 backdrop-blur-md flex items-center justify-center"
          >
            <button 
              onClick={() => setIsFullscreen(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-white bg-black/50 p-3 rounded-full z-50 transition-colors border border-white/10 hover:border-gold"
            >
              <X size={24} />
            </button>
            
            <button 
              onClick={prevImage}
              className="absolute left-4 md:left-12 text-white bg-black/50 p-4 rounded-full z-50 hover:text-gold border border-white/10 hover:border-gold transition-colors hidden md:block"
            >
              <ChevronLeft size={32} />
            </button>

            <button 
              onClick={nextImage}
              className="absolute right-4 md:right-12 text-white bg-black/50 p-4 rounded-full z-50 hover:text-gold border border-white/10 hover:border-gold transition-colors hidden md:block"
            >
              <ChevronRight size={32} />
            </button>
            
            <div className="w-full h-full max-w-5xl max-h-screen p-4 flex flex-col items-center justify-center outline-none" 
                 onClick={(e) => {
                   if (e.target === e.currentTarget) setIsFullscreen(false);
                 }}
            >
              <motion.img 
                key={activeImage}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                src={galleryImages[activeImage]} 
                alt="Fullscreen Preview" 
                className="max-w-full max-h-[75vh] object-contain shadow-2xl rounded-sm gold-border-glow select-none cursor-grab active:cursor-grabbing"
                onClick={(e) => e.stopPropagation()}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={handleDragEnd}
              />
              
              {/* Mobile Swipe Hint */}
              <p className="text-white/50 text-sm mt-4 md:hidden">Swipe to browse</p>
            </div>
            
            {/* Fullscreen Thumbnails */}
            <div className="absolute bottom-6 md:bottom-8 left-0 right-0 flex justify-center gap-2 md:gap-3 px-4 overflow-x-auto pb-4 scrollbar-hide">
              {galleryImages.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-sm overflow-hidden border-2 transition-all duration-300 ${activeImage === idx ? 'border-gold shadow-[0_0_15px_rgba(212,175,55,0.5)] scale-110' : 'border-white/20 opacity-50 hover:opacity-100 hover:border-white'}`}
                >
                   <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
