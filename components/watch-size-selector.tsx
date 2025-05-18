import React from "react";
import { Button } from "@heroui/react";

interface WatchSizeSelectorProps {
  sizes: string[];
  selectedSize: string;
  onSelectSize: (size: string) => void;
}

export const WatchSizeSelector: React.FC<WatchSizeSelectorProps> = ({
  sizes,
  selectedSize,
  onSelectSize,
}) => {
  return (
    <div className="flex gap-3">
      {sizes.map((size) => (
        <Button
          key={size}
          className="min-w-[70px]"
          color={selectedSize === size ? "primary" : "default"}
          variant={selectedSize === size ? "solid" : "flat"}
          onPress={() => onSelectSize(size)}
        >
          {size}
        </Button>
      ))}
    </div>
  );
};
