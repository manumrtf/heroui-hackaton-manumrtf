"use client";
import React from "react";
import {
  Button,
  Card,
  Chip,
  Divider,
  Tabs,
  Tab,
  Badge,
  Avatar,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import NextImage from "next/image";

import { WatchColorSelector } from "./watch-color-selector";
import { WatchSizeSelector } from "./watch-size-selector";

import { authClient } from "@/lib/auth-client";
import { Product } from "@/data/products";

interface Props {
  clientId: string;
  product: Product;
}

export const WatchProductPage: React.FC<Props> = ({ clientId, product }) => {
  const [selectedColor, setSelectedColor] = React.useState(
    product.colors[0].name
  );
  const [selectedSize, setSelectedSize] = React.useState("42mm");
  const [quantity, setQuantity] = React.useState(1);
  const [selectedTab, setSelectedTab] = React.useState("description");
  const [isImageZoomed, setIsImageZoomed] = React.useState(false);

  const ProductImage =
    product.images.find(
      (image) => image.color.toLowerCase() === selectedColor.toLowerCase()
    )?.url || "";

  const colors = product.colors;
  const sizes = product.sizes;

  const handleQuantityChange = (action: "increase" | "decrease") => {
    if (action === "increase") {
      setQuantity((prev) => prev + 1);
    } else if (action === "decrease" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  async function checkOut() {
    await authClient.checkout({
      // Any Polar Product ID can be passed here
      products: [product.polarId],
      referenceId: clientId,
      metadata: {
        color: selectedColor,
        size: selectedSize,
        quantity: quantity,
      },
    });
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-divider/40">
        <div className="container mx-auto px-4 py-5 flex justify-between items-center">
          <div className="flex items-center gap-8">
            <h1 className="text-xl font-semibold tracking-wider">
              {product.name}
            </h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Product Images */}
          <div className="lg:w-3/5">
            <div className="relative overflow-hidden rounded-xl bg-content1 p-8">
              <div
                className={`transition-transform duration-500 ease-out ${isImageZoomed ? "scale-150" : "scale-100"}`}
                onMouseEnter={() => setIsImageZoomed(true)}
                onMouseLeave={() => setIsImageZoomed(false)}
              >
                <NextImage
                  alt="Watch main image"
                  className="w-full h-[500px] object-contain transition-all duration-500"
                  src={ProductImage!}
                />
              </div>
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-content2/80 backdrop-blur-md px-4 py-2 rounded-full text-xs">
                Hover to zoom
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="lg:w-2/5">
            <div className="sticky top-8 space-y-8">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Chip color="primary" size="sm" variant="flat">
                    Limited Edition
                  </Chip>
                  <Chip color="success" size="sm" variant="flat">
                    In Stock
                  </Chip>
                </div>

                <h1 className="text-3xl font-semibold mb-2 tracking-tight capitalize">
                  {product.name + " " + selectedColor}
                </h1>
                <p className="text-foreground-500 mb-4 leading-relaxed">
                  {product.description}
                </p>

                <div className="flex items-center gap-2 mb-6">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Icon
                        key={star}
                        className={
                          star <= 4 ? "text-warning" : "text-default-300"
                        }
                        icon="lucide:star"
                        width={16}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-foreground-500">
                    {product.reviews.length} reviews
                  </span>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline gap-4">
                    <span className="text-3xl font-semibold">
                      ${product.price}
                    </span>
                    <span className="text-foreground-500 line-through">
                      ${product.price + 100}
                    </span>
                    <span className="text-danger text-sm font-medium">
                      25% off
                    </span>
                  </div>
                </div>
              </div>

              <Divider className="opacity-20" />

              <div>
                <h3 className="text-sm font-medium mb-3">Color</h3>
                <WatchColorSelector
                  colors={colors}
                  selectedColor={selectedColor}
                  onSelectColor={setSelectedColor}
                />
              </div>

              <div>
                <h3 className="text-sm font-medium mb-3">Size</h3>
                <WatchSizeSelector
                  selectedSize={selectedSize}
                  sizes={sizes}
                  onSelectSize={setSelectedSize}
                />
              </div>

              <div>
                <h3 className="text-sm font-medium mb-3">Quantity</h3>
                <div className="flex items-center bg-content2 rounded-lg w-fit">
                  <Button
                    isIconOnly
                    className="rounded-r-none"
                    isDisabled={quantity <= 1}
                    size="sm"
                    variant="light"
                    onPress={() => handleQuantityChange("decrease")}
                  >
                    <Icon icon="lucide:minus" width={16} />
                  </Button>
                  <span className="w-12 text-center py-1">{quantity}</span>
                  <Button
                    isIconOnly
                    className="rounded-l-none"
                    size="sm"
                    variant="light"
                    onPress={() => handleQuantityChange("increase")}
                  >
                    <Icon icon="lucide:plus" width={16} />
                  </Button>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <Button
                  className="w-full"
                  color="primary"
                  size="lg"
                  variant="flat"
                  onPress={checkOut}
                >
                  Buy Now
                </Button>
              </div>

              <Divider className="opacity-20" />

              <div className="flex flex-col gap-4 text-sm">
                <div className="flex items-center gap-3">
                  <div className="bg-content2 p-2 rounded-full">
                    <Icon
                      className="text-primary"
                      icon="lucide:truck"
                      width={18}
                    />
                  </div>
                  <div>
                    <p className="font-medium">Free Shipping</p>
                    <p className="text-foreground-500 text-xs">
                      On orders over $50
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-content2 p-2 rounded-full">
                    <Icon
                      className="text-primary"
                      icon="lucide:rotate-ccw"
                      width={18}
                    />
                  </div>
                  <div>
                    <p className="font-medium">30-Day Returns</p>
                    <p className="text-foreground-500 text-xs">
                      Hassle-free returns
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-content2 p-2 rounded-full">
                    <Icon
                      className="text-primary"
                      icon="lucide:shield-check"
                      width={18}
                    />
                  </div>
                  <div>
                    <p className="font-medium">2-Year Warranty</p>
                    <p className="text-foreground-500 text-xs">
                      International coverage
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20">
          <Tabs
            aria-label="Product information"
            classNames={{
              tabList: "gap-6",
              cursor: "w-full",
              tab: "max-w-fit px-0 h-12",
            }}
            color="primary"
            selectedKey={selectedTab}
            variant="underlined"
            onSelectionChange={setSelectedTab as any}
          >
            <Tab key="description" title="Description">
              <Card className="bg-content1 border-none shadow-none">
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-6">
                    Product Details
                  </h3>
                  <p className="text-foreground-400 mb-8 leading-relaxed max-w-3xl">
                    {product.description}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-8">
                    <div>
                      <h4 className="font-medium mb-4 text-lg">Features</h4>
                      <ul className="space-y-3 text-foreground-400">
                        {product.features.map((feature) => (
                          <li key={feature} className="flex items-center gap-2">
                            <Icon
                              className="text-primary"
                              icon="lucide:check"
                              width={18}
                            />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium mb-4 text-lg">
                        Specifications
                      </h4>
                      <div className="space-y-3">
                        {Object.entries(product.specifications).map(
                          ([key, value]) => (
                            <div
                              key={key}
                              className="flex justify-between py-2 border-b border-divider/20"
                            >
                              <span className="text-foreground-500">{key}</span>
                              <span className="font-medium">{value}</span>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </Tab>
            <Tab key="reviews" title={`Reviews (${product.reviews.length})`}>
              <Card className="bg-content1 border-none shadow-none">
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-6">
                    Customer Reviews
                  </h3>
                  <div className="flex flex-col gap-6">
                    {product.reviews.map((review) => (
                      <div
                        key={review.name}
                        className="bg-content2 p-6 rounded-xl"
                      >
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex items-center gap-3">
                            <Avatar
                              alt={review.name}
                              size="sm"
                              src={review.avatar}
                            />
                            <div>
                              <p className="font-medium">{review.name}</p>
                              <p className="text-xs text-foreground-500">
                                {review.date}
                              </p>
                            </div>
                          </div>
                          <div className="flex">
                            {[...Array(review.rating)].map((star) => (
                              <Icon
                                key={star}
                                className="text-warning"
                                icon="lucide:star"
                                width={14}
                              />
                            ))}
                          </div>
                        </div>
                        <h4 className="font-medium mb-2">{review.title}</h4>
                        <p className="text-sm text-foreground-400 leading-relaxed">
                          {review.content}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </Tab>
            <Tab key="shipping" title="Shipping & Returns">
              <Card className="bg-content1 border-none shadow-none">
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-6">
                    Shipping & Returns
                  </h3>
                  <div className="space-y-8 max-w-3xl">
                    <div className="bg-content2 p-6 rounded-xl">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <Icon
                            className="text-primary"
                            icon="lucide:truck"
                            width={20}
                          />
                        </div>
                        <h4 className="font-medium text-lg">
                          Delivery Options
                        </h4>
                      </div>
                      <p className="text-foreground-400 mb-4">
                        We offer several shipping options to meet your needs:
                      </p>
                      <ul className="space-y-2 text-foreground-400">
                        <li className="flex items-start gap-2">
                          <Icon
                            className="text-primary mt-1"
                            icon="lucide:check"
                            width={16}
                          />
                          <span>
                            Standard Shipping (3-5 business days): Free on
                            orders over $50
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Icon
                            className="text-primary mt-1"
                            icon="lucide:check"
                            width={16}
                          />
                          <span>Express Shipping (1-2 business days): $15</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Icon
                            className="text-primary mt-1"
                            icon="lucide:check"
                            width={16}
                          />
                          <span>Next Day Delivery (order by 2pm): $25</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-content2 p-6 rounded-xl">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <Icon
                            className="text-primary"
                            icon="lucide:rotate-ccw"
                            width={20}
                          />
                        </div>
                        <h4 className="font-medium text-lg">Return Policy</h4>
                      </div>
                      <p className="text-foreground-400 mb-4">
                        We want you to be completely satisfied with your
                        purchase. If you&apos;re not happy for any reason, we
                        accept returns within 30 days of delivery.
                      </p>
                      <ul className="space-y-2 text-foreground-400">
                        <li className="flex items-start gap-2">
                          <Icon
                            className="text-primary mt-1"
                            icon="lucide:check"
                            width={16}
                          />
                          <span>
                            Items must be unworn and in original condition with
                            all tags attached
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Icon
                            className="text-primary mt-1"
                            icon="lucide:check"
                            width={16}
                          />
                          <span>
                            Return shipping is free for domestic orders
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Icon
                            className="text-primary mt-1"
                            icon="lucide:check"
                            width={16}
                          />
                          <span>
                            Refunds will be processed within 5-7 business days
                            after we receive your return
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </Card>
            </Tab>
          </Tabs>
        </div>
      </main>
    </div>
  );
};
