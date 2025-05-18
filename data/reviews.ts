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
    productName: "Wireless Noise-Cancelling Headphones",
    productSlug: "monday-greubler-generic",
    productImage: Watch01,
    rating: 5,
    comment:
      "These headphones have incredible sound quality and the noise cancellation is top-notch. Battery life exceeds expectations, lasting well over 30 hours on a single charge.",
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
    productName: "Ultra-Slim Laptop",
    productSlug: "monday-greubler-generic",
    productImage: Watch03,
    rating: 4,
    comment:
      "Great performance in a lightweight package. The display is stunning and battery life is decent. My only complaint is that it runs a bit hot under heavy load.",
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
    productName: "Smart Fitness Watch",
    productSlug: "monday-greubler-generic",
    productImage: Watch02,
    rating: 3,
    comment:
      "Decent fitness tracker with good battery life. The sleep tracking is accurate, but the heart rate monitor can be inconsistent during high-intensity workouts.",
    date: "2023-12-02",
    user: {
      name: "Marcus Chen",
      avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=3",
    },
    likes: 9,
    comments: 2,
  },
  {
    id: "4",
    productName: "Professional Camera Kit",
    productSlug: "monday-greubler-generic",
    productImage: Watch04,
    rating: 5,
    comment:
      "Exceptional image quality and the included lenses are versatile for different shooting scenarios. The autofocus is lightning fast and accurate even in low light.",
    date: "2023-11-15",
    user: {
      name: "Priya Sharma",
      avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=4",
    },
    likes: 32,
    comments: 7,
  },
  {
    id: "5",
    productName: "Smart Home Speaker",
    productSlug: "monday-greubler-generic",
    productImage: Watch01,
    rating: 4,
    comment:
      "Sound quality is impressive for the size. Voice recognition works well even from across the room. Integration with other smart home devices was seamless.",
    date: "2023-12-10",
    user: {
      name: "David Wilson",
      avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=5",
    },
    likes: 15,
    comments: 4,
  },
  {
    id: "6",
    productName: "Ergonomic Office Chair",
    productSlug: "monday-greubler-generic",
    productImage: Watch02,
    rating: 5,
    comment:
      "Best investment for my home office. The lumbar support is adjustable and perfect, and I no longer have back pain after long work sessions. Assembly was straightforward.",
    date: "2023-11-20",
    user: {
      name: "Emma Rodriguez",
      avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=6",
    },
    likes: 27,
    comments: 6,
  },
  {
    id: "7",
    productName: "Smartphone Pro Max",
    productSlug: "monday-greubler-generic",
    productImage: Watch04,
    rating: 2,
    comment:
      "The camera is excellent, but battery life is disappointing. I have to charge it twice a day with normal use. The facial recognition is also inconsistent in low light.",
    date: "2023-12-05",
    user: {
      name: "James Taylor",
      avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=7",
    },
    likes: 8,
    comments: 12,
  },
  {
    id: "8",
    productName: "Coffee Maker Deluxe",
    productSlug: "monday-greubler-generic",
    productImage: Watch03,
    rating: 5,
    comment:
      "Makes the perfect cup of coffee every time. The programmable features let me wake up to fresh coffee, and the thermal carafe keeps it hot for hours without burning.",
    date: "2023-11-25",
    user: {
      name: "Olivia Brown",
      avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=8",
    },
    likes: 21,
    comments: 3,
  },
  {
    id: "9",
    productName: "Wireless Gaming Mouse",
    productSlug: "monday-greubler-generic",
    productImage: Watch01,
    rating: 4,
    comment:
      "Responsive and comfortable for long gaming sessions. The battery lasts about a week of heavy use, and the customizable buttons are a nice touch.",
    date: "2023-12-08",
    user: {
      name: "Noah Kim",
      avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=9",
    },
    likes: 14,
    comments: 2,
  },
];
