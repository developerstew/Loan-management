import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export function LoadingLoans() {
  return (
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
            <TableHead className='w-[100px]'>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 5 }).map((_, i) => (
            <TableRow key={i}>
              <TableCell>
                <div className='h-4 w-32 animate-pulse rounded-md bg-muted' />
              </TableCell>
              <TableCell>
                <div className='h-4 w-20 animate-pulse rounded-md bg-muted' />
              </TableCell>
              <TableCell>
                <div className='h-4 w-16 animate-pulse rounded-md bg-muted' />
              </TableCell>
              <TableCell>
                <div className='h-4 w-12 animate-pulse rounded-md bg-muted' />
              </TableCell>
              <TableCell>
                <div className='h-4 w-24 animate-pulse rounded-md bg-muted' />
              </TableCell>
              <TableCell>
                <div className='h-4 w-24 animate-pulse rounded-md bg-muted' />
              </TableCell>
              <TableCell>
                <div className='flex h-8 w-[100px] animate-pulse items-center justify-center gap-2 rounded-md bg-muted' />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
