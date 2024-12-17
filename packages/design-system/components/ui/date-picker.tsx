"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { FormControl } from "./form";
import { cn } from "@repo/design-system/lib/utils";
import { Button } from "./button";
import { Calendar } from "./calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { ComponentProps } from "react";

type DatePickerProps = {
  date: Date | undefined;
  setDate: (newDate: Date | undefined) => void;
  buttonProps?: ComponentProps<typeof Button>;
  placeholder?: string;
  inForm?: boolean;
};
export function DatePicker({
  date,
  setDate,
  buttonProps,
  placeholder = "Pick a date",
  inForm = false,
}: DatePickerProps) {
  const { className: buttonClassName, ...restButtonProps } = buttonProps || {};
  const [open, setOpen] = React.useState(false);
  const Comp = inForm ? FormControl : Slot;
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Comp>
          <Button
            variant={"outline"}
            className={cn(
              "w-full max-w-[280px] justify-start text-left font-normal",
              !date && "text-muted-foreground",
              buttonClassName,
            )}
            {...restButtonProps}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>{placeholder}</span>}
          </Button>
        </Comp>
      </PopoverTrigger>
      <PopoverContent className="z-modal+ w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(newDate) => {
            console.log("newDate", newDate);
            setDate(newDate);
            setOpen(false);
          }}
          initialFocus={true}
        />
      </PopoverContent>
    </Popover>
  );
}
