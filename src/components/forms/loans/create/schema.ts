import * as z from 'zod';

export const loanFormSchema = z.object({
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
  description: z.string().optional(),
});

export type LoanFormValues = z.infer<typeof loanFormSchema>;
