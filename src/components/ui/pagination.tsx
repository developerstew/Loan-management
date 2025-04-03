'use client';

import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useTransition } from 'react';

interface PaginationProps {
  totalItems: number;
  itemsPerPage?: number;
}

export function Pagination({ totalItems, itemsPerPage = 10 }: PaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const page = Number(searchParams?.get('page')) || 1;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const createQueryString = useCallback(
    (params: Record<string, string | null>) => {
      const newSearchParams = new URLSearchParams(searchParams?.toString());

      for (const [key, value] of Object.entries(params)) {
        if (value === null) {
          newSearchParams.delete(key);
        } else {
          newSearchParams.set(key, value);
        }
      }

      return newSearchParams.toString();
    },
    [searchParams],
  );

  const updatePage = useCallback(
    (newPage: number) => {
      startTransition(() => {
        router.push(
          `${pathname}?${createQueryString({
            page: newPage.toString(),
          })}`,
          {
            scroll: false,
          },
        );
      });
    },
    [pathname, router, createQueryString],
  );

  return (
    <div className='flex items-center justify-between px-2'>
      <div className='flex items-center gap-2 text-sm text-muted-foreground'>
        <div>
          Items {Math.min((page - 1) * itemsPerPage + 1, totalItems)} -{' '}
          {Math.min(page * itemsPerPage, totalItems)} of {totalItems}
        </div>
        <Select
          defaultValue={itemsPerPage.toString()}
          onValueChange={(value) => {
            router.push(
              `${pathname}?${createQueryString({
                per_page: value,
                page: '1',
              })}`,
              {
                scroll: false,
              },
            );
          }}
        >
          <SelectTrigger className='h-8 w-[70px]'>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='5'>5</SelectItem>
            <SelectItem value='10'>10</SelectItem>
            <SelectItem value='20'>20</SelectItem>
            <SelectItem value='50'>50</SelectItem>
          </SelectContent>
        </Select>
        <div>per page</div>
      </div>
      <div className='flex items-center gap-2'>
        <Button
          variant='outline'
          size='icon'
          className='size-8'
          disabled={page <= 1}
          onClick={() => updatePage(page - 1)}
        >
          <ChevronLeft className='size-4' />
        </Button>
        <div className='flex items-center gap-1 text-sm'>
          <div>Page</div>
          <div className='font-medium'>{page}</div>
          <div>of</div>
          <div className='font-medium'>{totalPages}</div>
        </div>
        <Button
          variant='outline'
          size='icon'
          className='size-8'
          disabled={page >= totalPages}
          onClick={() => updatePage(page + 1)}
        >
          <ChevronRight className='size-4' />
        </Button>
      </div>
    </div>
  );
}
