import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';

interface LoanDetailPageProps {
  params: Promise<{
    id: string;
  }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function LoanDetailPage({ params }: LoanDetailPageProps) {
  const resolvedParams = await params;
  return (
    <div className='container mx-auto py-10'>
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
                  <p className='text-lg font-medium'>John Doe</p>
                  <p className='text-sm text-muted-foreground'>
                    john.doe@example.com
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
                    <p className='text-lg font-medium'>$10,000</p>
                  </div>
                  <div>
                    <p className='text-sm text-muted-foreground'>
                      Interest Rate
                    </p>
                    <p className='text-lg font-medium'>5%</p>
                  </div>
                  <div>
                    <p className='text-sm text-muted-foreground'>Term Length</p>
                    <p className='text-lg font-medium'>12 months</p>
                  </div>
                  <div>
                    <p className='text-sm text-muted-foreground'>Status</p>
                    <p className='inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800'>
                      Active
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
                    <span className='font-medium'>$856.07</span>
                  </div>
                  <div className='flex justify-between border-b py-2'>
                    <span>Start Date</span>
                    <span className='font-medium'>April 1, 2024</span>
                  </div>
                  <div className='flex justify-between border-b py-2'>
                    <span>End Date</span>
                    <span className='font-medium'>April 1, 2025</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
