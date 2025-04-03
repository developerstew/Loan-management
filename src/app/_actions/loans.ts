'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { log } from '@/lib/logger';

import { createLoanSchema, updateLoanSchema } from '@/lib/validations/loan';
import { type Loan } from '@prisma/client';

export type ActionResponse<T> = {
  data?: T;
  error?: string;
  validationErrors?: Record<string, string[]>;
};

export async function createLoan(
  formData: FormData,
): Promise<ActionResponse<Loan>> {
  try {
    const data = {
      amount: Number(formData.get('amount')),
      interestRate: Number(formData.get('interestRate')),
      term: Number(formData.get('term')),
      borrowerName: formData.get('borrowerName') as string,
      borrowerEmail: formData.get('borrowerEmail') as string,
      description: formData.get('description') as string,
      startDate: new Date(formData.get('startDate') as string),
      endDate: new Date(formData.get('endDate') as string),
    };

    const validationResult = createLoanSchema.safeParse(data);

    if (!validationResult.success) {
      return {
        validationErrors: validationResult.error.flatten().fieldErrors,
      };
    }

    log.info('Creating loan', { data });

    const loan = await prisma.loan.create({
      data: {
        ...validationResult.data,
        status: 'PENDING',
      },
    });

    log.info('Loan created successfully', { loanId: loan.id });
    revalidatePath('/loans');
    return { data: loan };
  } catch (error) {
    log.error('Failed to create loan', error);
    return { error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export async function getLoans(): Promise<ActionResponse<Loan[]>> {
  try {
    log.info('Fetching loans');

    const loans = await prisma.loan.findMany({
      orderBy: { createdAt: 'desc' },
    });

    log.info('Successfully fetched loans', { count: loans.length });
    return { data: loans };
  } catch (error) {
    log.error('Failed to fetch loans', error);
    return { error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export async function getLoanById(id: string): Promise<ActionResponse<Loan>> {
  try {
    log.info('Fetching loan by id', { id });

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

    log.info('Successfully fetched loan', { loanId: loan.id });
    return { data: loan };
  } catch (error) {
    log.error('Failed to fetch loan', error);
    return { error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export async function updateLoan(
  id: string,
  formData: FormData,
): Promise<ActionResponse<Loan>> {
  try {
    const data = {
      amount: formData.get('amount')
        ? Number(formData.get('amount'))
        : undefined,
      interestRate: formData.get('interestRate')
        ? Number(formData.get('interestRate'))
        : undefined,
      term: formData.get('term') ? Number(formData.get('term')) : undefined,
      borrowerName: formData.get('borrowerName') as string | undefined,
      borrowerEmail: formData.get('borrowerEmail') as string | undefined,
      description: formData.get('description') as string | undefined,
      startDate: formData.get('startDate')
        ? new Date(formData.get('startDate') as string)
        : undefined,
      endDate: formData.get('endDate')
        ? new Date(formData.get('endDate') as string)
        : undefined,
    };

    const validationResult = updateLoanSchema.safeParse(data);

    if (!validationResult.success) {
      return {
        validationErrors: validationResult.error.flatten().fieldErrors,
      };
    }

    log.info('Updating loan', { id, data });

    const loan = await prisma.loan.update({
      where: { id },
      data: validationResult.data,
    });

    log.info('Successfully updated loan', { loanId: loan.id });
    revalidatePath('/loans');
    revalidatePath(`/loans/${id}`);
    return { data: loan };
  } catch (error) {
    log.error('Failed to update loan', error);
    return { error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export async function deleteLoan(
  id: string,
): Promise<ActionResponse<{ success: true }>> {
  try {
    log.info('Deleting loan', { id });

    await prisma.loan.delete({
      where: { id },
    });

    log.info('Successfully deleted loan', { id });
    revalidatePath('/loans');
    return { data: { success: true } };
  } catch (error) {
    log.error('Failed to delete loan', error);
    return { error: error instanceof Error ? error.message : 'Unknown error' };
  }
}
