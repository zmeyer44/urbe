import * as React from 'react';
import { ChevronsUpDownIcon, XIcon } from 'lucide-react';
import { PopoverProps } from '@radix-ui/react-popover';
import { useControllableState } from '@radix-ui/react-use-controllable-state';
import { composeRefs } from '@radix-ui/react-compose-refs';
import { cn } from '@repo/design-system/lib/utils';
import { useContextSafely } from '@repo/design-system/hooks/use-context-safely';
import { Button } from "./button";
import { Badge } from "./badge";
import {
  Command,
  CommandItem,
  CommandList,
  CommandInput,
  CommandEmpty,
} from "./command";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { CheckIcon } from "@radix-ui/react-icons";
import { useCommandState } from "cmdk";

interface MultiselectContextApi {
  selectionSet: Set<string>;
  selection: string[];
  select: (val: string) => void;
  unselect: (val: string) => void;
  open: boolean;
  setOpen: (val: boolean) => void;
}

const MultiselectContext = React.createContext<MultiselectContextApi | null>(
  null,
);

interface MultiselectProps extends PopoverProps {
  value?: string[];
  onValueChange?: (value: string[]) => void;
  defaultValue?: string[];
  className?: string;
}

export const Multiselect = React.forwardRef<HTMLDivElement, MultiselectProps>(
  (
    {
      defaultOpen = false,
      open,
      onOpenChange,
      defaultValue = [],
      value,
      onValueChange,
      className,
      children,
      ...otherProps
    },
    ref,
  ) => {
    const [_selection, _setSelection] = useControllableState({
      prop: value,
      defaultProp: defaultValue,
      onChange: onValueChange,
    });

    const [_open, _setOpen] = useControllableState({
      prop: open,
      defaultProp: defaultOpen,
      onChange: onOpenChange,
    });

    const selectionSet = React.useMemo(() => new Set(_selection), [_selection]);

    return (
      <MultiselectContext.Provider
        value={{
          selectionSet,
          // @ts-ignore
          selection: _selection,
          select: (value: string) => {
            // @ts-ignore
            _setSelection((prev) => Array.from(new Set([...prev, value])));
          },
          unselect: (value: string) => {
            // @ts-ignore
            _setSelection((prev) => prev.filter((v) => v !== value));
          },
          // @ts-ignore
          open: _open,
          setOpen: _setOpen,
        }}
      >
        <Popover {...otherProps} open={_open} onOpenChange={_setOpen}>
          {children}
        </Popover>
      </MultiselectContext.Provider>
    );
  },
);

interface MultiselectTriggerApi {
  grow: boolean;
}

const MultiselectTriggerContext =
  React.createContext<MultiselectTriggerApi | null>(null);

interface MultiselectTriggerProps
  extends React.ComponentPropsWithoutRef<typeof PopoverTrigger> {
  grow?: boolean;
}

export const MultiselectTrigger = React.forwardRef<
  React.ElementRef<typeof PopoverTrigger>,
  MultiselectTriggerProps & { placeholder?: string }
>(
  (
    {
      children,
      className,
      placeholder = "Select...",
      grow = false,
      ...otherProps
    },
    ref,
  ) => {
    const multiselect = useContextSafely(MultiselectContext);
    const mask = grow
      ? undefined
      : "linear-gradient(90deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 1) calc(100% - 24px), rgba(255, 255, 255, 0) 100%)";
    return (
      <MultiselectTriggerContext.Provider value={{ grow }}>
        <PopoverTrigger
          {...otherProps}
          ref={ref}
          className={cn(
            "ring-offset-background placeholder:text-muted-foreground focus:ring-ring relative flex h-fit w-full items-center overflow-hidden whitespace-nowrap rounded-md border bg-transparent text-sm shadow-none focus:outline-none focus:ring-1 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
            className,
          )}
        >
          <div
            className={cn(
              "relative h-full min-w-0 flex-1 overflow-auto rounded-l-[inherit] px-[5px] py-[5px]",
            )}
            style={{ mask, WebkitMask: mask }}
          >
            {multiselect.selection.length === 0 ? (
              <div className="flex h-6 items-center px-1.5">
                <span className="text-muted-foreground">{placeholder}</span>
              </div>
            ) : (
              children
            )}
          </div>
          <div className="bg-background rounded-r-[inherit] pl-1 pr-2">
            <ChevronsUpDownIcon className="text-muted-foreground h-4 w-4" />
          </div>
        </PopoverTrigger>
      </MultiselectTriggerContext.Provider>
    );
  },
);

export const MultiselectBadgeList = React.forwardRef<
  HTMLDivElement,
  React.HTMLProps<HTMLDivElement>
>(({ children, className, ...otherProps }, ref) => {
  const trigger = useContextSafely(MultiselectTriggerContext);
  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-wrap gap-1",
        !trigger.grow && "w-max flex-nowrap",
        className,
      )}
      {...otherProps}
    >
      {children}
    </div>
  );
});

interface MultiselectBadgeProps
  extends React.ComponentPropsWithoutRef<typeof Badge> {
  value: string;
}

export const MultiselectBadge = React.forwardRef<
  React.ElementRef<typeof Badge>,
  MultiselectBadgeProps
>(({ children, value, className, ...otherProps }, ref) => {
  const multiselect = useContextSafely(MultiselectContext);
  return (
    <Badge
      // @ts-ignore
      ref={ref}
      variant="secondary"
      className={cn("h-6 gap-1", className)}
      {...otherProps}
    >
      {children}
      <Button
        size="icon"
        variant="secondary"
        aria-label={`Unselect ${
          typeof children === "string" ? children : value
        }`}
        className="-mr-1.5 h-4 w-4 shadow-none"
        onClick={(e) => {
          multiselect.unselect(value);
          e.stopPropagation();
        }}
      >
        <XIcon className="h-3 w-3" />
      </Button>
    </Badge>
  );
});

export const MultiselectInput = React.forwardRef<
  React.ElementRef<typeof CommandInput>,
  React.ComponentPropsWithoutRef<typeof CommandInput>
>(
  (
    {
      children,
      className,
      placeholder = "Search...",
      value,
      defaultValue,
      onValueChange,
      ...otherProps
    },
    forwardedRef,
  ) => {
    const ref = React.useRef<HTMLInputElement>(null);
    const multiselect = useContextSafely(MultiselectContext);
    const content = useContextSafely(MultiselectContentContext);
    const activeValue = useCommandState((state) => state.value);

    const [search, setSearch] = useControllableState({
      prop: value,
      defaultProp: defaultValue as string | undefined,
      onChange: onValueChange,
    });

    React.useEffect(() => {
      if (multiselect.open) {
        setSearch("");
      }
    }, [multiselect.open]);

    // // fix broken cmdk accessibility
    React.useEffect(() => {
      if (ref.current) {
        const activeItemEl = content.rootRef.current?.querySelector(
          `[cmdk-item=""][data-value="${encodeURIComponent(activeValue)}"]`,
        );
        if (activeItemEl) {
          ref.current.setAttribute("aria-activedescendant", activeItemEl.id);
        }
      }
    }, [activeValue]);

    return (
      <div className="-mt-1 mb-1">
        <CommandInput
          ref={forwardedRef ? composeRefs(forwardedRef, ref) : ref}
          placeholder={placeholder}
          value={search}
          onValueChange={setSearch}
          className="h-9 px-1.5 text-sm"
          onKeyUp={(e) => {
            if (e.key === " ") {
              e.preventDefault();
            }
          }}
          onBlur={(e) => {
            e.currentTarget.focus();
          }}
          {...otherProps}
        />
      </div>
    );
  },
);

const AriaDescendantFix = ({
  listRef,
}: {
  listRef: React.RefObject<HTMLDivElement>;
}) => {
  const activeValue = useCommandState((state) => state.value);

  // fix broken cmdk accessibility
  React.useEffect(() => {
    if (listRef.current) {
      const activeItemEl = listRef.current?.querySelector(
        `[cmdk-item=""][data-value="${encodeURIComponent(activeValue)}"]`,
      );
      if (activeItemEl) {
        listRef.current.setAttribute("aria-activedescendant", activeItemEl.id);
      }
    }
  }, [activeValue]);

  return null;
};

interface MultiselectContentApi {
  rootRef: React.RefObject<HTMLDivElement>;
}

const MultiselectContentContext =
  React.createContext<MultiselectContentApi | null>(null);

export const MultiselectContent = React.forwardRef<
  React.ElementRef<typeof PopoverContent>,
  React.ComponentPropsWithoutRef<typeof PopoverContent>
>(
  (
    {
      children,
      className,
      //   placeholder = "Search...",
      align = "end",
      ...otherProps
    },
    ref,
  ) => {
    const rootRef = React.useRef<HTMLDivElement>(null);
    const listRef = React.useRef<HTMLDivElement>(null);

    return (
      // @ts-ignore
      <MultiselectContentContext.Provider value={{ rootRef: rootRef }}>
        <PopoverContent
          ref={ref}
          className={cn(
            "w-[var(--radix-popover-trigger-width)] p-1",
            className,
          )}
          align={align}
          asChild
          {...otherProps}
        >
          <Command
            ref={rootRef}
            className={cn("overflow-visible", className)}
            role="listbox"
          >
            {/* @ts-ignore */}
            <AriaDescendantFix listRef={rootRef} />
            <CommandList ref={listRef}>{children}</CommandList>
          </Command>
        </PopoverContent>
      </MultiselectContentContext.Provider>
    );
  },
);

interface MultiselectItemProps
  extends React.ComponentPropsWithoutRef<typeof CommandItem> {
  value: string;
}

export const MultiselectItem = React.forwardRef<
  React.ElementRef<typeof CommandItem>,
  MultiselectItemProps
>(({ children, className, value, onSelect, ...otherProps }, ref) => {
  const multiselect = useContextSafely(MultiselectContext);
  const checked = multiselect.selectionSet.has(value);
  return (
    <CommandItem
      ref={ref}
      role="option"
      value={value}
      onSelect={(value) => {
        if (multiselect.selectionSet.has(value)) {
          multiselect.unselect(value);
        } else {
          multiselect.select(value);
        }
        onSelect?.(value);
      }}
      className={cn(className)}
      aria-checked={checked}
      {...otherProps}
    >
      {children}
      {checked && <CheckIcon className="absolute right-2 h-4 w-4" />}
    </CommandItem>
  );
});

export const MultiselectEmpty = React.forwardRef<
  React.ElementRef<typeof CommandEmpty>,
  React.ComponentPropsWithoutRef<typeof CommandEmpty>
>(({ children, className, ...otherProps }, ref) => {
  return (
    <CommandEmpty
      ref={ref}
      className={cn("text-muted-foreground px-2 py-1.5 text-sm", className)}
      {...otherProps}
    >
      {children}
    </CommandEmpty>
  );
});
