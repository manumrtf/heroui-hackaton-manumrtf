import React from "react";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Avatar,
  Badge,
  Button,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import Image from "next/image";
import Watch01 from "@/app/assets/watch_01.webp";

import { Review } from "@/data/reviews";

interface ReviewCardProps {
  review: Review;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  return (
    <Card isFooterBlurred className="w-full h-[450px] overflow-hidden">
      <CardHeader className="absolute z-10 top-1 flex-col items-start">
        <Badge
          className="px-2"
          color={getBadgeColor(review.rating)}
          variant="solid"
        >
          <div className="flex items-center gap-1">
            {review.rating}
            <Icon className="text-xs" icon="lucide:star" />
          </div>
        </Badge>
      </CardHeader>

      <Image
        alt={review.productName}
        className="z-0 w-full h-full object-cover scale-125"
        src={review.productImage}
      />

      <CardFooter className="absolute bg-black/30 backdrop-blur-md bottom-0 border-t-1 border-zinc-100/50 z-10 flex-col items-start p-4">
        <div className="flex justify-between w-full items-center mb-2">
          <h3 className="text-white font-medium text-lg">
            {review.productName}
          </h3>
          <p className="text-white/70 text-xs">{formatDate(review.date)}</p>
        </div>

        <p className="text-white/90 text-sm line-clamp-2 mb-2">
          {review.comment}
        </p>

        <div className="flex justify-between w-full items-center mt-1">
          <div className="flex items-center gap-2">
            <Avatar
              name={review.user.name}
              size="sm"
              src={review.user.avatar}
            />
            <span className="text-sm font-medium text-white">
              {review.user.name}
            </span>
          </div>
          <div className="flex items-center gap-2 text-white/90">
            <button className="flex items-center gap-1 text-xs hover:text-white transition-colors">
              <Icon className="text-sm" icon="lucide:thumbs-up" />
              {review.likes}
            </button>
            <button className="flex items-center gap-1 text-xs hover:text-white transition-colors">
              <Icon className="text-sm" icon="lucide:message-circle" />
              {review.comments}
            </button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

function getBadgeColor(
  rating: number
): "success" | "warning" | "danger" | "primary" {
  if (rating >= 4) return "success";
  if (rating >= 3) return "primary";
  if (rating >= 2) return "warning";

  return "danger";
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
}
