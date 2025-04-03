'use client';

import { createLoan } from '@/app/_actions/loans';
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
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { loanFormSchema, type LoanFormValues } from './schema';

export function CreateLoanForm() {
  const form = useForm<LoanFormValues>({
    resolver: zodResolver(loanFormSchema),
    defaultValues: {
      borrowerName: '',
      borrowerEmail: '',
      amount: '',
      interestRate: '',
      term: '',
      startDate: '',
      description: '',
    },
  });

  async function onSubmit(values: LoanFormValues) {
    try {
      console.log('Form values:', values);

      const loanData = {
        ...values,
        amount: parseFloat(values.amount),
        interestRate: parseFloat(values.interestRate),
        term: parseInt(values.term),
        startDate: new Date(values.startDate),
        endDate: new Date(
          new Date(values.startDate).setMonth(
            new Date(values.startDate).getMonth() + parseInt(values.term),
          ),
        ),
      };

      console.log('Processed loan data:', loanData);

      const { error } = await createLoan(loanData);

      if (error) {
        console.error('Server error:', error);
        form.setError('root', {
          type: 'manual',
          message: error,
        });
        return;
      }

      // Reset form and redirect to loans list
      form.reset();
      window.location.href = '/loans';
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
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
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
          <Button type='submit' disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? 'Creating...' : 'Create Loan'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
