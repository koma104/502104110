export function Hero() {
  return (
    <header className="mb-32" id="hero">
      <h1 className="mb-8 text-5xl font-black leading-none tracking-tighter md:text-6xl">
        Developer <span className="font-light">Portfolio —</span>
        <br />
        <span className="text-primary">Frontend <span className="font-light">Engineer</span></span>
      </h1>
      <div className="max-w-2xl">
        <p className="text-lg font-medium leading-relaxed md:text-xl">
          React / Next.js / TypeScript / Tailwind / GSAP
          を中心に、フロントエンドの個人制作を行っています。
          <br />
          新しい技術やインタラクション表現を取り入れながら、使いやすさと表現力の両立を意識した実装を心がけています。
        </p>
      </div>
    </header>
  );
}
