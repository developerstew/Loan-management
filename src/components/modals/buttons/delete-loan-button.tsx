'use client';

import { deleteLoan } from '@/app/_actions/loans';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';

interface DeleteLoanButtonProps {
  loanId: string;
  borrowerName: string;
}

export function DeleteLoanButton({
  loanId,
  borrowerName,
}: DeleteLoanButtonProps) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleDelete = () => {
    startTransition(async () => {
      const response = await deleteLoan(loanId);
      if (response.error) {
        // TODO: Add toast notification
        console.error('Failed to delete loan:', response.error);
      } else {
        setOpen(false);
        router.refresh();
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant='outline'
          size='icon'
          className='size-8'
          aria-label='Delete loan'
        >
          <Trash2 className='size-4' />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Loan</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete the loan for {borrowerName}? This
            action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant='outline'
            onClick={() => setOpen(false)}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button
            variant='destructive'
            onClick={handleDelete}
            disabled={isPending}
          >
            {isPending ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
