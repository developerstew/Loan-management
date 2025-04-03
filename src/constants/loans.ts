import { LoanStatus } from '@prisma/client';

export const LOAN_STATUSES: Record<LoanStatus, string> = {
  PENDING: 'Pending',
  ACTIVE: 'Active',
  PAID: 'Paid',
  DEFAULTED: 'Defaulted',
  CANCELLED: 'Cancelled',
} as const;

export const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest first' },
  { value: 'borrower_asc', label: 'Borrower (A-Z)' },
  { value: 'borrower_desc', label: 'Borrower (Z-A)' },
  { value: 'amount_asc', label: 'Amount (low to high)' },
  { value: 'amount_desc', label: 'Amount (high to low)' },
  { value: 'rate_asc', label: 'Interest rate (low to high)' },
  { value: 'rate_desc', label: 'Interest rate (high to low)' },
  { value: 'term_asc', label: 'Term (shortest first)' },
  { value: 'term_desc', label: 'Term (longest first)' },
  { value: 'status_asc', label: 'Status (A-Z)' },
  { value: 'status_desc', label: 'Status (Z-A)' },
  { value: 'start_date_asc', label: 'Start date (oldest first)' },
  { value: 'start_date_desc', label: 'Start date (newest first)' },
] as const;

export type SortOption = (typeof SORT_OPTIONS)[number]['value'];

export const getStatusStyle = (status: LoanStatus): string => {
  switch (status) {
    case 'PENDING':
      return 'bg-yellow-100 text-yellow-800 ring-1 ring-inset ring-yellow-600/20';
    case 'ACTIVE':
      return 'bg-green-100 text-green-800 ring-1 ring-inset ring-green-600/20';
    case 'PAID':
      return 'bg-blue-100 text-blue-800 ring-1 ring-inset ring-blue-600/20';
    case 'DEFAULTED':
      return 'bg-red-100 text-red-800 ring-1 ring-inset ring-red-600/20';
    case 'CANCELLED':
      return 'bg-gray-100 text-gray-800 ring-1 ring-inset ring-gray-600/20';
    default:
      return 'bg-gray-100 text-gray-800 ring-1 ring-inset ring-gray-600/20';
  }
};
