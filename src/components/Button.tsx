import React from 'react';
import { BUY_URL } from '../config';

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
}

export function BuyNowButton({ children, className = '', href }: ButtonProps) {
  return (
    <a 
      href={href || BUY_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center font-semibold rounded-none px-8 py-4 gold-button hover:scale-[1.02] active:scale-[0.98] transition-transform ${className}`}
    >
      {children}
    </a>
  );
}
