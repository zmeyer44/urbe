'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormElements } from '@repo/design-system/components/form/form-elements';
import {
  FormFooter,
  Template,
} from '@repo/design-system/components/modal/template';
import { Spinner } from '@repo/design-system/components/ui/spinner';
import { useState } from 'react';
import type { ComponentProps } from 'react';
import { Form, useForm } from 'react-hook-form';
import type { DefaultValues, FieldErrors, FieldValues } from 'react-hook-form';
import type { z } from 'zod';
import { Button } from '../../ui/button';
import { FormRootError } from '../../ui/form';
import { type ModalContextProps, useModal } from '../provider';
type FormModalProps<TSchema extends FieldValues, TSuccess> = Pick<
  ComponentProps<typeof FormElements<TSchema>>,
  'fields'
> & {
  title: string;
  errors?: FieldErrors;
  cta: {
    text: string;
    variant?: 'default' | 'destructive' | 'brand';
  };
  defaultValues?: DefaultValues<TSchema>;
  onSubmit: (props: TSchema) => Promise<TSuccess>;
  formSchema: z.Schema<TSchema>;
  onSuccess: (
    successData: TSuccess,
    modal: ModalContextProps | undefined
  ) => void;
  loading?: boolean;
};
export function FormModal<TSchema extends FieldValues, TSuccess = unknown>({
  title,
  fields,
  cta,
  errors,
  formSchema,
  defaultValues,
  onSubmit,
  onSuccess,
  loading,
}: FormModalProps<TSchema, TSuccess>) {
  const modal = useModal();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<TSchema>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  async function submitWrapper(props: TSchema) {
    setIsSubmitting(true);
    try {
      const resposne = await onSubmit(props);
      onSuccess(resposne, modal);
    } catch (err) {
      console.log('Error in form', err);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (loading) {
    return (
      <Template title={title}>
        <div className="center relative w-full">
          <Spinner size={30} />
        </div>
      </Template>
    );
  }
  return (
    <Template title={title}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submitWrapper)} className="grid">
          <FormElements form={form} fields={fields} />
          <FormRootError />
          <FormFooter>
            <Button
              type="submit"
              className="w-full"
              loading={isSubmitting}
              disabled={isSubmitting}
            >
              {cta.text}
            </Button>
          </FormFooter>
        </form>
      </Form>
    </Template>
  );
}
