'use client';

import { type Loan } from '@/types';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';
import { useState } from 'react';

interface ViewLoanButtonProps {
  loan: Loan;
}

export function ViewLoanButton({ loan }: ViewLoanButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant='outline'
          size='icon'
          className='size-8'
          aria-label='View loan details'
        >
          <Eye className='size-4' />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Loan Details</DialogTitle>
          <DialogDescription>
            Details for loan to {loan.borrowerName}
          </DialogDescription>
        </DialogHeader>
        <div className='grid gap-4'>
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <div className='text-sm font-medium text-muted-foreground'>
                Borrower
              </div>
              <div className='font-medium'>{loan.borrowerName}</div>
              <div className='text-sm text-muted-foreground'>
                {loan.borrowerEmail}
              </div>
            </div>
            <div>
              <div className='text-sm font-medium text-muted-foreground'>
                Amount
              </div>
              <div className='font-medium'>
                $
                {loan.amount.toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                })}
              </div>
            </div>
          </div>
          <div className='grid grid-cols-3 gap-4'>
            <div>
              <div className='text-sm font-medium text-muted-foreground'>
                Interest Rate
              </div>
              <div className='font-medium'>{loan.interestRate}%</div>
            </div>
            <div>
              <div className='text-sm font-medium text-muted-foreground'>
                Term
              </div>
              <div className='font-medium'>{loan.term} months</div>
            </div>
            <div>
              <div className='text-sm font-medium text-muted-foreground'>
                Status
              </div>
              <div className='font-medium'>{loan.status}</div>
            </div>
          </div>
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <div className='text-sm font-medium text-muted-foreground'>
                Start Date
              </div>
              <div className='font-medium'>
                {new Date(loan.startDate).toLocaleDateString()}
              </div>
            </div>
            <div>
              <div className='text-sm font-medium text-muted-foreground'>
                End Date
              </div>
              <div className='font-medium'>
                {new Date(loan.endDate).toLocaleDateString()}
              </div>
            </div>
          </div>
          {loan.description && (
            <div>
              <div className='text-sm font-medium text-muted-foreground'>
                Description
              </div>
              <div className='text-sm'>{loan.description}</div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
