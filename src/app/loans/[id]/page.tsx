'use client';

import { getLoanById } from '@/app/_actions/loans';
import { StateMessage } from '@/components/feedback/state-message';
import { LoanDetailSkeleton } from '@/components/forms/loans/layout-skeleton';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Suspense } from 'react';

interface LoanDetailPageProps {
  params: Promise<{
    id: string;
  }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default function LoanDetailPage({ params }: LoanDetailPageProps) {
  return (
    <div className='container mx-auto py-10'>
      <Suspense fallback={<LoanDetailSkeleton />}>
        <LoanDetailContent params={params} />
      </Suspense>
    </div>
  );
}

async function LoanDetailContent({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const { data: loan, error } = await getLoanById(resolvedParams.id);

  if (error) {
    return (
      <StateMessage
        message={error}
        variant='error'
        action={{
          type: 'button',
          onClick: () => window.location.reload(),
          label: 'Try Again',
        }}
      />
    );
  }

  if (!loan) {
    return (
      <StateMessage
        message='Loan not found.'
        variant='empty'
        action={{
          type: 'link',
          label: 'View All Loans',
          href: '/loans',
        }}
      />
    );
  }

  const monthlyPayment =
    (loan.amount * (loan.interestRate / 1200)) /
    (1 - Math.pow(1 + loan.interestRate / 1200, -loan.term));
  const endDate = new Date(loan.startDate);
  endDate.setMonth(endDate.getMonth() + loan.term);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card>
        <CardHeader>
          <div className='flex items-center justify-between'>
            <div>
              <CardTitle>Loan Details</CardTitle>
              <CardDescription>
                View and manage loan information
              </CardDescription>
            </div>
            <div className='flex gap-4'>
              <Button variant='outline' asChild>
                <Link href={`/loans/${resolvedParams.id}/edit`}>Edit Loan</Link>
              </Button>
              <Button variant='ghost' asChild>
                <Link href='/loans'>Back to Loans</Link>
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-2 gap-6'>
            <div className='space-y-4'>
              <div>
                <h3 className='text-sm font-medium text-muted-foreground'>
                  Borrower Information
                </h3>
                <div className='mt-2 space-y-2'>
                  <p className='text-lg font-medium'>{loan.borrowerName}</p>
                  <p className='text-sm text-muted-foreground'>
                    {loan.borrowerEmail}
                  </p>
                </div>
              </div>
              <div>
                <h3 className='text-sm font-medium text-muted-foreground'>
                  Loan Terms
                </h3>
                <div className='mt-2 grid grid-cols-2 gap-4'>
                  <div>
                    <p className='text-sm text-muted-foreground'>Amount</p>
                    <p className='text-lg font-medium'>
                      $
                      {loan.amount.toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                      })}
                    </p>
                  </div>
                  <div>
                    <p className='text-sm text-muted-foreground'>
                      Interest Rate
                    </p>
                    <p className='text-lg font-medium'>{loan.interestRate}%</p>
                  </div>
                  <div>
                    <p className='text-sm text-muted-foreground'>Term Length</p>
                    <p className='text-lg font-medium'>{loan.term} months</p>
                  </div>
                  <div>
                    <p className='text-sm text-muted-foreground'>Status</p>
                    <p
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${loan.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}
                    >
                      {loan.status.toLowerCase()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className='space-y-4'>
              <div>
                <h3 className='text-sm font-medium text-muted-foreground'>
                  Payment Schedule
                </h3>
                <div className='mt-2 space-y-2'>
                  <div className='flex justify-between border-b py-2'>
                    <span>Monthly Payment</span>
                    <span className='font-medium'>
                      $
                      {monthlyPayment.toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                  <div className='flex justify-between border-b py-2'>
                    <span>Start Date</span>
                    <span className='font-medium'>
                      {new Date(loan.startDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className='flex justify-between border-b py-2'>
                    <span>End Date</span>
                    <span className='font-medium'>
                      {endDate.toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
