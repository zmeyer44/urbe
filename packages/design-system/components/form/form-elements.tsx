'use client';
import type { ReactNode } from 'react';
import type {
  FieldValues,
  Path,
  PathValue,
  UseFormReturn,
} from 'react-hook-form';

import { Button } from '@repo/design-system/components/ui/button';
import { Calendar } from '@repo/design-system/components/ui/calendar';
import { Checkbox } from '@repo/design-system/components/ui/checkbox';
import { ComboboxPopover } from '@repo/design-system/components/ui/combobox-popover';
import { DatePicker } from '@repo/design-system/components/ui/date-picker';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@repo/design-system/components/ui/form';
import { Input } from '@repo/design-system/components/ui/input';
import { InputColor } from '@repo/design-system/components/ui/input-color';
import { InputFile } from '@repo/design-system/components/ui/input-file';
import { InputSuffix } from '@repo/design-system/components/ui/input-suffix';
import {
  Multiselect,
  MultiselectBadge,
  MultiselectBadgeList,
  MultiselectContent,
  MultiselectEmpty,
  MultiselectInput,
  MultiselectItem,
  MultiselectTrigger,
} from '@repo/design-system/components/ui/multiselect';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@repo/design-system/components/ui/popover';
import {
  RadioGroup,
  RadioGroupItem,
} from '@repo/design-system/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@repo/design-system/components/ui/select';
import { Switch } from '@repo/design-system/components/ui/switch';
import { Textarea } from '@repo/design-system/components/ui/textarea';
import { TimePicker } from '@repo/design-system/components/ui/time-picker';
import { cn } from '@repo/design-system/lib/utils';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';

type FieldOptions =
  | 'toggle'
  | 'horizontal-tabs'
  | 'file'
  | 'text'
  | 'input'
  | 'text-suffix'
  | 'text-area'
  | 'textarea'
  | 'select'
  | 'multiselect'
  | 'combobox'
  | 'radio'
  | 'checkbox'
  | 'color'
  | 'number'
  | 'date'
  | 'date-range'
  | 'date-time'
  | 'upload'
  | 'custom';

type FormElementsProps<TSchema extends FieldValues> = {
  fields: (form: UseFormReturn<TSchema, unknown, undefined>) => {
    label: string;
    name: Path<TSchema>;
    as: FieldOptions;
    placeholder?: string;
    options?: {
      label: string;
      value: PathValue<TSchema, Path<TSchema>>;
      icon?: ReactNode;
    }[];
    lines?: number;
    suffix?: string;
    maxLength?: number;
    pattern?: string;
    type?: React.HTMLInputTypeAttribute;
    styles?: string;
    value?: string | number | boolean;
    custom?: () => ReactNode;
    disabled?: boolean;
    onChange?: <T = string>(
      t: T extends string ? T : TSchema[Path<TSchema>]
    ) => void;
    transform?: (
      t: string | number | boolean | string[] | number[]
    ) => PathValue<TSchema, Path<TSchema>>;
    className?: string;
    customOptions?: Record<string, unknown>;
    cols?: 1 | 2 | 3 | 4;
  }[];
  form: UseFormReturn<TSchema, unknown, undefined>;
  defaultClassName?: string;
};
export function FormElements<TSchema extends FieldValues>({
  fields,
  form,
  defaultClassName,
}: FormElementsProps<TSchema>) {
  return (
    <>
      {fields(form).map((formField) => {
        if (formField.as === 'text-suffix') {
          return (
            <div
              key={formField.name}
              className={cn(
                'w-full',
                {
                  'col-span-1': formField.cols === 1,
                  'col-span-2': formField.cols === 2,
                  'col-span-3': formField.cols === 3,
                  'col-span-4': formField.cols === 4,
                },
                defaultClassName,
                formField.styles
              )}
            >
              <FormField
                control={form.control}
                name={formField.name}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{formField.label}</FormLabel>
                    <FormControl>
                      <InputSuffix
                        {...field}
                        type={formField.type}
                        placeholder={formField.placeholder}
                        disabled={formField.disabled}
                        onChangeCapture={(e) =>
                          formField.onChange?.(e.currentTarget.value)
                        }
                        suffix={formField.suffix}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          );
        }
        if (formField.as === 'text-area' || formField.as === 'textarea') {
          return (
            <div
              key={formField.name}
              className={cn(
                'w-full',
                {
                  'col-span-1': formField.cols === 1,
                  'col-span-2': formField.cols === 2,
                  'col-span-3': formField.cols === 3,
                  'col-span-4': formField.cols === 4,
                },
                defaultClassName,
                formField.styles
              )}
            >
              <FormField
                control={form.control}
                name={formField.name}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{formField.label}</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder={formField.placeholder}
                        disabled={formField.disabled}
                        onChangeCapture={(e) =>
                          formField.onChange?.(e.currentTarget.value)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          );
        }
        if (formField.as === 'select') {
          return (
            <div
              key={formField.name}
              className={cn(
                'w-full',
                {
                  'col-span-1': formField.cols === 1,
                  'col-span-2': formField.cols === 2,
                  'col-span-3': formField.cols === 3,
                  'col-span-4': formField.cols === 4,
                },
                defaultClassName,
                formField.styles
              )}
            >
              <FormField
                control={form.control}
                name={formField.name}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{formField.label}</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        const transformedValue = formField?.transform
                          ? formField.transform(value)
                          : value;
                        field.onChange(transformedValue);
                        formField.onChange?.(transformedValue);
                      }}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={formField.placeholder} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="z-modal+">
                        {formField.options?.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          );
        }
        if (formField.as === 'multiselect') {
          return (
            <div
              key={formField.name}
              className={cn(
                'w-full',
                {
                  'col-span-1': formField.cols === 1,
                  'col-span-2': formField.cols === 2,
                  'col-span-3': formField.cols === 3,
                  'col-span-4': formField.cols === 4,
                },
                defaultClassName,
                formField.styles
              )}
            >
              <FormField
                control={form.control}
                name={formField.name}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{formField.label}</FormLabel>
                    <Multiselect
                      value={field.value}
                      onValueChange={(value) => {
                        const transformedValue = formField?.transform
                          ? formField.transform(value)
                          : value;
                        console.log('Transformed value', transformedValue);
                        field.onChange(transformedValue);
                        // @ts-ignore
                        formField.onChange?.(transformedValue);
                      }}
                    >
                      <MultiselectTrigger
                        placeholder={formField.placeholder}
                        grow
                      >
                        <MultiselectBadgeList>
                          {/* @ts-ignore */}
                          {field.value?.map((v) => {
                            const option = formField.options?.find(
                              (o) => o.value === v
                            );
                            return (
                              <MultiselectBadge key={v} value={v}>
                                {option?.label ?? v}
                              </MultiselectBadge>
                            );
                          })}
                        </MultiselectBadgeList>
                      </MultiselectTrigger>
                      <MultiselectContent className="z-modal+">
                        {!!formField.customOptions?.searchable && (
                          <MultiselectInput
                            placeholder={formField.placeholder}
                          />
                        )}
                        <MultiselectEmpty>No results.</MultiselectEmpty>
                        {formField.options?.map((option) => (
                          <MultiselectItem
                            key={option.value}
                            value={option.value}
                          >
                            {option.label}
                          </MultiselectItem>
                        ))}
                      </MultiselectContent>
                    </Multiselect>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          );
        }
        if (formField.as === 'combobox') {
          return (
            <div
              key={formField.name}
              className={cn(
                'w-full',
                {
                  'col-span-1': formField.cols === 1,
                  'col-span-2': formField.cols === 2,
                  'col-span-3': formField.cols === 3,
                  'col-span-4': formField.cols === 4,
                },
                defaultClassName,
                formField.styles
              )}
            >
              <FormField
                control={form.control}
                name={formField.name}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{formField.label}</FormLabel>
                    <div className="">
                      <ComboboxPopover
                        value={field.value}
                        setValue={(value) => {
                          field.onChange(value);
                          formField.onChange?.(value as TSchema[Path<TSchema>]);
                        }}
                        options={formField.options ?? []}
                        placeholder={formField.placeholder}
                      />
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            </div>
          );
        }
        if (formField.as === 'radio') {
          return (
            <div
              key={formField.name}
              className={cn(
                'w-full',
                {
                  'col-span-1': formField.cols === 1,
                  'col-span-2': formField.cols === 2,
                  'col-span-3': formField.cols === 3,
                  'col-span-4': formField.cols === 4,
                },
                defaultClassName,
                formField.styles
              )}
            >
              <FormField
                control={form.control}
                name={formField.name}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{formField.label}</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        {formField.options?.map((option) => (
                          <FormItem
                            key={option.value}
                            className="flex items-center space-x-3 space-y-0"
                          >
                            <FormControl>
                              <RadioGroupItem value={option.value} />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {option.label}
                            </FormLabel>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          );
        }
        if (formField.as === 'checkbox') {
          return (
            <div
              key={formField.name}
              className={cn(
                'w-full',
                {
                  'col-span-1': formField.cols === 1,
                  'col-span-2': formField.cols === 2,
                  'col-span-3': formField.cols === 3,
                  'col-span-4': formField.cols === 4,
                },
                defaultClassName,
                formField.styles
              )}
            >
              <FormField
                control={form.control}
                name={formField.name}
                render={() => (
                  <FormItem>
                    <FormLabel>{formField.label}</FormLabel>

                    {formField.options?.map((option) => (
                      <FormField
                        key={option.value}
                        control={form.control}
                        name={formField.name}
                        render={({ field }) => (
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(option.value)}
                                onCheckedChange={(checked) => {
                                  if (formField.onChange) {
                                    if (checked) {
                                      formField.onChange(
                                        (field.value?.length
                                          ? [...field.value, option.value]
                                          : [
                                              option.value,
                                            ]) as TSchema[Path<TSchema>]
                                      );
                                    } else {
                                      formField.onChange(
                                        field.value?.filter(
                                          (value: string | number) =>
                                            value !== option.value
                                        )
                                      );
                                    }
                                  }
                                  return checked
                                    ? field.onChange(
                                        field.value?.length
                                          ? [...field.value, option.value]
                                          : [option.value]
                                      )
                                    : field.onChange(
                                        field.value?.filter(
                                          (value: string | number) =>
                                            value !== option.value
                                        )
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {option.label}
                            </FormLabel>
                          </FormItem>
                        )}
                      />
                    ))}

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          );
        }
        if (formField.as === 'toggle') {
          return (
            <div
              key={formField.name}
              className={cn(
                'w-full',
                {
                  'col-span-1': formField.cols === 1,
                  'col-span-2': formField.cols === 2,
                  'col-span-3': formField.cols === 3,
                  'col-span-4': formField.cols === 4,
                },
                defaultClassName,
                formField.styles
              )}
            >
              <FormField
                control={form.control}
                name={formField.name}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{formField.label}</FormLabel>
                    <div className="">
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            </div>
          );
        }
        if (formField.as === 'date') {
          return (
            <div
              key={formField.name}
              className={cn(
                'w-full',
                {
                  'col-span-1': formField.cols === 1,
                  'col-span-2': formField.cols === 2,
                  'col-span-3': formField.cols === 3,
                  'col-span-4': formField.cols === 4,
                },
                defaultClassName,
                formField.styles
              )}
            >
              <FormField
                control={form.control}
                name={formField.name}
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-y-1">
                    <FormLabel>{formField.label}</FormLabel>
                    <DatePicker
                      {...field}
                      inForm={true}
                      date={field.value}
                      setDate={field.onChange}
                      buttonProps={{
                        variant: 'outline',
                        className: cn(
                          'center w-[240px] justify-between pl-3 text-left font-normal',
                          !field.value && 'text-muted-foreground',
                          formField.className
                        ),
                      }}
                      placeholder="Pick a date"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          );
        }
        if (formField.as === 'date-range') {
          return (
            <div
              key={formField.name}
              className={cn(
                'w-full',
                {
                  'col-span-1': formField.cols === 1,
                  'col-span-2': formField.cols === 2,
                  'col-span-3': formField.cols === 3,
                  'col-span-4': formField.cols === 4,
                },
                defaultClassName,
                formField.styles
              )}
            >
              <FormField
                control={form.control}
                name={formField.name}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{formField.label}</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'w-[300px] justify-start text-left font-normal',
                              !field.value && 'text-muted-foreground',
                              formField.className
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value?.from ? (
                              field.value.to ? (
                                <>
                                  {format(field.value.from, 'LLL dd, y')} -{' '}
                                  {format(field.value.to, 'LLL dd, y')}
                                </>
                              ) : (
                                format(field.value.from, 'LLL dd, y')
                              )
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="range"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={formField.disabled}
                          numberOfMonths={2}
                          initialFocus={true}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          );
        }
        if (formField.as === 'date-time') {
          return (
            <div
              key={formField.name}
              className={cn(
                'w-full',
                {
                  'col-span-1': formField.cols === 1,
                  'col-span-2': formField.cols === 2,
                  'col-span-3': formField.cols === 3,
                  'col-span-4': formField.cols === 4,
                },
                defaultClassName,
                formField.styles
              )}
            >
              <FormField
                control={form.control}
                name={formField.name}
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-y-1">
                    <FormLabel>{formField.label}</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'w-[240px] gap-x-2 pl-3 text-left font-normal',
                              !field.value && 'text-muted-foreground',
                              formField.className
                            )}
                          >
                            {field.value ? (
                              format(field.value, 'PPP HH:mm')
                            ) : (
                              <span>Pick a date and time</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent
                        className="z-modal+ w-auto p-0"
                        align="start"
                      >
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={formField.disabled}
                          initialFocus={true}
                        />
                        <div className="border-border border-t p-3">
                          <TimePicker
                            setDate={field.onChange}
                            date={field.value}
                          />
                        </div>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          );
        }
        if (formField.as === 'number') {
          return (
            <div
              key={formField.name}
              className={cn(
                'w-full',
                {
                  'col-span-1': formField.cols === 1,
                  'col-span-2': formField.cols === 2,
                  'col-span-3': formField.cols === 3,
                  'col-span-4': formField.cols === 4,
                },
                defaultClassName,
                formField.styles
              )}
            >
              <FormField
                control={form.control}
                name={formField.name}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{formField.label}</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type={'number'}
                        placeholder={formField.placeholder}
                        disabled={formField.disabled}
                        className={cn('w-[100px]', formField.className)}
                        onChange={(e) =>
                          field.onChange({
                            ...e,
                            target: {
                              ...e.target,
                              value: Number(e.target.value),
                            },
                          })
                        }
                        onChangeCapture={(e) =>
                          formField.onChange?.(e.currentTarget.value)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          );
        }
        if (formField.as === 'color') {
          return (
            <div
              key={formField.name}
              className={cn(
                'w-full',
                {
                  'col-span-1': formField.cols === 1,
                  'col-span-2': formField.cols === 2,
                  'col-span-3': formField.cols === 3,
                  'col-span-4': formField.cols === 4,
                },
                defaultClassName,
                formField.styles
              )}
            >
              <FormField
                control={form.control}
                name={formField.name}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{formField.label}</FormLabel>
                    <FormControl>
                      <InputColor
                        {...field}
                        placeholder={formField.placeholder}
                        disabled={formField.disabled}
                        className={formField.className}
                        onChangeCapture={(e) =>
                          formField.onChange?.(e.currentTarget.value)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          );
        }
        if (formField.as === 'file') {
          return (
            <div
              key={formField.name}
              className={cn(
                'w-full',
                {
                  'col-span-1': formField.cols === 1,
                  'col-span-2': formField.cols === 2,
                  'col-span-3': formField.cols === 3,
                  'col-span-4': formField.cols === 4,
                },
                defaultClassName,
                formField.styles
              )}
            >
              <FormField
                control={form.control}
                name={formField.name}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{formField.label}</FormLabel>
                    <FormControl>
                      <InputFile
                        {...field}
                        type={formField.type}
                        placeholder={formField.placeholder}
                        disabled={formField.disabled}
                        className={formField.className}
                        onChangeCapture={(e) =>
                          formField.onChange?.(e.currentTarget.value)
                        }
                        customOptions={formField.customOptions}
                        handleUpload={(fileUrl) =>
                          field.onChange({
                            target: {
                              value: fileUrl,
                            },
                          })
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          );
        }
        if (formField.as === 'custom' && formField.custom) {
          return (
            <div
              key={formField.name}
              className={cn(
                'w-full',
                {
                  'col-span-1': formField.cols === 1,
                  'col-span-2': formField.cols === 2,
                  'col-span-3': formField.cols === 3,
                  'col-span-4': formField.cols === 4,
                },
                defaultClassName,
                formField.styles
              )}
            >
              <FormField
                control={form.control}
                name={formField.name}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{formField.label}</FormLabel>
                    <FormControl>{formField.custom?.()}</FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          );
        }

        return (
          <div
            key={formField.name}
            className={cn(
              'w-full',
              {
                'col-span-1': formField.cols === 1,
                'col-span-2': formField.cols === 2,
                'col-span-3': formField.cols === 3,
                'col-span-4': formField.cols === 4,
              },
              defaultClassName,
              formField.styles
            )}
          >
            <FormField
              control={form.control}
              name={formField.name}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{formField.label}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type={formField.type}
                      placeholder={formField.placeholder}
                      disabled={formField.disabled}
                      className={formField.className}
                      onChangeCapture={(e) =>
                        formField.onChange?.(e.currentTarget.value)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        );
      })}
    </>
  );
}
