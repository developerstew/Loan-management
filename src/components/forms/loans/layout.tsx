'use client';

import { createLoan, updateLoan } from '@/app/_actions/loans';
import { Button } from '@/components/ui/button';
import { useTransition } from 'react';
import { type ReactElement } from 'react';
import { useRouter } from 'next/navigation';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { type Loan } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const loanFormSchema = z.object({
  borrowerName: z.string().min(2, {
    message: 'Borrower name must be at least 2 characters.',
  }),
  borrowerEmail: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  amount: z.string().regex(/^\d+(\.\d{1,2})?$/, {
    message: 'Please enter a valid amount (e.g., 1000.00)',
  }),
  interestRate: z.string().regex(/^\d+(\.\d{1,2})?$/, {
    message: 'Please enter a valid interest rate (e.g., 5.00)',
  }),
  term: z.string().regex(/^\d+$/, {
    message: 'Please enter a valid term in months.',
  }),
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'Please enter a valid date (YYYY-MM-DD)',
  }),
  description: z
    .string()
    .transform((val) => (val === '' ? undefined : val))
    .optional(),
});

export type LoanFormValues = z.infer<typeof loanFormSchema>;

interface LoanFormProps {
  loan?: Loan;
}

export function LoanForm({ loan }: LoanFormProps): ReactElement {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm<LoanFormValues>({
    resolver: zodResolver(loanFormSchema),
    defaultValues: {
      borrowerName: loan?.borrowerName ?? '',
      borrowerEmail: loan?.borrowerEmail ?? '',
      amount: loan?.amount?.toString() ?? '',
      interestRate: loan?.interestRate?.toString() ?? '',
      term: loan?.term?.toString() ?? '',
      startDate: loan?.startDate
        ? new Date(loan.startDate).toISOString().split('T')[0]
        : '',
      description: loan?.description ?? '',
    },
  });

  async function handleFormSubmit(values: LoanFormValues) {
    try {
      const formData = new FormData();
      const startDate = new Date(values.startDate);
      const endDate = new Date(startDate);
      endDate.setMonth(startDate.getMonth() + parseInt(values.term));

      Object.entries({
        ...values,
        endDate: endDate.toISOString().split('T')[0],
      }).forEach(([key, value]) => {
        if (value !== undefined && (value !== '' || key === 'description')) {
          formData.append(key, value?.toString() ?? '');
        }
      });

      startTransition(async () => {
        try {
          if (loan) {
            const { error } = await updateLoan(formData, loan.id);
            if (error) {
              form.setError('root', { message: error });
              return;
            }
          } else {
            const { error } = await createLoan(formData);
            if (error) {
              form.setError('root', { message: error });
              return;
            }
          }
          router.push('/loans');
          router.refresh();
        } catch (error) {
          console.error('Server error:', error);
          form.setError('root', { message: 'Something went wrong' });
        }
      });
    } catch (error) {
      console.error('Client error:', error);
      form.setError('root', { message: 'Something went wrong' });
    }
  }

  return (
    <Form {...form}>
      <form
        className='space-y-8'
        onSubmit={form.handleSubmit(handleFormSubmit)}
        noValidate
      >
        <div className='grid grid-cols-2 gap-6'>
          <FormField
            control={form.control}
            name='borrowerName'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Borrower Name</FormLabel>
                <FormControl>
                  <Input placeholder='John Doe' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='borrowerEmail'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Borrower Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder='john.doe@example.com'
                    type='email'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='amount'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Loan Amount</FormLabel>
                <FormControl>
                  <Input placeholder='10000.00' {...field} />
                </FormControl>
                <FormDescription>Enter the amount in dollars</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='interestRate'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Interest Rate (%)</FormLabel>
                <FormControl>
                  <Input placeholder='5.00' {...field} />
                </FormControl>
                <FormDescription>
                  Enter the annual interest rate
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='term'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Term (Months)</FormLabel>
                <FormControl>
                  <Input placeholder='12' {...field} />
                </FormControl>
                <FormDescription>Enter the loan term in months</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='startDate'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start Date</FormLabel>
                <FormControl>
                  <Input type='date' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem className='col-span-2'>
                <FormLabel>Description (Optional)</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Add any additional notes about the loan'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {form.formState.errors.root?.message && (
          <div className='rounded-md bg-destructive/15 p-3 text-sm text-destructive'>
            {form.formState.errors.root.message}
          </div>
        )}
        <div className='flex justify-end space-x-4'>
          <Button type='submit' loading={isPending}>
            {loan ? 'Update Loan' : 'Create Loan'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
