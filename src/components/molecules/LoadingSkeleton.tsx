import { Skeleton } from '@/components/ui/skeleton';

export const TableRowSkeleton = () => (
  <div className="flex items-center gap-4 p-4 border-b border-border/50 animate-pulse">
    <Skeleton className="w-8 h-8 rounded-full bg-muted" />
    <div className="flex-1 space-y-2">
      <Skeleton className="h-4 w-32 bg-muted" />
      <Skeleton className="h-3 w-24 bg-muted" />
    </div>
    <Skeleton className="h-4 w-20 bg-muted" />
    <Skeleton className="h-4 w-16 bg-muted" />
    <Skeleton className="h-4 w-24 bg-muted" />
    <Skeleton className="h-4 w-20 bg-muted" />
  </div>
);

export const TableLoadingSkeleton = ({ rows = 10 }: { rows?: number }) => (
  <div className="space-y-0">
    {Array.from({ length: rows }).map((_, i) => (
      <TableRowSkeleton key={i} />
    ))}
  </div>
);
