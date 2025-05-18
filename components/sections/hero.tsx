"use client";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

import Watch01 from "@/app/assets/watch_01.webp";
import Watch02 from "@/app/assets/watch_02.webp";
import Watch03 from "@/app/assets/watch_03.webp";
import Watch04 from "@/app/assets/watch_04.webp";
export function Hero() {
  const imagesRef = useRef<HTMLDivElement>(null);

  const watches = [Watch01, Watch02, Watch03, Watch04];

  useGSAP(() => {
    if (!imagesRef.current) return;

    const xPercentValue = -(100 * (watches.length - 1));

    gsap.timeline().to("#watches-images", {
      xPercent: xPercentValue,
      ease: "none",
      scrollTrigger: {
        trigger: "#watches-container",
        start: "top top",
        end: "bottom top",
        scrub: 1,
        pin: true,
      },
    });

    gsap.timeline().to("#hero-title", {
      opacity: 0,
      scale: 2,
      duration: 1,
      scrollTrigger: {
        trigger: "#main-section",
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });
  }, [watches.length]);

  return (
    <section
      className="relative min-h-[200vh] w-full overflow-hidden"
      id="main-section"
    >
      <div
        className="w-full overflow-hidden relative !-top-10"
        id="watches-container"
      >
        {/* Left edge gradient mask */}
        <div className="edge-fade-left" />

        {/* Right edge gradient mask */}
        <div className="edge-fade-right" />

        <div
          ref={imagesRef}
          className="flex items-center flex-nowrap relative max-w-7xl mx-auto "
          id="watches-images"
        >
          {watches.map((watch, index) => (
            <Image
              key={index}
              alt={`Watch ${index + 1}`}
              className="object-cover w-full flex-grow-0 flex-shrink-0 relative "
              src={watch}
            />
          ))}
        </div>
      </div>
      <h1
        className="text-6xl lg:text-7xl 2xl:text-9xl uppercase font-bold  absolute z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        id="hero-title"
      >
        The Future of Watches
      </h1>
    </section>
  );
}
