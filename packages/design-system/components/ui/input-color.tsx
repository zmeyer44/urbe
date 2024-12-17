import * as React from 'react';
import { cn } from '@repo/design-system/lib/utils';
import { hexToHSL, isColorDark } from '@repo/design-system/lib/utils/functions';

export interface ColorInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "type" | "value" | "onChange"
  > {
  value: string;
  onChange: (value: string) => void;
}

const InputColor = React.forwardRef<HTMLInputElement, ColorInputProps>(
  ({ className, value, onChange, ...props }, ref) => {
    const [color, setColor] = React.useState(value);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const hex = e.target.value;
      if (!hex) return;
      setColor(hex);
      const hsl = hexToHSL(hex);
      onChange(hsl);
    };

    // React.useEffect(() => {
    //   setColor(HSLToHex(value));
    // }, [value]);

    return (
      <div className="relative flex w-full">
        <input
          type="color"
          value={color}
          onChange={handleChange}
          className={cn(
            "h-9 w-full cursor-pointer appearance-none rounded-md border bg-transparent",
            "focus:ring-primary focus:outline-none focus:ring-2",
            className,
          )}
          ref={ref}
          {...props}
        />
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          <span
            className={`text-sm ${
              isColorDark(color) ? "text-white" : "text-black"
            }`}
          >
            {value}
          </span>
        </div>
      </div>
    );
  },
);

InputColor.displayName = "ColorInput";

export { InputColor };
