'use client';

import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
}

export default function StarBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Canvasサイズを画面サイズに設定
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // 星の配列を作成
    const stars: Star[] = [];
    const starCount = 200; // 星の数

    // 星を初期化
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5, // 0.5px ~ 2.5px
        opacity: Math.random() * 0.8 + 0.2, // 0.2 ~ 1.0
        speed: Math.random() * 0.5 + 0.1, // 0.1 ~ 0.6
      });
    }

    // アニメーション関数
    const animate = () => {
      // Canvasをクリア
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 星を描画
      stars.forEach((star) => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(31, 31, 29, ${star.opacity})`; // 背景色に合わせたダークグレー
        ctx.fill();

        // 星を少し下に移動（スクロール効果）
        star.y += star.speed;
        if (star.y > canvas.height) {
          star.y = -5;
          star.x = Math.random() * canvas.width;
        }
      });

      requestAnimationFrame(animate);
    };

    animate();

    // クリーンアップ
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      style={{ background: 'transparent' }}
    />
  );
} 