import * as React from "react";
import { cn } from "@repo/design-system/lib/utils";
import { Loader2 } from "lucide-react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  handleUpload: (file: File | null) => void;
  info?: string;
  children?: React.ReactNode;
  loading?: boolean;
  customOptions?: Record<string, unknown>;
}

const InputFile = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      name,
      value,
      accept = "image/*",
      info,
      loading,
      handleUpload,
      children,
      customOptions,
      ...props
    },
    ref,
  ) => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [dragActive, setDragActive] = React.useState(false);
    const aspectRatio = customOptions?.aspectRatio;
    return (
      <div
        className={cn(
          "center bg-muted border-border hover:bg-muted/30 group relative w-full cursor-pointer flex-col rounded-md border shadow-sm transition-all",
          aspectRatio === "aspect-video"
            ? "aspect-video max-w-screen-md"
            : "aspect-square max-w-xs",
          className,
        )}
        onClick={() => {
          if (inputRef.current) {
            inputRef.current!.click();
          }
        }}
      >
        {loading && (
          <div className="center absolute inset-0 z-10">
            <Loader2 className="h-4 w-4 animate-spin" />
          </div>
        )}
        <div
          className="absolute z-[5] h-full w-full rounded-md"
          onDragOver={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setDragActive(true);
          }}
          onDragEnter={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setDragActive(true);
          }}
          onDragLeave={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setDragActive(false);
          }}
          onDrop={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setDragActive(false);

            const file = e.dataTransfer.files && e.dataTransfer.files[0];
            inputRef.current!.files = e.dataTransfer.files; // set input file to dropped file
            if (file) {
              handleUpload(file);
            }
          }}
        />
        <div
          className={`${
            dragActive ? "border-foreground border-2" : ""
          } absolute z-[3] flex h-full w-full flex-col items-center justify-center rounded-md px-10 transition-all ${
            value
              ? "bg-background/80 opacity-0 hover:opacity-100 hover:backdrop-blur-md"
              : "hover:bg-muted/30 bg-background opacity-100"
          }`}
        >
          <svg
            className={`${
              dragActive ? "scale-110" : "scale-100"
            } text-muted-foreground h-7 w-7 transition-all duration-75 group-hover:scale-110 group-active:scale-95`}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path>
            <path d="M12 12v9"></path>
            <path d="m16 16-4-4-4 4"></path>
          </svg>
          {(!customOptions || customOptions["hideText"] !== true) && (
            <p className="text-muted-foreground mt-2 text-center text-sm">
              Drag and drop or click to upload.
            </p>
          )}
          {!!info && (
            <p className="text-muted mt-2 text-center text-sm">{info}</p>
          )}
          <span className="sr-only">File upload</span>
        </div>
        {children}

        <div className="mt-1 flex rounded-md shadow-sm">
          <input
            id={`${name}-upload`}
            ref={inputRef}
            name={name}
            type="file"
            accept={accept}
            className="sr-only"
            {...props}
            onChange={(e) => {
              const file = e.currentTarget.files && e.currentTarget.files[0];
              if (file) {
                handleUpload(file);
              }
            }}
          />
        </div>
      </div>
    );
  },
);
InputFile.displayName = "InputFile";

export { InputFile };
