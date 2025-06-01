import { StaticImageData } from "next/image";

import Watch01 from "@/app/assets/watch_01.webp";
import Watch02 from "@/app/assets/watch_02.webp";
import Watch03 from "@/app/assets/watch_03.webp";
import Watch04 from "@/app/assets/watch_04.webp";

export interface User {
  name: string;
  avatar: string;
}

export interface Review {
  id: string;
  productName: string;
  productImage: StaticImageData;
  rating: number;
  comment: string;
  date: string;
  user: User;
  likes: number;
  comments: number;
  productSlug: string;
}

export const reviews: Review[] = [
  {
    id: "1",
    productName: "Precision Chronograph X1",
    productSlug: "monday-greubler-generic",
    productImage: Watch01,
    rating: 5,
    comment:
      "This watch has incredible build quality and the chronograph function is precise. The automatic movement keeps perfect time, and the sapphire crystal is scratch-resistant even after months of daily wear.",
    date: "2023-12-15",
    user: {
      name: "Alex Johnson",
      avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=1",
    },
    likes: 24,
    comments: 5,
  },
  {
    id: "2",
    productName: "Classic Dress Watch",
    productSlug: "monday-greubler-generic",
    productImage: Watch03,
    rating: 4,
    comment:
      "Elegant timepiece with a stunning black dial. The leather strap is comfortable and the watch face is perfectly sized. My only complaint is that the crown can be a bit stiff when setting the time.",
    date: "2023-11-28",
    user: {
      name: "Samantha Lee",
      avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=2",
    },
    likes: 18,
    comments: 3,
  },
  {
    id: "3",
    productName: "Sport Chronometer",
    productSlug: "monday-greubler-generic",
    productImage: Watch02,
    rating: 3,
    comment:
      "Decent sports watch with good water resistance. The luminous markers are bright and visible in low light, but the bracelet feels a bit cheap and the clasp can be finicky to close properly.",
    date: "2023-12-02",
    user: {
      name: "Marcus Chen",
      avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=3",
    },
    likes: 9,
    comments: 2,
  },
];
