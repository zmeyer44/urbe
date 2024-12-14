'use client';
import { useModal } from '@repo/design-system/components/modal';
import { Template } from '@repo/design-system/components/modal/template';
import { Button } from '@repo/design-system/components/ui/button';
import type { ComponentProps } from 'react';
type ConfirmModalProps = {
  title: string;
  description?: string;
  children?: React.ReactNode;
  onConfirm: () => void;
  buttonProps?: ComponentProps<typeof Button>;
};
export function ConfirmModal({
  title,
  description,
  children,
  onConfirm,
  buttonProps = {},
}: ConfirmModalProps) {
  const modal = useModal();
  return (
    <Template
      title={title}
      footer={
        <div className="flex items-center justify-end gap-x-3">
          <Button onClick={() => modal?.hide()} variant={'outline'}>
            Cancel
          </Button>

          <Button onClick={onConfirm} {...buttonProps}>
            Confirm
          </Button>
        </div>
      }
    >
      {children ? (
        children
      ) : (
        <div className="center relative w-full">
          <p className="text-muted-foreground">{description}</p>
        </div>
      )}
    </Template>
  );
}
