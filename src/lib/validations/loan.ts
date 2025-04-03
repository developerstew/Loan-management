import { z } from 'zod';

const baseLoanSchema = z.object({
  amount: z.number().positive('Amount must be positive'),
  interestRate: z.number().min(0, 'Interest rate must be 0 or greater'),
  term: z.number().positive('Term must be positive'),
  borrowerName: z.string().min(1, 'Borrower name is required'),
  borrowerEmail: z.string().email('Invalid email address'),
  description: z.string().optional(),
  startDate: z.date(),
  endDate: z.date(),
});

export const createLoanSchema = baseLoanSchema.refine(
  (data) => data.endDate > data.startDate,
  {
    message: 'End date must be after start date',
    path: ['endDate'],
  },
);

export const updateLoanSchema = baseLoanSchema.partial().refine(
  (data) => {
    if (data.startDate && data.endDate) {
      return data.endDate > data.startDate;
    }
    return true;
  },
  {
    message: 'End date must be after start date',
    path: ['endDate'],
  },
);
