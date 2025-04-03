'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import Link from 'next/link';

type StateVariant = 'empty' | 'error' | 'success' | 'warning';

type StateAction =
  | { type: 'link'; href: string; label: string }
  | { type: 'button'; onClick: () => void; label: string };

interface StateMessageProps {
  message: string;
  variant?: StateVariant;
  action?: StateAction;
  className?: string;
}

const variantStyles: Record<StateVariant, string> = {
  empty: 'border bg-background',
  error: 'border bg-destructive/10 text-destructive',
  success: 'border bg-success/10 text-success',
  warning: 'border bg-warning/10 text-warning',
};

const buttonVariantStyles: Record<StateVariant, string> = {
  empty: 'hover:bg-accent',
  error: 'text-destructive hover:text-destructive/90 hover:bg-destructive/10',
  success: 'text-success hover:text-success/90 hover:bg-success/10',
  warning: 'text-warning hover:text-warning/90 hover:bg-warning/10',
};

export function StateMessage({
  message,
  variant = 'empty',
  action,
  className,
}: StateMessageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn('rounded-md p-4', variantStyles[variant], className)}
    >
      <div className='flex items-center justify-between gap-4'>
        <p className='text-sm'>{message}</p>
        {action && (
          <Button
            variant='ghost'
            size='sm'
            className={buttonVariantStyles[variant]}
            {...(action.type === 'link'
              ? { asChild: true }
              : { onClick: (action as { onClick: () => void }).onClick })}
          >
            {action.type === 'link' ? (
              <Link href={action.href}>{action.label}</Link>
            ) : (
              action.label
            )}
          </Button>
        )}
      </div>
    </motion.div>
  );
}
