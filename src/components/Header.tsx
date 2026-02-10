import Link from 'next/link';

export function Header() {
  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2">
          <span
            className="material-symbols-outlined inline-block text-primary"
            style={{ fontSize: "2rem" }}
          >
            terminal
          </span>
        </Link>
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-6">
            <Link
              href="#skills"
              className="text-sm font-medium text-slate-700 transition-colors hover:text-primary"
            >
              Skills
            </Link>
            <Link
              href="#projects"
              className="text-sm font-medium text-slate-700 transition-colors hover:text-primary"
            >
              Projects
            </Link>
            <Link
              href="#contact"
              className="text-sm font-medium text-slate-700 transition-colors hover:text-primary"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
