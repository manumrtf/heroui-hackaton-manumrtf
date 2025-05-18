interface ColorOption {
  name: string;
  value: string;
}

interface WatchColorSelectorProps {
  colors: ColorOption[];
  selectedColor: string;
  onSelectColor: (color: string) => void;
}

export const WatchColorSelector: React.FC<WatchColorSelectorProps> = ({
  colors,
  selectedColor,
  onSelectColor,
}) => {
  return (
    <div className="flex gap-4">
      {colors.map((color) => (
        <button
          key={color.name}
          aria-label={`Select ${color.name} color`}
          className={`
            w-12 h-12 rounded-full flex items-center justify-center bg-content2
            ${selectedColor === color.name ? "ring-2 ring-primary ring-offset-2 ring-offset-background" : ""}
            transition-all duration-200 hover:scale-110
          `}
          onClick={() => onSelectColor(color.name)}
        >
          <span
            className="w-8 h-8 rounded-full"
            style={{ backgroundColor: color.value }}
          />
        </button>
      ))}
    </div>
  );
};
