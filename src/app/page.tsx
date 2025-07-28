import StarBackground from '@/components/StarBackground';

export default function Home() {
  return (
    <div className="min-h-screen bg-custom-bg text-custom-text">
      {/* Star Background - デフォルトの学籍番号の数字を使用 */}
      <StarBackground />
      
      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-50 p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-lg font-extrabold tracking-wide" style={{ fontFamily: 'var(--font-inter)' }}>
            502104110
          </h1>
        </div>
      </header>

      {/* Main Content - Centered */}
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          {/* コンテンツが削除されました */}
        </div>
      </main>
    </div>
  );
}
