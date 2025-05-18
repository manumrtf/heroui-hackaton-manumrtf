import React from "react";
import { Card, Progress, Avatar, Divider } from "@heroui/react";
import { Icon } from "@iconify/react";

export const WatchReviews: React.FC = () => {
  const reviewStats = [
    { stars: 5, count: 86, percentage: 67 },
    { stars: 4, count: 24, percentage: 19 },
    { stars: 3, count: 10, percentage: 8 },
    { stars: 2, count: 5, percentage: 4 },
    { stars: 1, count: 3, percentage: 2 },
  ];

  const reviews = [
    {
      id: 1,
      name: "Alex Thompson",
      avatar: "https://img.heroui.chat/image/avatar?w=150&h=150&u=user1",
      rating: 5,
      date: "March 15, 2024",
      title: "Exceptional quality and design",
      comment:
        "I've been wearing this watch for a month now and I'm extremely impressed with the quality. The movement is precise, and the design is elegant yet understated. Definitely worth the investment.",
      helpful: 24,
    },
    {
      id: 2,
      name: "Sarah Miller",
      avatar: "https://img.heroui.chat/image/avatar?w=150&h=150&u=user2",
      rating: 4,
      date: "March 10, 2024",
      title: "Beautiful timepiece with minor issues",
      comment:
        "The watch looks stunning and keeps time perfectly. My only complaint is that the leather band is a bit stiff initially and took about a week to break in. Otherwise, it's a fantastic watch that I've received many compliments on.",
      helpful: 12,
    },
    {
      id: 3,
      name: "Michael Chen",
      avatar: "https://img.heroui.chat/image/avatar?w=150&h=150&u=user3",
      rating: 5,
      date: "February 28, 2024",
      title: "Exceeded my expectations",
      comment:
        "This is my third luxury watch, and it stands up well against pieces twice its price. The attention to detail is impressive, from the brushed finish on the case to the subtle logo engraving on the crown. Very satisfied with this purchase.",
      helpful: 18,
    },
  ];

  return (
    <Card>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-semibold mb-2">Customer Reviews</h3>
              <div className="flex items-center gap-2 mb-4 justify-center md:justify-start">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Icon
                      key={star}
                      icon="lucide:star"
                      className={
                        star <= 4 ? "text-warning" : "text-default-300"
                      }
                      width={18}
                    />
                  ))}
                </div>
                <span className="text-sm">4.0 out of 5</span>
              </div>
              <p className="text-sm text-foreground-500 mb-6">
                Based on 128 reviews
              </p>

              <div className="space-y-2">
                {reviewStats.map((stat) => (
                  <div key={stat.stars} className="flex items-center gap-2">
                    <span className="text-sm w-8">{stat.stars} star</span>
                    <Progress
                      value={stat.percentage}
                      className="flex-1"
                      size="sm"
                      color={
                        stat.stars >= 4
                          ? "success"
                          : stat.stars >= 3
                            ? "warning"
                            : "danger"
                      }
                    />
                    <span className="text-sm text-foreground-500 w-8">
                      {stat.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold mb-4">Top Reviews</h3>
            <div className="space-y-6">
              {reviews.map((review) => (
                <div key={review.id}>
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-3">
                      <Avatar src={review.avatar} alt={review.name} size="sm" />
                      <div>
                        <p className="font-medium">{review.name}</p>
                        <p className="text-xs text-foreground-500">
                          {review.date}
                        </p>
                      </div>
                    </div>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Icon
                          key={star}
                          icon="lucide:star"
                          className={
                            star <= review.rating
                              ? "text-warning"
                              : "text-default-300"
                          }
                          width={14}
                        />
                      ))}
                    </div>
                  </div>
                  <h4 className="font-medium mb-1">{review.title}</h4>
                  <p className="text-sm text-foreground-600 mb-3">
                    {review.comment}
                  </p>
                  <div className="flex items-center gap-2">
                    <button className="flex items-center gap-1 text-xs text-foreground-500 hover:text-foreground transition-colors">
                      <Icon icon="lucide:thumbs-up" width={14} />
                      <span>Helpful ({review.helpful})</span>
                    </button>
                    <span className="text-foreground-300">|</span>
                    <button className="text-xs text-foreground-500 hover:text-foreground transition-colors">
                      Report
                    </button>
                  </div>
                  {review.id !== reviews.length && <Divider className="mt-6" />}
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <button className="text-primary hover:underline">
                Read all 128 reviews
              </button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
