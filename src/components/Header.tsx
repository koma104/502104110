'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { useLenis } from 'lenis/react';

const HEADER_OFFSET = 80; // ヘッダー 64px + 余白

export function Header() {
  const lenisRef = useRef<ReturnType<typeof useLenis>>(undefined);
  useLenis((lenis) => {
    lenisRef.current = lenis;
  });

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    e.preventDefault();
    const target = document.querySelector(hash);
    if (!(target instanceof HTMLElement)) return;
    const targetTop = target.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
    const lenis = lenisRef.current;
    if (lenis) {
      lenis.scrollTo(targetTop, { immediate: false });
    } else {
      window.scrollTo({ top: targetTop, behavior: 'smooth' });
    }
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="logo-icon-wrap inline-block">
            <span className="material-symbols-outlined" aria-hidden="true">
              terminal
            </span>
          </span>
        </Link>
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-6">
            <a
              href="#skills"
              onClick={(e) => handleAnchorClick(e, '#skills')}
              className="text-sm font-medium text-slate-700 transition-colors hover:text-primary"
            >
              Skills
            </a>
            <a
              href="#projects"
              onClick={(e) => handleAnchorClick(e, '#projects')}
              className="text-sm font-medium text-slate-700 transition-colors hover:text-primary"
            >
              Projects
            </a>
            <a
              href="#contact"
              onClick={(e) => handleAnchorClick(e, '#contact')}
              className="text-sm font-medium text-slate-700 transition-colors hover:text-primary"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
