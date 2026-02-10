export function Skills() {
  const frontend = ["React", "Next.js", "Tailwind CSS"];
  const tools = ["HTML", "CSS", "JavaScript", "Sass", "Pug", "TypeScript", "Node.js", "GSAP", "Lottie", "p5.js", "Figma", "Photoshop", "Illustrator", "Affinity", "Google Maps APIs"];

  return (
    <section id="skills" className="scroll-mt-[80px] mb-16 space-y-6 md:mb-24">
      <div className="flex items-center gap-3">
        <h2 className="text-2xl font-bold">Technical Expertise</h2>
        <div className="h-px flex-1 bg-slate-200" />
      </div>
      <div className="flex flex-col gap-8">
        <div className="space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-accent-blue">
            Frontend Frameworks
          </h3>
          <div className="flex flex-wrap gap-2">
            {frontend.map((name) => (
              <span
                key={name}
                className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-sm font-semibold text-primary"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-accent-blue">
            Languages & Tools
          </h3>
          <div className="flex flex-wrap gap-2">
            {tools.map((name) => (
              <span
                key={name}
                className="rounded-full border border-slate-200 bg-slate-100 px-3 py-1.5 text-sm font-semibold text-slate-700"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
