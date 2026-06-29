import React, { createContext, useContext, useState, ReactNode } from 'react';

// Powder Images
import img_p1 from './assets/images/regenerated_image_1782687432916.webp';
import img_p2 from './assets/images/regenerated_image_1782684613722.webp';
import img_p3 from './assets/images/regenerated_image_1782684615260.webp';
import img_p4 from './assets/images/regenerated_image_1782684616951.webp';
import img_p5 from './assets/images/regenerated_image_1782684618432.webp';

// Capsules Images
import img_c1 from './assets/images/regenerated_image_1782687584648.jpg';
import img_c2 from './assets/images/regenerated_image_1782684621095.jpg';
import img_c3 from './assets/images/regenerated_image_1782684622978.jpg';
import img_c4 from './assets/images/regenerated_image_1782687589047.jpg';
import img_c5 from './assets/images/regenerated_image_1782686782946.webp';

// Combo Images
import img_cm1 from './assets/images/regenerated_image_1782687894295.png';
import img_cm2 from './assets/images/regenerated_image_1782687898873.jpg';
import img_cm3 from './assets/images/regenerated_image_1782687900613.webp';
import img_cm4 from './assets/images/regenerated_image_1782686788747.jpg';
import img_cm5 from './assets/images/regenerated_image_1782687903245.png';

export type ProductId = 'powder' | 'capsules' | 'combo' | 'hero' | 'gallery';

export interface ImageContextType {
  images: Record<ProductId, string[]>;
  setImages: (id: ProductId, newImages: string[]) => void;
  removeImage: (id: ProductId, index: number) => void;
  reorderImages: (id: ProductId, startIndex: number, endIndex: number) => void;
  replaceImage: (id: ProductId, index: number, newUrl: string) => void;
}

const ImageContext = createContext<ImageContextType | undefined>(undefined);

const defaultImages: Record<ProductId, string[]> = {
  powder: [
    img_p1, img_p2, img_p3, img_p4, img_p5
  ],
  capsules: [
    img_c1, img_c2, img_c3, img_c4, img_c5
  ],
  combo: [
    img_cm1, img_cm2, img_cm3, img_cm4, img_cm5
  ],
  hero: [
    // We can use one of the existing images for hero initially
    img_cm3
  ],
  gallery: [
    // Gallery can initially start empty or with a mix
    img_p1, img_c2, img_cm1, img_p3, img_cm4
  ]
};

export function ImageProvider({ children }: { children: ReactNode }) {
  const [images, setImagesState] = useState<Record<ProductId, string[]>>(defaultImages);

  const setImages = (id: ProductId, newImages: string[]) => {
    setImagesState(prev => {
      let combined = [...prev[id], ...newImages];
      let limit = 5;
      if (id === 'hero') limit = 1;
      else if (id === 'gallery') limit = 10;
      
      // If hero, and we uploaded a new one, we probably want to keep the newest one (replace), not keep the oldest one.
      // So if it's hero, let's take the LAST image uploaded.
      if (id === 'hero') {
          combined = newImages.length > 0 ? [newImages[newImages.length - 1]] : prev[id];
      } else {
          combined = combined.slice(0, limit);
      }
      
      return {
        ...prev,
        [id]: combined
      };
    });
  };

  const removeImage = (id: ProductId, index: number) => {
    setImagesState(prev => {
      const arr = [...prev[id]];
      URL.revokeObjectURL(arr[index]);
      arr.splice(index, 1);
      return { ...prev, [id]: arr };
    });
  };

  const reorderImages = (id: ProductId, startIndex: number, endIndex: number) => {
    setImagesState(prev => {
      const arr = [...prev[id]];
      const [removed] = arr.splice(startIndex, 1);
      arr.splice(endIndex, 0, removed);
      return { ...prev, [id]: arr };
    });
  };

  const replaceImage = (id: ProductId, index: number, newUrl: string) => {
    setImagesState(prev => {
      const arr = [...prev[id]];
      URL.revokeObjectURL(arr[index]);
      arr[index] = newUrl;
      return { ...prev, [id]: arr };
    });
  };

  return (
    <ImageContext.Provider value={{ images, setImages, removeImage, reorderImages, replaceImage }}>
      {children}
    </ImageContext.Provider>
  );
}

export function useImages() {
  const context = useContext(ImageContext);
  if (context === undefined) {
    throw new Error('useImages must be used within an ImageProvider');
  }
  return context;
}
