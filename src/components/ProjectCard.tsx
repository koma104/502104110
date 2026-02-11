"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { useLenis } from "lenis/react";

export type Project = {
  title: string;
  date?: string;
  subtitle: string;
  description: string;
  image: string;
  demoUrl?: string;
  githubUrl?: string;
  highlights: string[];
  notes: string;
  tags: string[];
};

const PARALLAX_RATE_IMAGE = 0.1;

type ProjectCardProps = { project: Project };

export function ProjectCard({ project }: ProjectCardProps) {
  const cardRef = useRef<HTMLElement | null>(null);
  const [parallaxY, setParallaxY] = useState(0);

  useLenis(() => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const top = rect.top;
    setParallaxY(-top * PARALLAX_RATE_IMAGE);
  });

  return (
    <article
      ref={cardRef}
      className="flex flex-col gap-0 md:flex-row md:gap-10 md:items-stretch"
    >
      <div className="relative flex w-full shrink-0 items-center overflow-hidden rounded-lg bg-bg-offwhite md:w-[65%]">
        <div className="relative aspect-video w-full overflow-hidden rounded-lg md:aspect-[4/3]">
          <div
            className="absolute left-0 top-1/2 h-[120%] w-full -translate-y-1/2 will-change-transform"
            style={{ transform: `translate3d(0, calc(-50% + ${parallaxY}px), 0)` }}
          >
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 65vw"
              unoptimized
            />
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col justify-between gap-5 p-5 md:w-[35%] md:min-w-0 md:border-l md:border-gray-300 md:py-6">
        <div className="flex flex-col justify-between gap-5">
          <div className="space-y-4">
            <div>
              {project.date && (
                <p className="mb-1.5 text-[11px] text-gray-500 tracking-wide">
                  {project.date}
                </p>
              )}
              <span className="mb-2 inline-block rounded-full border border-gray-300 px-3 py-1 text-xs font-bold uppercase tracking-wider text-gray-600">
                {project.subtitle}
              </span>
              <h3 className="text-xl font-normal tracking-tight md:text-2xl">
                {project.title}
              </h3>
            </div>
            <p className="text-sm leading-relaxed text-slate-700">
              {project.description}
            </p>
            <div className="space-y-3">
              <div>
                <p className="mb-1 text-[10px] font-bold uppercase text-slate-500">
                  Scope
                </p>
                <p className="text-xs leading-relaxed text-slate-600">{project.description}</p>
              </div>
              <div>
                <p className="mb-1 text-[10px] font-bold uppercase text-slate-500">
                  Key efforts
                </p>
                <p className="text-xs leading-relaxed text-slate-600">{project.notes}</p>
              </div>
            </div>
            <div>
              <p className="mb-2 text-[10px] font-bold uppercase text-slate-500">
                Implementation
              </p>
              <ul className="space-y-1 text-xs text-slate-600 list-disc list-inside">
                {project.highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-auto flex flex-col gap-3 pt-4">
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-1.5 rounded-md bg-text-black px-4 py-2.5 text-xs font-bold uppercase tracking-wide text-white transition-colors hover:bg-accent-blue"
              >
                <span className="material-symbols-outlined text-sm">
                  open_in_new
                </span>
                Visit Site
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-1.5 rounded-md border border-text-black px-4 py-2.5 text-xs font-bold uppercase tracking-wide transition-colors accent-hover"
              >
                <span className="material-symbols-outlined text-sm">code</span>
                GitHub
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
