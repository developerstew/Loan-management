'use client';

import { Button } from '@/components/ui/button';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className='container mx-auto py-10'>
      <div className='rounded-md border bg-destructive/10 p-6'>
        <h2 className='mb-4 text-xl font-semibold'>Something went wrong!</h2>
        <p className='mb-4 text-sm text-muted-foreground'>
          {error.message || 'Failed to load loans. Please try again.'}
        </p>
        <Button onClick={() => reset()}>Try again</Button>
      </div>
    </div>
  );
}
