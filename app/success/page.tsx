"use client";
import React from "react";
import { Button, Card, CardBody } from "@heroui/react";

import { authClient } from "@/lib/auth-client";

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-xl mx-auto overflow-visible">
        <CardBody className="gap-6 py-8 px-6">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-semibold text-foreground">
              Payment Successful!
            </h1>
            <p className="text-foreground-500">
              Thank you for your purchase. Your order has been confirmed.
            </p>
            <Button
              color="primary"
              onPress={async () => {
                await authClient.customer.portal();
              }}
            >
              Go to your orders
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
