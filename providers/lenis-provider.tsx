"use client";

import Lenis from "lenis";
import { LenisRef } from "lenis/react";
import ReactLenis from "lenis/react";
import { useEffect } from "react";
import { useRef } from "react";
import gsap from "gsap";

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    function update(time: number) {
      lenisRef.current?.raf(time * 1000);
    }

    gsap.ticker.add(update);

    return () => gsap.ticker.remove(update);
  }, []);

  return (
    <ReactLenis ref={lenisRef as React.RefObject<LenisRef>} root>
      {children}
    </ReactLenis>
  );
}
