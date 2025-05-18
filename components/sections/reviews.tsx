"use client";
import React from "react";
import { Badge } from "@heroui/react";
import { Icon } from "@iconify/react";
import NumberFlow from "@number-flow/react";

import { reviews } from "@/data/reviews";
import { ReviewCard } from "@/components/review-card";

export const ProductReviewsGrid: React.FC = () => {
  const [filter, setFilter] = React.useState<number | null>(null);

  const filteredReviews = React.useMemo(() => {
    if (filter === null) return reviews;

    return reviews.filter((review) => review.rating === filter);
  }, [filter]);

  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      //increment randomly from 1 to 6
      setCount((prevCount) => {
        const newCount = prevCount + Math.floor(Math.random() * 6);

        localStorage.setItem("count", newCount.toString());

        return newCount;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container mx-auto px-4 py-12 mt-[33rem] xl:mt-[20rem]">
      <div>
        <h2 className="text-center text-8xl font-bold text-balance font-bebas">
          Try it, love it.
        </h2>
        <div className="space-x-3 font-bebas">
          <NumberFlow
            className="text-center text-6xl font-bold text-balance text-warning"
            value={count}
          />
          <span className="text-6xl text-warning font-bold  ">
            sold watches
          </span>
        </div>
      </div>

      {filteredReviews.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-foreground-400">
          <Icon className="text-4xl mb-3" icon="lucide:search-x" />
          <p>No reviews found with this rating</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      )}
    </div>
  );
};
