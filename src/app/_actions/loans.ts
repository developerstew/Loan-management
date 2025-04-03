'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export type CreateLoanInput = {
  amount: number;
  interestRate: number;
  term: number;
  borrowerName: string;
  borrowerEmail: string;
  description?: string;
  startDate: Date;
  endDate: Date;
};

export async function createLoan(data: CreateLoanInput) {
  try {
    console.log('Creating loan with data:', JSON.stringify(data, null, 2));

    const loan = await prisma.loan.create({
      data: {
        ...data,
        status: 'PENDING',
      },
    });

    console.log('Loan created successfully:', JSON.stringify(loan, null, 2));
    revalidatePath('/loans');
    return { data: loan };
  } catch (error) {
    console.error('Error creating loan:', error);
    if (error instanceof Error) {
      return { error: `Failed to create loan: ${error.message}` };
    }
    return { error: 'Failed to create loan: Unknown error' };
  }
}

export async function getLoans() {
  try {
    const loans = await prisma.loan.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return { data: loans };
  } catch (error) {
    return { error: 'Failed to fetch loans' };
  }
}

export async function getLoanById(id: string) {
  try {
    const loan = await prisma.loan.findUnique({
      where: { id },
      include: {
        payments: true,
        documents: true,
      },
    });
    if (!loan) {
      return { error: 'Loan not found' };
    }
    return { data: loan };
  } catch (error) {
    return { error: 'Failed to fetch loan' };
  }
}

export async function updateLoan(id: string, data: Partial<CreateLoanInput>) {
  try {
    const loan = await prisma.loan.update({
      where: { id },
      data,
    });
    revalidatePath('/loans');
    revalidatePath(`/loans/${id}`);
    return { data: loan };
  } catch (error) {
    return { error: 'Failed to update loan' };
  }
}

export async function deleteLoan(id: string) {
  try {
    await prisma.loan.delete({
      where: { id },
    });
    revalidatePath('/loans');
    return { success: true };
  } catch (error) {
    return { error: 'Failed to delete loan' };
  }
}
