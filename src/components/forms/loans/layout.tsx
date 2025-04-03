'use client';

import { createLoan, updateLoan } from '@/app/_actions/loans';
import { Button } from '@/components/ui/button';
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
import { useRouter } from 'next/navigation';
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
  onSubmit?: (values: LoanFormValues) => void;
  submitButton?: React.ReactNode;
}

export function LoanForm({ loan, onSubmit, submitButton }: LoanFormProps) {
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
      // Create a single object with all form data
      const formData = new FormData();
      const startDate = new Date(values.startDate);
      const endDate = new Date(startDate);
      endDate.setMonth(startDate.getMonth() + parseInt(values.term));

      // Use Object.entries to efficiently append all fields
      Object.entries({
        ...values,
        endDate: endDate.toISOString().split('T')[0],
      }).forEach(([key, value]) => {
        // Only append if value exists and is not empty string (unless it's description)
        if (value !== undefined && (value !== '' || key === 'description')) {
          formData.append(key, value?.toString() ?? '');
        }
      });

      // Use server action with error handling
      const response = loan
        ? await updateLoan(loan.id, formData)
        : await createLoan(formData);

      if (!response) {
        throw new Error('No response from server');
      }

      // Handle validation errors efficiently
      if (response.validationErrors) {
        Object.entries(response.validationErrors).forEach(
          ([field, [error]]) => {
            form.setError(field as keyof LoanFormValues, {
              type: 'manual',
              message: error,
            });
          },
        );
        return;
      }

      if (response.error) {
        console.error('Server error:', response.error);
        form.setError('root', {
          type: 'manual',
          message: response.error,
        });
        return;
      }

      if (!response.data) {
        throw new Error('No data returned from server');
      }

      // Reset form and redirect to loans list
      router.push('/loans');
      router.refresh();
    } catch (error) {
      console.error('Client error:', error);
      form.setError('root', {
        type: 'manual',
        message: 'Something went wrong. Please try again.',
      });
    }
  }

  return (
    <Form {...form}>
      <form
        action={async (formData: FormData) => {
          // Use the native form action for progressive enhancement
          if (onSubmit) {
            const values = Object.fromEntries(
              formData.entries(),
            ) as unknown as LoanFormValues;
            await onSubmit(values);
          } else {
            await handleFormSubmit(form.getValues());
          }
        }}
        className='space-y-8'
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
        {form.formState.errors.root && (
          <div className='rounded-md bg-destructive/15 p-3 text-sm text-destructive'>
            {form.formState.errors.root.message}
          </div>
        )}
        <div className='flex justify-end space-x-4'>
          {submitButton || (
            <Button type='submit' disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting
                ? 'Saving...'
                : loan
                  ? 'Update Loan'
                  : 'Create Loan'}
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}
