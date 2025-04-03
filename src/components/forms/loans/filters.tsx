'use client';

import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useTransition } from 'react';
import { debounce } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { LOAN_STATUSES, SORT_OPTIONS } from '@/constants';

export function LoanFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

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

  const handleStatusChange = useCallback(
    (value: string) => {
      startTransition(() => {
        const params =
          value === 'all'
            ? { status: null, page: null }
            : { status: value, page: null };
        const queryString = createQueryString(params);
        router.push(`${pathname}${queryString ? `?${queryString}` : ''}`, {
          scroll: false,
        });
      });
    },
    [pathname, router, createQueryString],
  );

  const handleSearch = useCallback(
    (value: string) => {
      startTransition(() => {
        const params = { search: value || null, page: null };
        const queryString = createQueryString(params);
        router.push(`${pathname}${queryString ? `?${queryString}` : ''}`, {
          scroll: false,
        });
      });
    },
    [pathname, router, createQueryString],
  );

  // Create a type-safe debounced function
  const debouncedSearch = debounce((value: unknown) => {
    if (typeof value === 'string') {
      handleSearch(value);
    }
  }, 500);

  return (
    <div className='flex items-center gap-4'>
      <div className='flex-1'>
        <div className='relative max-w-xs'>
          <Input
            placeholder='Search loans...'
            className='pr-8'
            defaultValue={searchParams?.get('search') ?? ''}
            onChange={(e) => debouncedSearch(e.target.value)}
          />
          {isPending && (
            <div className='absolute right-2 top-2.5'>
              <Loader2 className='size-4 animate-spin text-muted-foreground' />
            </div>
          )}
        </div>
      </div>
      <Select
        defaultValue={searchParams?.get('status') ?? 'all'}
        onValueChange={handleStatusChange}
        disabled={isPending}
      >
        <SelectTrigger className='w-[180px]'>
          <SelectValue placeholder='Filter by status' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='all'>All statuses</SelectItem>
          {Object.entries(LOAN_STATUSES).map(([value, label]) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select
        defaultValue={searchParams?.get('sort') ?? 'latest'}
        disabled={isPending}
        onValueChange={(value) => {
          startTransition(() => {
            router.push(
              `${pathname}${createQueryString({ sort: value, page: null }) ? `?${createQueryString({ sort: value, page: null })}` : ''}`,
              { scroll: false },
            );
          });
        }}
      >
        <SelectTrigger className='w-[180px]'>
          <SelectValue placeholder='Sort by' />
        </SelectTrigger>
        <SelectContent>
          {SORT_OPTIONS.map(({ value, label }) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
