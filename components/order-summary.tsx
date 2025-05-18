"use client";

import React from "react";
import { Card, CardBody, Divider, Badge } from "@heroui/react";

type OrderItem = {
  id: string;
  name: string;
  quantity: number;
  price: number;
};

export const OrderSummary = () => {
  const orderNumber = "ORD-" + Math.floor(100000 + Math.random() * 900000);
  const orderDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const orderItems: OrderItem[] = [
    {
      id: "item-1",
      name: "Premium Wireless Headphones",
      quantity: 1,
      price: 149.99,
    },
    {
      id: "item-2",
      name: "Smartphone Case",
      quantity: 1,
      price: 24.99,
    },
  ];

  const subtotal = orderItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = 4.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <Card className="border border-default-200 shadow-none">
      <CardBody className="gap-4">
        <div className="flex justify-between items-center">
          <h3 className="text-medium font-medium">Order Summary</h3>
          <Badge color="success" variant="flat">
            Paid
          </Badge>
        </div>

        <div className="flex justify-between text-small">
          <span className="text-foreground-500">Order Number:</span>
          <span className="font-medium">{orderNumber}</span>
        </div>

        <div className="flex justify-between text-small">
          <span className="text-foreground-500">Date:</span>
          <span>{orderDate}</span>
        </div>

        <Divider className="my-1" />

        <div className="space-y-3">
          {orderItems.map((item) => (
            <div key={item.id} className="flex justify-between text-small">
              <div>
                <span className="font-medium">{item.name}</span>
                <span className="text-foreground-500 ml-1">
                  x{item.quantity}
                </span>
              </div>
              <span>${item.price.toFixed(2)}</span>
            </div>
          ))}
        </div>

        <Divider className="my-1" />

        <div className="space-y-2">
          <div className="flex justify-between text-small">
            <span className="text-foreground-500">Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between text-small">
            <span className="text-foreground-500">Shipping</span>
            <span>${shipping.toFixed(2)}</span>
          </div>

          <div className="flex justify-between text-small">
            <span className="text-foreground-500">Tax</span>
            <span>${tax.toFixed(2)}</span>
          </div>

          <div className="flex justify-between font-medium mt-2">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
