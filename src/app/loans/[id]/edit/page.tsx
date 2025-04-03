import { getLoanById } from '@/app/_actions/loans';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { LoanForm } from '@/components/forms/loans/layout';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface EditLoanPageProps {
  params: Promise<{
    id: string;
  }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function EditLoanPage({ params }: EditLoanPageProps) {
  const resolvedParams = await params;
  const { data: loan, error } = await getLoanById(resolvedParams.id);

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
              <Link href='/loans'>Cancel</Link>
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
