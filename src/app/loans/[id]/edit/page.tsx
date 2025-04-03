import { getLoanById } from '@/app/_actions/loans';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { LoanForm } from '@/components/loan-form';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface EditLoanPageProps {
  params: {
    id: string;
  };
}

export default async function EditLoanPage({ params }: EditLoanPageProps) {
  const { data: loan, error } = await getLoanById(params.id);

  if (error || !loan) {
    notFound();
  }

  return (
    <div className='container mx-auto py-10'>
      <Card>
        <CardHeader>
          <div className='flex items-center justify-between'>
            <div>
              <CardTitle>Edit Loan</CardTitle>
              <CardDescription>Update the loan details below</CardDescription>
            </div>
            <Button variant='ghost' asChild>
              <Link href={`/loans/${params.id}`}>Cancel</Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <LoanForm loan={loan} />
        </CardContent>
      </Card>
    </div>
  );
}
