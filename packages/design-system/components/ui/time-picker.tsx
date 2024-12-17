"use client";

import * as React from 'react';
import { ClockIcon } from 'lucide-react';
import { Label } from './label';
import { TimePickerInput } from './time-picker-input';
import { ToggleGroup, ToggleGroupItem } from './toggle-group';
import { cn } from '@repo/design-system/lib/utils';
interface TimePickerDemoProps {
  hideLabels?: boolean;
  use24HourClock?: boolean;
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
}

export function TimePicker({
  date,
  setDate,
  hideLabels = false,
  use24HourClock = false,
}: TimePickerDemoProps) {
  const minuteRef = React.useRef<HTMLInputElement>(null);
  const hourRef = React.useRef<HTMLInputElement>(null);
  const secondRef = React.useRef<HTMLInputElement>(null);

  return (
    <div className={cn("flex items-center gap-2", hideLabels && "items-end")}>
      <div className="grid gap-1 text-center">
        {!hideLabels && (
          <Label htmlFor="hours" className="text-xs">
            Hours
          </Label>
        )}
        <TimePickerInput
          id="hours"
          name="hours"
          picker={use24HourClock ? "hours" : "12hours"}
          date={date}
          setDate={setDate}
          ref={hourRef}
          onRightFocus={() => minuteRef.current?.focus()}
        />
      </div>
      <div className="text-muted-foreground center -mx-1 self-stretch text-xl">
        :
      </div>
      <div className="grid gap-1 text-center">
        {!hideLabels && (
          <Label htmlFor="minutes" className="text-xs">
            Minutes
          </Label>
        )}
        <TimePickerInput
          picker="minutes"
          date={date}
          setDate={setDate}
          ref={minuteRef}
          onLeftFocus={() => hourRef.current?.focus()}
          onRightFocus={() => secondRef.current?.focus()}
        />
      </div>
      {/* <div className="grid gap-1 text-center">
        {!hideLabels && (
          <Label htmlFor="seconds" className="text-xs">
            Seconds
          </Label>
        )}
        <TimePickerInput
          picker="seconds"
          date={date}
          setDate={setDate}
          ref={secondRef}
          onLeftFocus={() => minuteRef.current?.focus()}
        />
      </div> */}
      {!use24HourClock && (
        <ToggleGroup
          size="sm"
          type="single"
          defaultValue="am"
          onValueChange={(value) => {
            const newDate = date ?? new Date();
            if (value === "pm" && newDate.getHours() < 12) {
              newDate.setHours(newDate.getHours() + 12);
            } else if (value === "am" && newDate.getHours() >= 12) {
              newDate.setHours(newDate.getHours() - 12);
            }
            setDate(newDate);
          }}
        >
          <ToggleGroupItem value="am" aria-label="AM">
            <span>AM</span>
          </ToggleGroupItem>
          <ToggleGroupItem value="pm" aria-label="PM">
            <span>PM</span>
          </ToggleGroupItem>
        </ToggleGroup>
      )}
      <div className="flex items-center self-stretch">
        <ClockIcon className="ml-2 h-4 w-4" />
      </div>
    </div>
  );
}
