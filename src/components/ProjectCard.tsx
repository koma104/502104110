"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export type Project = {
  title: string;
  date?: string;
  subtitle: string;
  description: string;
  role?: string;
  image: string;
  demoUrl?: string;
  githubUrl?: string;
  skills: string[];
  focus: string;
  tags: string[];
};

type ProjectCardProps = { project: Project };

export function ProjectCard({ project }: ProjectCardProps) {
  const cardRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { rootMargin: "0px 0px -40px 0px", threshold: 0 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <article
      ref={cardRef}
      className="flex flex-col gap-0 md:flex-row md:gap-10 md:items-stretch transition-all duration-700 ease-out opacity-0 translate-y-6 data-[visible]:opacity-100 data-[visible]:translate-y-0"
      data-visible={isVisible || undefined}
    >
      <div className="relative flex w-full shrink-0 items-center overflow-hidden rounded-lg bg-bg-offwhite md:w-[65%]">
        {project.demoUrl ? (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full"
            aria-label={`${project.title}のサイトを開く`}
          >
            <div className="relative aspect-video w-full overflow-hidden rounded-lg md:aspect-[4/3]">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 65vw"
                unoptimized
              />
            </div>
          </a>
        ) : (
          <div className="relative aspect-video w-full overflow-hidden rounded-lg md:aspect-[4/3]">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 65vw"
              unoptimized
            />
          </div>
        )}
      </div>
      <div className="flex w-full flex-col justify-between px-2.5 py-5 md:w-[35%] md:min-w-0 md:border-l md:border-gray-300 md:px-5 md:py-0">
        <div className="flex flex-col gap-5">
          <div className="flex min-h-0 flex-1 flex-col gap-4">
            <div>
              {project.date && (
                <p className="mb-1.5 text-[11px] text-gray-500 tracking-wide">
                  {project.date}
                </p>
              )}
              <h3 className="text-xl font-normal tracking-tight md:text-2xl">
                {project.title}
              </h3>
            </div>
            <p className="text-sm leading-relaxed text-slate-700">
              {project.description}
            </p>
            <div className="flex flex-col gap-3">
              <div>
                <p className="mb-1 text-[10px] font-bold uppercase text-slate-500">
                  Type
                </p>
                <p className="text-xs leading-relaxed text-slate-600">{project.subtitle}</p>
              </div>
              <div>
                <p className="mb-1 text-[10px] font-bold uppercase text-slate-500">
                  Role
                </p>
                <p className="text-xs leading-relaxed text-slate-600">{project.role ?? project.description}</p>
              </div>
              <div>
                <p className="mb-1 text-[10px] font-bold uppercase text-slate-500">
                  Focus
                </p>
                <p className="text-xs leading-relaxed text-slate-600">{project.focus}</p>
              </div>
            </div>
            <div>
              <p className="mb-2 text-[10px] font-bold uppercase text-slate-500">
                Skills
              </p>
              <div className="flex flex-wrap gap-2">
                {project.skills.map((item) => (
                  <span
                    key={item}
                    className="inline-block rounded-full border border-gray-300 px-2.5 py-0.5 text-[10px] font-medium tracking-wider text-slate-500"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-1.5 rounded-md bg-text-black px-4 py-2.5 text-xs font-bold uppercase tracking-wide text-white transition-colors hover:bg-accent-blue"
              >
                <span className="material-symbols-outlined icon-visit-site">
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
