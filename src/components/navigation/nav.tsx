import Link from 'next/link';
import { Button } from '../ui/button';

export function Nav() {
  return (
    <header className='border-b'>
      <div className='container mx-auto flex h-16 items-center px-4'>
        <Link href='/loans' className='font-bold'>
          Loan Management
        </Link>
        <nav className='ml-auto flex gap-4'>
          <Button variant='ghost' asChild>
            <Link href='/loans'>Loans</Link>
          </Button>
          <Button asChild>
            <Link href='/loans/create'>New Loan</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
