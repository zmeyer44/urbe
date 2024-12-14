import { MapPinIcon } from 'lucide-react';

export function PinIcon() {
  return (
    <div className="center h-10 w-10 shrink-0 overflow-hidden rounded-sm border bg-background text-muted-foreground">
      <div className="center w-full text-center">
        <div className="text-center font-medium text-[14px]">
          <MapPinIcon className="size-5" />
        </div>
      </div>
    </div>
  );
}
