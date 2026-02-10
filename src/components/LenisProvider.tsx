"use client";

import { ReactLenis } from "lenis/react";
import "lenis/dist/lenis.css";

type LenisProviderProps = { children: React.ReactNode };

export function LenisProvider({ children }: LenisProviderProps) {
  return (
    <ReactLenis
      root
      options={{
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 2,
        anchors: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
