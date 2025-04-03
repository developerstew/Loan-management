import { getLoans } from '@/app/_actions/loans';
import { LoanCardSkeleton } from '@/components/forms/loans/layout-skeleton';
import { LoanFilters } from '@/components/forms/loans/filters';
import { type Loan } from '@/types';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Link from 'next/link';
import { Suspense } from 'react';
import { Pagination } from '@/components/ui/pagination';
import { type LoanStatus } from '@prisma/client';

export const metadata = {
  title: 'Loans | Loan Management',
  description: 'View and manage your loans',
};

function LoadingLoans() {
  return (
    <div className='grid gap-4'>
      {Array.from({ length: 3 }).map((_, i) => (
        <LoanCardSkeleton key={i} />
      ))}
    </div>
  );
}

export default async function LoansPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const search =
    typeof searchParams.search === 'string' ? searchParams.search : '';
  const status =
    typeof searchParams.status === 'string' ? searchParams.status : '';
  const sort = typeof searchParams.sort === 'string' ? searchParams.sort : '';
  const page =
    typeof searchParams.page === 'string' ? parseInt(searchParams.page) : 1;
  const per_page =
    typeof searchParams.per_page === 'string'
      ? parseInt(searchParams.per_page)
      : 10;

  return (
    <div className='container mx-auto py-10'>
      <div className='mb-6 flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold'>Loans</h1>
          <p className='mt-1 text-muted-foreground'>
            Manage your active loans and applications
          </p>
        </div>
        <Button asChild>
          <Link href='/loans/create'>Create New Loan</Link>
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Active Loans</CardTitle>
          <CardDescription>
            A list of all your active loans and their current status.
          </CardDescription>
          <LoanFilters />
        </CardHeader>
        <CardContent>
          <Suspense fallback={<LoadingLoans />}>
            <LoanListContent
              search={search}
              status={status}
              sort={sort}
              page={page}
              per_page={per_page}
            />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}

async function LoanListContent({
  search,
  status,
  sort,
  page,
  per_page,
}: {
  search: string;
  status: string;
  sort: string;
  page: number;
  per_page: number;
}) {
  const { data, error } = await getLoans({
    search,
    status,
    sort,
    page,
    per_page,
  });

  if (error) {
    return (
      <div className='rounded-md border bg-destructive/10 p-4'>
        <p className='text-sm text-destructive'>{error}</p>
      </div>
    );
  }

  if (!data?.loans.length) {
    return (
      <div className='rounded-md border p-4'>
        <div className='text-sm text-muted-foreground'>
          No loans found. Create one to get started.
        </div>
      </div>
    );
  }

  return (
    <div className='space-y-4'>
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Borrower</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Interest Rate</TableHead>
              <TableHead>Term</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.loans.map((loan: Loan) => (
              <TableRow key={loan.id}>
                <TableCell>
                  <div>
                    <div className='font-medium'>{loan.borrowerName}</div>
                    <div className='text-sm text-muted-foreground'>
                      {loan.borrowerEmail}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  $
                  {loan.amount.toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                  })}
                </TableCell>
                <TableCell>{loan.interestRate}%</TableCell>
                <TableCell>{loan.term} months</TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${getStatusStyle(
                      loan.status,
                    )}`}
                  >
                    {loan.status}
                  </span>
                </TableCell>
                <TableCell>
                  {new Date(loan.startDate).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <div className='flex items-center gap-2'>
                    <Button variant='ghost' size='sm' asChild>
                      <Link href={`/loans/${loan.id}`}>View</Link>
                    </Button>
                    <Button variant='ghost' size='sm' asChild>
                      <Link href={`/loans/${loan.id}/edit`}>Edit</Link>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Pagination totalItems={data.total} itemsPerPage={per_page} />
    </div>
  );
}

import { getStatusStyle } from '@/constants';
