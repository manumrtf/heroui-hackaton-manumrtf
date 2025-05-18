"use client";
import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import NextImage from "next/image";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";

import Watch01 from "@/app/assets/watch_01.webp";
import Watch02 from "@/app/assets/watch_02.webp";
import Watch03 from "@/app/assets/watch_03.webp";
import Watch04 from "@/app/assets/watch_04.webp";
// Register ScrollTrigger with GSAP
gsap.registerPlugin(ScrollTrigger);

// Total number of frames
const FRAME_COUNT = 46;

export function ScrollVideo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const frames = useRef<HTMLImageElement[]>([]);
  const currentFrame = useRef(0);

  // Add state for active watch color
  const [activeColor, setActiveColor] = useState(0);

  // Define watch images for different colors - using your existing imports
  const watchColors = [
    { image: Watch01, color: "white" },
    { image: Watch02, color: "silver" },
    { image: Watch04, color: "blue" },
    { image: Watch03, color: "black" },
  ];

  // Preload all frames
  useEffect(() => {
    frames.current = [];
    let loadedCount = 0;

    // Function to load all frames
    const loadImages = () => {
      for (let i = 1; i <= FRAME_COUNT; i++) {
        const img = new Image();

        img.onload = () => {
          loadedCount++;
          setImagesLoaded(loadedCount);
          if (loadedCount === FRAME_COUNT) {
            setIsLoading(false);
          }
        };
        img.src = `/frames/${i}.png`;
        frames.current.push(img);
      }
    };

    loadImages();

    return () => {
      // Clean up by nullifying references
      frames.current.forEach((img) => {
        img.onload = null;
      });
      frames.current = [];
    };
  }, []);

  // Draw the initial frame once images are loaded
  useEffect(() => {
    if (!isLoading && canvasRef.current && frames.current.length > 0) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      // Set canvas dimensions to match first frame
      const firstImage = frames.current[0];

      canvas.width = firstImage.width;
      canvas.height = firstImage.height;

      // Draw the first frame
      context?.drawImage(firstImage, 0, 0);

      // Set the current frame to 0
      currentFrame.current = 0;
    }
  }, [isLoading]);

  // Set up the scroll-triggered animation
  useGSAP(() => {
    if (isLoading || !canvasRef.current || !sectionRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    if (!context) return;

    // Create a dummy object with a frameIndex property that GSAP can animate
    const frameAnimationObject = { frame: 0 };

    // Create the scrollTrigger animation
    const scrollTween = gsap.to(frameAnimationObject, {
      frame: FRAME_COUNT - 1,
      ease: "none",
      immediateRender: true,
      opacity: 1,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom center",
        scrub: true,
        pin: true,
        pinSpacing: true,
        onUpdate: (self) => {
          // Calculate the frame based directly on scroll progress
          // This is more precise than relying on the animated value
          const progress = self.progress; // 0 to 1
          const exactFrame = progress * (FRAME_COUNT - 1);
          const newFrame = Math.round(exactFrame);

          // Only update if the frame has changed
          if (newFrame !== currentFrame.current) {
            currentFrame.current = newFrame;

            // Draw the frame
            const frame = frames.current[newFrame];

            if (frame) {
              context.clearRect(0, 0, canvas.width, canvas.height);
              context.drawImage(frame, 0, 0);
            }
          }
        },
      },
    });

    // Clean up
    return () => {
      if (scrollTween) {
        scrollTween.kill();
      }
    };
  }, [isLoading]);

  useGSAP(() => {
    gsap.fromTo(
      "#canvas-container",
      { filter: "blur(40px) " },
      {
        filter: "blur(0px) ",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom center",
          scrub: true,
        },
      }
    );

    gsap.fromTo(
      "#canvas-container",
      { filter: "brightness(1)" },
      {
        filter: " brightness(0)",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "bottom top+=1000",
          end: "bottom center",
          scrub: true,
        },
      }
    );

    gsap.fromTo(
      "#content-container",
      { y: 800 },
      {
        y: 0,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom center",
          scrub: true,
        },
      }
    );
  });

  useGSAP(() => {
    gsap.fromTo(
      "#watch-01",
      { scale: 0.5 },
      {
        scale: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom center",
          scrub: true,
        },
      }
    );
  });

  // Simple animation for watch color change
  const changeWatchColor = (colorIndex: number) => {
    if (colorIndex === activeColor) return;
    setActiveColor(colorIndex);

    // Get the elements by ID
    const currentWatch = document.getElementById("current-watch");
    const nextWatch = document.getElementById("next-watch");

    if (currentWatch && nextWatch) {
      // Set the next watch image
      const nextImage = nextWatch as HTMLImageElement;

      nextImage.src = watchColors[colorIndex].image.src;

      // Animate current watch out
      gsap.to(currentWatch, {
        opacity: 0,
        y: -20,
        duration: 0.3,
        ease: "power2.out",
        onComplete: () => {
          // Swap images
          const currentImage = currentWatch as HTMLImageElement;

          currentImage.src = watchColors[colorIndex].image.src;
          currentImage.style.opacity = "1";
          currentImage.style.transform = "translateY(0)";

          // Reset next watch
          nextImage.style.opacity = "0";
          nextImage.style.transform = "translateY(20px)";
        },
      });

      // Animate next watch in
      gsap.fromTo(
        nextWatch,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.3,
          delay: 0.1,
          ease: "power2.out",
        }
      );
    }
  };

  return (
    <>
      <section
        ref={sectionRef}
        className="relative min-h-[100vh] w-full  items-center justify-center"
        id="scroll-video-section"
      >
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-10 text-white">
            <div className="text-center">
              <p className="text-xl mb-2">Loading Frames</p>
              <div className="w-64 h-2 bg-gray-700 rounded-full">
                <div
                  className="h-full bg-white rounded-full transition-all duration-300"
                  style={{ width: `${(imagesLoaded / FRAME_COUNT) * 100}%` }}
                />
              </div>
              <p className="mt-2">
                {imagesLoaded} of {FRAME_COUNT}
              </p>
            </div>
          </div>
        )}
        <div
          className="relative w-full h-full flex items-center justify-center"
          id="canvas-container"
        >
          <canvas
            ref={canvasRef}
            className="max-w-full max-h-full object-cover w-full min-h-screen"
            id="scroll-video-canvas"
          />
        </div>
        <div>
          <div className="absolute inset-0 px-8  " id="content-container">
            <div>
              <div className="flex flex-col-reverse lg:flex-row items-center justify-center">
                <div>
                  <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[7rem] text-white font-bebas leading-tight">
                    MONDAY GREUBLER GENERIC
                  </h1>
                  <p className="text-white text-xl max-w-xl leading-relaxed">
                    The Monday Greubler Generic: a horological masterpiece of
                    precision and elegance. Features sophisticated movement with
                    unmatched accuracy in a meticulously designed case. Boasts
                    impressive water resistance and proprietary
                    scratch-resistant crystal. It&apos;s not just a
                    watch—it&apos;s refined taste personified, balancing
                    tradition and innovation on your wrist.
                  </p>
                  <div className="flex items-center gap-2 mt-3">
                    <button
                      aria-label="White watch"
                      className={`size-10 rounded-full bg-white block border border-white cursor-pointer ${activeColor === 0 ? "ring-2 ring-primary ring-offset-2" : ""}`}
                      type="button"
                      onClick={() => changeWatchColor(0)}
                    />
                    <button
                      aria-label="Silver watch"
                      className={`size-10 rounded-full bg-zinc-200 block border border-white cursor-pointer ${activeColor === 1 ? "ring-2 ring-primary ring-offset-2" : ""}`}
                      type="button"
                      onClick={() => changeWatchColor(1)}
                    />
                    <button
                      aria-label="Blue watch"
                      className={`size-10 rounded-full bg-[#B1DBE3] block border border-white cursor-pointer ${activeColor === 2 ? "ring-2 ring-primary ring-offset-2" : ""}`}
                      type="button"
                      onClick={() => changeWatchColor(2)}
                    />
                    <button
                      aria-label="Black watch"
                      className={`size-10 rounded-full bg-[#030303] block border border-white cursor-pointer ${activeColor === 3 ? "ring-2 ring-primary ring-offset-2" : ""}`}
                      type="button"
                      onClick={() => changeWatchColor(3)}
                    />
                  </div>
                  <Button
                    as={Link}
                    className="mt-4"
                    color="primary"
                    href="/product/monday-greubler-generic"
                    size="lg"
                  >
                    Buy Now
                  </Button>
                </div>
                <div className="relative">
                  {/* Current visible watch */}
                  <NextImage
                    alt={`${watchColors[activeColor].color} watch`}
                    id="current-watch"
                    src={watchColors[activeColor].image}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
