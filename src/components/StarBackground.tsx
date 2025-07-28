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
  explosionX: number; // 爆発時の速度X
  explosionY: number; // 爆発時の速度Y
  isExploding: boolean; // 爆発中フラグ
  explosionTimer: number; // 爆発タイマー
  isVisible: boolean; // 表示/非表示フラグ
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
  color = '#1f1f1d',
}: StarBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const isMouseActive = useRef(false);
  const lastExplosionTime = useRef(0); // 最後に爆発が起きた時間

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
        fontSize: Math.random() * (fontSize * 0.8) + fontSize * 0.4, // フォントサイズの40%〜120%の範囲でランダム
        isDiagonal: Math.random() < 0.5, // 50%の確率で対角移動
        directionX: (() => {
          if (Math.random() < 0.5) {
            // 横断移動の場合 - 全方向の横断を実現
            const angle = Math.random() * Math.PI * 2; // 0〜2πのランダムな角度
            return Math.cos(angle) * (Math.random() * 0.8 + 0.5);
          } else {
            // ゆらゆら動きの場合
            return (Math.random() - 0.5) * 0.3;
          }
        })(),
        directionY: (() => {
          if (Math.random() < 0.5) {
            // 横断移動の場合 - 全方向の横断を実現
            const angle = Math.random() * Math.PI * 2; // 0〜2πのランダムな角度
            return Math.sin(angle) * (Math.random() * 0.8 + 0.5);
          } else {
            // ゆらゆら動きの場合
            return (Math.random() - 0.5) * 0.3;
          }
        })(),
        explosionX: 0,
        explosionY: 0,
        isExploding: false,
        explosionTimer: 0,
        isVisible: true,
      });
    }

    // マウスイベント
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      isMouseActive.current = true;
    };

    const handleMouseDown = (e: MouseEvent) => {
      console.log('マウスダウンイベントが発火しました！');
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      isMouseActive.current = true;
    };

    const handleMouseLeave = () => {
      isMouseActive.current = false;
    };

    const handleMouseUp = () => {
      console.log('マウスアップイベントが発火しました！');

      // マウスリリース時に爆発効果を発動
      const mouseX = mouseRef.current.x;
      const mouseY = mouseRef.current.y;

      console.log(`マウス位置: (${mouseX}, ${mouseY})`);

      let explosionCount = 0;
      let visibleCount = 0;
      stars.forEach((star) => {
        const distance = Math.sqrt((mouseX - star.x) ** 2 + (mouseY - star.y) ** 2);
        if (distance < 300) {
          // マウスから300px以内の要素を爆発
          star.isExploding = true;
          star.explosionTimer = 80; // 80フレーム間爆発

          // 爆発方向をランダムに設定（適度な爆発）
          const angle = Math.random() * Math.PI * 2;
          const speed = Math.random() * 20 + 10; // 10〜30の速度
          star.explosionX = Math.cos(angle) * speed;
          star.explosionY = Math.sin(angle) * speed;
          explosionCount++;

          // 爆発した要素の30%を非表示にする（数調整）
          if (Math.random() < 0.3) {
            star.isVisible = false;
          }
        }
        if (star.isVisible) visibleCount++;
      });

      console.log(`爆発した要素数: ${explosionCount}`);
      lastExplosionTime.current = Date.now(); // 爆発時間を記録
      isMouseActive.current = false;
    };

    // タッチイベント（モバイル対応）
    const handleTouchStart = (e: TouchEvent) => {
      console.log('タッチスタートイベントが発火しました！');
      e.preventDefault();
      const rect = canvas.getBoundingClientRect();
      const touch = e.touches[0];
      mouseRef.current.x = touch.clientX - rect.left;
      mouseRef.current.y = touch.clientY - rect.top;
      isMouseActive.current = true;
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const rect = canvas.getBoundingClientRect();
      const touch = e.touches[0];
      mouseRef.current.x = touch.clientX - rect.left;
      mouseRef.current.y = touch.clientY - rect.top;
      isMouseActive.current = true;
    };

    const handleTouchEnd = () => {
      console.log('タッチエンドイベントが発火しました！');

      // タッチリリース時に爆発効果を発動
      const mouseX = mouseRef.current.x;
      const mouseY = mouseRef.current.y;

      console.log(`タッチ位置: (${mouseX}, ${mouseY})`);

      let explosionCount = 0;
      let visibleCount = 0;
      stars.forEach((star) => {
        const distance = Math.sqrt((mouseX - star.x) ** 2 + (mouseY - star.y) ** 2);
        if (distance < 300) {
          // タッチから300px以内の要素を爆発
          star.isExploding = true;
          star.explosionTimer = 80; // 80フレーム間爆発

          // 爆発方向をランダムに設定（適度な爆発）
          const angle = Math.random() * Math.PI * 2;
          const speed = Math.random() * 20 + 10; // 10〜30の速度
          star.explosionX = Math.cos(angle) * speed;
          star.explosionY = Math.sin(angle) * speed;
          explosionCount++;

          // 爆発した要素の30%を非表示にする（数調整）
          if (Math.random() < 0.3) {
            star.isVisible = false;
          }
        }
        if (star.isVisible) visibleCount++;
      });

      console.log(`タッチで爆発した要素数: ${explosionCount}`);
      lastExplosionTime.current = Date.now(); // 爆発時間を記録
      isMouseActive.current = false;
    };

    // イベントリスナーを追加
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('touchstart', handleTouchStart, { passive: false });
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
    canvas.addEventListener('touchend', handleTouchEnd);

    // アニメーション関数
    const animate = () => {
      // Canvasをクリア
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 時間経過による要素の再表示処理
      const currentTime = Date.now();
      const timeSinceExplosion = currentTime - lastExplosionTime.current;

      // 爆発から3秒経過したら、非表示の要素を徐々に再表示（大幅に抑制）
      if (timeSinceExplosion > 3000) {
        const recoveryProgress = Math.min((timeSinceExplosion - 3000) / 10000, 1); // 10秒かけて10%復旧
        const hiddenStars = stars.filter((star) => !star.isVisible);
        const recoveryCount = Math.floor(hiddenStars.length * recoveryProgress * 0.1); // 10%までしか復旧しない

        // 非表示の要素から順番に再表示
        for (let i = 0; i < recoveryCount && i < hiddenStars.length; i++) {
          if (!hiddenStars[i].isVisible) {
            hiddenStars[i].isVisible = true;
            // 再表示時に新しい位置と方向を設定
            hiddenStars[i].x = Math.random() * canvas.width;
            hiddenStars[i].y = Math.random() * canvas.height;
            hiddenStars[i].originalX = hiddenStars[i].x;
            hiddenStars[i].originalY = hiddenStars[i].y;
            hiddenStars[i].isDiagonal = Math.random() < 0.5;
            const angle = Math.random() * Math.PI * 2;
            hiddenStars[i].directionX = Math.cos(angle) * (Math.random() * 0.8 + 0.5);
            hiddenStars[i].directionY = Math.sin(angle) * (Math.random() * 0.8 + 0.5);
          }
        }
      }

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

          if (distance < 100) {
            // マウスから100px以内
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

          if (distance < 100) {
            // マウスから100px以内
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

        // 爆発中の処理
        if (star.isExploding) {
          star.explosionTimer--;

          // 爆発速度を徐々に減衰（適度な減衰）
          star.explosionX *= 0.95;
          star.explosionY *= 0.95;

          // 爆発移動
          star.x += star.explosionX;
          star.y += star.explosionY;

          // 爆発タイマーが終了したら新しい方向で移動を続ける
          if (
            star.explosionTimer <= 0 ||
            (Math.abs(star.explosionX) < 0.1 && Math.abs(star.explosionY) < 0.1)
          ) {
            star.isExploding = false;

            // 爆発速度を徐々に通常移動速度に移行（急激な変化を防ぐ）
            const currentSpeed = Math.sqrt(
              star.explosionX * star.explosionX + star.explosionY * star.explosionY
            );
            const targetSpeed = Math.random() * 0.8 + 0.5;
            const speedRatio = Math.min(currentSpeed / targetSpeed, 1);

            // 現在の爆発方向を基に、徐々に通常移動方向に移行
            const currentAngle = Math.atan2(star.explosionY, star.explosionX);
            const targetAngle = Math.random() * Math.PI * 2;
            const interpolatedAngle = currentAngle + (targetAngle - currentAngle) * speedRatio;

            star.directionX = Math.cos(interpolatedAngle) * targetSpeed;
            star.directionY = Math.sin(interpolatedAngle) * targetSpeed;

            // 爆発速度を徐々にゼロに
            star.explosionX *= 0.8;
            star.explosionY *= 0.8;

            // 元の位置を現在位置に更新（戻ってこないようにする）
            star.originalX = star.x;
            star.originalY = star.y;

            // 爆発後は元の比率で横断移動とゆらゆら動きを設定
            star.isDiagonal = Math.random() < 0.5; // 50%の確率で横断移動
          }
        } else {
          // 通常の移動処理（爆発後の残存速度も考慮）
          // 画面の端から端への移動
          if (star.isDiagonal) {
            // 横断移動の場合（マウス追従効果付き）
            if (isMouseActive.current) {
              // マウスがアクティブな場合：マウスに集まる
              const dx = mouseRef.current.x - star.x;
              const dy = mouseRef.current.y - star.y;
              const distance = Math.sqrt(dx * dx + dy * dy);

              if (distance < 100) {
                // マウスから100px以内
                star.x += (mouseRef.current.x - star.x) * 0.1;
                star.y += (mouseRef.current.y - star.y) * 0.1;
              } else {
                // 通常の横断移動（爆発後の残存速度を徐々に減衰）
                star.x += star.directionX + star.explosionX * 0.1;
                star.y += star.directionY + star.explosionY * 0.1;
                star.explosionX *= 0.9;
                star.explosionY *= 0.9;
              }
            } else {
              // 通常の横断移動（爆発後の残存速度を徐々に減衰）
              star.x += star.directionX + star.explosionX * 0.1;
              star.y += star.directionY + star.explosionY * 0.1;
              star.explosionX *= 0.9;
              star.explosionY *= 0.9;
            }

            // 画面外に出た場合、ランダムな場所から再出現
            if (
              star.x < -50 ||
              star.x > canvas.width + 50 ||
              star.y < -50 ||
              star.y > canvas.height + 50
            ) {
              // ランダムな場所から出現
              star.x = Math.random() * canvas.width;
              star.y = Math.random() * canvas.height;

              // 全方向の横断移動を設定
              const angle = Math.random() * Math.PI * 2; // 0〜2πのランダムな角度
              star.directionX = Math.cos(angle) * (Math.random() * 0.8 + 0.5);
              star.directionY = Math.sin(angle) * (Math.random() * 0.8 + 0.5);
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
        }

        // 文字を描画（表示フラグをチェック）
        if (star.isVisible) {
          ctx.fillStyle = color;
          ctx.fillText(star.character, star.x, star.y);
        }
      });

      requestAnimationFrame(animate);
    };

    animate();

    // クリーンアップ
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      canvas.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('touchstart', handleTouchStart);
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
