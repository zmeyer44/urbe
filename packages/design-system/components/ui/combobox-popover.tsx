import { useState, ComponentProps } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button } from "./button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./command";
import { Check, ChevronDown} from 'lucide-react';
import { cn } from '@repo/design-system/lib/utils';

type ComboboxPopoverProps<T> = {
  value: T;
  setValue: (value: T) => void;
  options: {
    label: string;
    value: T;
  }[];
  placeholder?: string;
  buttonProps?: ComponentProps<typeof Button>;
};
export function ComboboxPopover<T>({
  value,
  setValue,
  options,
  placeholder,
  buttonProps,
}: ComboboxPopoverProps<T>) {
  const { className: buttonClassName, ...restButtonProps } = buttonProps || {};
  const [open, setOpen] = useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className={cn(
            "w-full justify-between",
            !value && "text-muted-foreground",
            buttonClassName,
          )}
          {...restButtonProps}
        >
          {value
            ? options?.find((option) => option.value === value)?.label
            : placeholder}
          <ChevronDown className="ml-auto h-4 w-4 shrink-0" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="z-modal+ p-0">
        <Command>
          <CommandInput placeholder={placeholder ?? "Search..."} />
          <CommandList className="max-h-[250px] overflow-y-auto">
            <CommandEmpty>No options found.</CommandEmpty>
            <CommandGroup>
              {options?.map((option) => (
                <CommandItem
                  value={option.label}
                  key={option.label}
                  onSelect={() => {
                    setValue(option.value);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      option.value === value ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
