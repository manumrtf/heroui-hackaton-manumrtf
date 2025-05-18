import { StaticImageData } from "next/image";

import Watch01 from "@/app/assets/watch_01.webp";
import Watch02 from "@/app/assets/watch_02.webp";
import Watch03 from "@/app/assets/watch_03.webp";
import Watch04 from "@/app/assets/watch_04.webp";

export interface Product {
  id: string;
  polarId: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  colors: { name: string; value: string }[];
  sizes: string[];
  images: { url: StaticImageData; alt: string; color: string }[];
  features: string[];
  specifications: Record<string, string>;
  reviews: {
    name: string;
    date: string;
    avatar: string;
    rating: number;
    title: string;
    content: string;
  }[];
}
export const products = [
  {
    id: "monday-greubler-generic",
    polarId: "7232454b-34ac-4a21-b9af-0410a40caea2",
    slug: "monday-greubler-generic",
    name: "Monday Greubler Generic",
    description: `The Precision Chronograph X1 represents the pinnacle of watchmaking craftsmanship. Each timepiece is meticulously assembled by master watchmakers using only the finest materials. The Swiss-made automatic movement ensures precise timekeeping, while the sapphire crystal face provides exceptional clarity and scratch resistance. The premium leather band completes this sophisticated and durable timepiece, making it the perfect companion for any occasion.`,
    price: 100,
    colors: [
      {
        name: "white",
        value: "#FFFFFF",
      },
      {
        name: "diamond",
        value: "#e4e4e7",
      },
      {
        name: "black",
        value: "#000000",
      },
      {
        name: "zafiro",
        value: "#B1DBE3",
      },
    ],
    sizes: ["36mm", "40mm", "44mm"],
    images: [
      {
        url: Watch01,
        alt: "Monday Greubler Generic",
        color: "white",
      },
      {
        url: Watch02,
        alt: "Monday Greubler Generic",
        color: "diamond",
      },
      {
        url: Watch03,
        alt: "Monday Greubler Generic",
        color: "black",
      },
      {
        url: Watch04,
        alt: "Monday Greubler Generic",
        color: "zafiro",
      },
    ],
    features: [
      "Swiss-made automatic movement",
      "Sapphire crystal with anti-reflective coating",
      "316L stainless steel case",
      "100m water resistance",
      "Chronograph functionality",
      "Date display",
      "Luminous hands and markers",
    ],
    specifications: {
      "Case Diameter": "36mm",
      "Case Material": "316L Stainless Steel",
      Movement: "Swiss Automatic",
      "Water Resistance": "100m",
      Crystal: "Sapphire",
      "Band Material": "Genuine Leather",
      Warranty: "2 Years",
    },
    reviews: [
      {
        name: "Alex Thompson",
        date: "March 15, 2024",
        avatar: "https://img.heroui.chat/image/avatar?w=150&h=150&u=user1",
        rating: 5,
        title: "Exceptional quality and design",
        content:
          "I've been wearing this watch for a month now and I'm extremely impressed with the quality. The movement is precise, and the design is elegant yet understated. Definitely worth the investment.",
      },
      {
        name: "Sarah Miller",
        date: "March 10, 2024",
        avatar: "https://img.heroui.chat/image/avatar?w=150&h=150&u=user2",
        rating: 4,
        title: "Beautiful timepiece with minor issues",
        content:
          "The watch looks stunning and keeps time perfectly. My only complaint is that the leather band is a bit stiff initially and took about a week to break in. Otherwise, it's a fantastic watch that I've received many compliments on.",
      },
    ],
  },
];
