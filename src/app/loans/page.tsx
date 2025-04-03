import { getLoans } from '@/app/_actions/loans';
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

export default async function LoansPage() {
  const { data: loans, error } = await getLoans();

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
        </CardHeader>
        <CardContent>
          {error ? (
            <div className='rounded-md border p-4'>
              <div className='text-sm text-destructive'>{error}</div>
            </div>
          ) : !loans?.length ? (
            <div className='rounded-md border p-4'>
              <div className='text-sm text-muted-foreground'>
                No loans found. Create one to get started.
              </div>
            </div>
          ) : (
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
                  {loans.map((loan: Loan) => (
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
                          className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${getStatusStyle(loan.status)}`}
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
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function getStatusStyle(status: string) {
  switch (status) {
    case 'ACTIVE':
      return 'bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20';
    case 'PENDING':
      return 'bg-yellow-50 text-yellow-700 ring-1 ring-inset ring-yellow-600/20';
    case 'PAID':
      return 'bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-600/20';
    case 'DEFAULTED':
      return 'bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/20';
    case 'CANCELLED':
      return 'bg-gray-50 text-gray-700 ring-1 ring-inset ring-gray-600/20';
    default:
      return 'bg-gray-50 text-gray-700 ring-1 ring-inset ring-gray-600/20';
  }
}
