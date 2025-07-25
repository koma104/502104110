'use client';

import { useRef, useEffect } from 'react';

interface CircleHoverEffectProps {
  children: React.ReactNode;
  className?: string;
}

export default function CircleHoverEffect({ children, className = '' }: CircleHoverEffectProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const circle = circleRef.current;
    
    if (!container || !circle) return;

    const handleMouseEnter = (e: MouseEvent) => {
      // マウス位置を画面全体の座標で取得
      const x = e.clientX;
      const y = e.clientY;
      
      // 円の位置をマウス位置に設定（fixed positioning）
      circle.style.left = x + 'px';
      circle.style.top = y + 'px';
      
      // 円を表示して画面全体を覆うサイズに拡大
      const size = Math.max(window.innerWidth, window.innerHeight) * 2;
      circle.style.width = size + 'px';
      circle.style.height = size + 'px';
      circle.style.opacity = '1';
      circle.style.transform = 'translate(-50%, -50%)';
    };

    const handleMouseLeave = () => {
      // 円を非表示
      circle.style.opacity = '0';
      circle.style.width = '0px';
      circle.style.height = '0px';
    };

    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <>
      {/* 円形背景 - 画面全体に固定 */}
      <div
        ref={circleRef}
        className="fixed bg-black rounded-full opacity-0 transition-all duration-500 ease-out pointer-events-none z-10"
        style={{
          width: '0px',
          height: '0px',
          transform: 'translate(-50%, -50%)',
        }}
      />
      
      {/* コンテンツ */}
      <div 
        ref={containerRef}
        className={`relative cursor-pointer ${className}`}
      >
        {children}
      </div>
    </>
  );
} 