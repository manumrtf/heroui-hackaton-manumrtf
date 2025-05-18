"use client";

import { Hero } from "@/components/sections/hero";
import { ScrollVideo } from "@/components/sections/scroll-video";
import { ProductReviewsGrid } from "@/components/sections/reviews";
import { LenisProvider } from "@/providers/lenis-provider";
export default function Home() {
  return (
    <LenisProvider>
      <div>
        <Hero />
        <ScrollVideo />
        <ProductReviewsGrid />
      </div>
    </LenisProvider>
  );
}
