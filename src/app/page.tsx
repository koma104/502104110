import StarBackground from '@/components/StarBackground';
import TextHoverEffect from '@/components/TextHoverEffect';

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
          {/* <CircleHoverEffect className="inline-block"> */}
            <h2 
              className="text-9xl font-extrabold tracking-wide opacity-20 flex"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              <span>{'{'}</span>
              <TextHoverEffect hoverText="5" className="inline-block">5</TextHoverEffect>
              <TextHoverEffect hoverText="0" className="inline-block">0</TextHoverEffect>
              <TextHoverEffect hoverText="2" className="inline-block">2</TextHoverEffect>
              <span>{'}'}</span>
            </h2>
          {/* </CircleHoverEffect> */}
        </div>
      </main>
    </div>
  );
}
