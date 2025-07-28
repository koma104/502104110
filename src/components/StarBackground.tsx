'use client';

import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
  targetX: number;
  targetY: number;
  originalX: number;
  originalY: number;
  character: string; // 文字を追加
}

interface StarBackgroundProps {
  characters?: string[]; // 使用する文字の配列
  fontSize?: number; // フォントサイズ
  fontFamily?: string; // フォントファミリー
  color?: string; // 文字色
}

export default function StarBackground({ 
  characters = ['P', 'E', 'O', 'P', 'L', 'E'],
  fontSize = 16,
  fontFamily = 'Arial, sans-serif',
  color = '#1f1f1d'
}: StarBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const isMouseActive = useRef(false);

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
    const starCount = 150; // 星の数を少し減らす

    // 星を初期化
    for (let i = 0; i < starCount; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      stars.push({
        x,
        y,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.8 + 0.2,
        speed: Math.random() * 0.5 + 0.1,
        targetX: x,
        targetY: y,
        originalX: x,
        originalY: y,
        character: characters[Math.floor(Math.random() * characters.length)], // ランダムな文字を選択
      });
    }

    // マウスイベント
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      isMouseActive.current = true;
    };

    const handleMouseLeave = () => {
      isMouseActive.current = false;
    };

    // タッチイベント（モバイル対応）
    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const rect = canvas.getBoundingClientRect();
      const touch = e.touches[0];
      mouseRef.current.x = touch.clientX - rect.left;
      mouseRef.current.y = touch.clientY - rect.top;
      isMouseActive.current = true;
    };

    const handleTouchEnd = () => {
      isMouseActive.current = false;
    };

    // イベントリスナーを追加
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
    canvas.addEventListener('touchend', handleTouchEnd);

    // アニメーション関数
    const animate = () => {
      // Canvasをクリア
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // フォントを設定
      ctx.font = `${fontSize}px ${fontFamily}`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // 星を更新・描画
      stars.forEach((star) => {
        if (isMouseActive.current) {
          // マウスがアクティブな場合：マウスに集まる
          const dx = mouseRef.current.x - star.x;
          const dy = mouseRef.current.y - star.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) { // マウスから100px以内
            star.targetX = mouseRef.current.x + (Math.random() - 0.5) * 50;
            star.targetY = mouseRef.current.y + (Math.random() - 0.5) * 50;
          } else {
            star.targetX = star.originalX;
            star.targetY = star.originalY;
          }
        } else {
          // マウスが非アクティブな場合：元の位置に戻る
          star.targetX = star.originalX;
          star.targetY = star.originalY;
        }

        // 星を目標位置に向かって移動
        star.x += (star.targetX - star.x) * 0.05;
        star.y += (star.targetY - star.y) * 0.05;

        // 文字を描画
        ctx.fillStyle = `${color}${Math.floor(star.opacity * 255).toString(16).padStart(2, '0')}`;
        ctx.fillText(star.character, star.x, star.y);
      });

      requestAnimationFrame(animate);
    };

    animate();

    // クリーンアップ
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('touchend', handleTouchEnd);
    };
  }, [characters, fontSize, fontFamily, color]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-auto z-0"
      style={{ background: 'transparent' }}
    />
  );
} 