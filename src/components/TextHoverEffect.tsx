'use client';

import { useRef, useEffect, useState } from 'react';

interface TextHoverEffectProps {
  children: string;
  hoverText: string;
  className?: string;
}

export default function TextHoverEffect({ children, hoverText, className = '' }: TextHoverEffectProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [direction, setDirection] = useState<'left' | 'right'>('right');

  const handleMouseEnter = (e: MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    // マウスが要素の左半分か右半分かを判定
    const centerX = rect.left + rect.width / 2;
    const isLeftSide = e.clientX < centerX;
    
    setDirection(isLeftSide ? 'left' : 'right');
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className={`relative overflow-hidden cursor-pointer ${className}`}
    >
      {/* 現在の文字 */}
      <span 
        className={`block transition-transform duration-300 ${
          isHovered 
            ? direction === 'left' 
              ? 'transform translate-x-full' 
              : 'transform -translate-x-full'
            : 'transform translate-x-0'
        }`}
      >
        {children}
      </span>
      
      {/* ホバー時の文字 */}
      <span 
        className={`absolute top-0 left-0 block transition-transform duration-300 ${
          isHovered 
            ? 'transform translate-x-0' 
            : direction === 'left' 
              ? 'transform -translate-x-full' 
              : 'transform translate-x-full'
        }`}
      >
        {hoverText}
      </span>
    </div>
  );
} 