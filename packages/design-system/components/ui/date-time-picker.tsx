"use client";

import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@repo/design-system/lib/utils";
import { Button } from "./button";
import { Calendar } from "./calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { TimePicker } from "@repo/design-system/components/ui/time-picker";
import { ComponentProps } from "react";

type DateTimePickerProps = {
  date: Date | undefined;
  setDate: (newDate: Date | undefined) => void;
  buttonProps?: ComponentProps<typeof Button>;
};
export function DateTimePicker({
  date,
  setDate,
  buttonProps,
}: DateTimePickerProps) {
  const { className: buttonClassName, ...restButtonProps } = buttonProps || {};
  return (
    <Popover>
      <PopoverTrigger asChild>
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
          {date ? format(date, "PPP HH:mm") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar mode="single" selected={date} onSelect={setDate} />
        <div className="border-border border-t p-3">
          <TimePicker setDate={setDate} date={date} />
        </div>
      </PopoverContent>
    </Popover>
  );
}
