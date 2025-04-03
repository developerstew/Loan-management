'use client';

import { Button } from '@/components/ui/button';
import { Pencil } from 'lucide-react';
import Link from 'next/link';
import { useTransition } from 'react';

interface EditLoanButtonProps {
  loanId: string;
}

export function EditLoanButton({ loanId }: EditLoanButtonProps) {
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      variant='outline'
      size='icon'
      className='size-8'
      disabled={isPending}
      onClick={() => startTransition(() => {})}
      asChild
    >
      <Link href={`/loans/${loanId}/edit`}>
        <Pencil className={`size-4 ${isPending ? 'animate-spin' : ''}`} />
      </Link>
    </Button>
  );
}
