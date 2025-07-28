'use client';

import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  speed: number;
  targetX: number;
  targetY: number;
  originalX: number;
  originalY: number;
  character: string; // 文字を追加
  fontSize: number; // 個別のフォントサイズを追加
  directionX: number; // 移動方向X
  directionY: number; // 移動方向Y
  isDiagonal: boolean; // 対角移動フラグ
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
        speed: Math.random() * 0.5 + 0.1,
        targetX: x,
        targetY: y,
        originalX: x,
        originalY: y,
        character: characters[Math.floor(Math.random() * characters.length)], // ランダムな文字を選択
        fontSize: Math.random() * (fontSize * 0.8) + (fontSize * 0.4), // フォントサイズの40%〜120%の範囲でランダム
        isDiagonal: Math.random() < 0.5, // 50%の確率で対角移動
        directionX: (() => {
          if (Math.random() < 0.5) {
            // 横断移動の場合
            const crossDirection = Math.random() < 0.5 ? 1 : -1;
            return (Math.random() * 0.8 + 0.5) * crossDirection;
          } else {
            // ゆらゆら動きの場合
            return (Math.random() - 0.5) * 0.3;
          }
        })(),
        directionY: (() => {
          if (Math.random() < 0.5) {
            // 横断移動の場合
            const crossDirection = Math.random() < 0.5 ? 1 : -1;
            return (Math.random() * 0.8 + 0.5) * crossDirection;
          } else {
            // ゆらゆら動きの場合
            return (Math.random() - 0.5) * 0.3;
          }
        })(),
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

      // テキストの基本設定
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // 星を更新・描画
      stars.forEach((star) => {
        // 各文字の個別フォントサイズを設定
        ctx.font = `${star.fontSize}px ${fontFamily}`;
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

        // マウス追従効果（すべての文字に適用）
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

        // 画面の端から端への移動
        if (star.isDiagonal) {
          // 横断移動の場合（マウス追従効果付き）
          if (isMouseActive.current) {
            // マウスがアクティブな場合：マウスに集まる
            const dx = mouseRef.current.x - star.x;
            const dy = mouseRef.current.y - star.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) { // マウスから100px以内
              star.x += (mouseRef.current.x - star.x) * 0.1;
              star.y += (mouseRef.current.y - star.y) * 0.1;
            } else {
              // 通常の横断移動
              star.x += star.directionX;
              star.y += star.directionY;
            }
          } else {
            // 通常の横断移動
            star.x += star.directionX;
            star.y += star.directionY;
          }
          
          // 画面外に出た場合、ランダムな場所から再出現
          if (star.x < -50 || star.x > canvas.width + 50 || 
              star.y < -50 || star.y > canvas.height + 50) {
            
            // ランダムな場所から出現
            star.x = Math.random() * canvas.width;
            star.y = Math.random() * canvas.height;
            
            // 横断方向の移動を設定
            const crossDirection = Math.random() < 0.5 ? 1 : -1;
            star.directionX = (Math.random() * 0.8 + 0.5) * crossDirection;
            star.directionY = (Math.random() * 0.8 + 0.5) * crossDirection;
          }
        } else {
          // ゆらゆら動きの場合
          const time = Date.now() * 0.0003; // 非常にゆっくりとした動き
          const walkX = Math.sin(time + star.x * 0.01) * 0.5; // 左右のゆっくりとした揺れ
          const walkY = Math.cos(time * 0.7 + star.y * 0.01) * 0.3; // 上下のゆっくりとした揺れ
          
          // 星を目標位置に向かって移動（歩行動きを追加）
          star.x += (star.targetX - star.x) * 0.05 + walkX;
          star.y += (star.targetY - star.y) * 0.05 + walkY;
        }

        // 文字を描画（固定の不透明度）
        ctx.fillStyle = color;
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