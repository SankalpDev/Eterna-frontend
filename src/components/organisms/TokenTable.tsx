import { memo, useMemo } from 'react';
import { useTokenStore } from '@/store/tokenStore';
import { TokenRow } from './TokenRow';
import { TableLoadingSkeleton } from '@/components/molecules/LoadingSkeleton';
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import type { Token } from '@/store/tokenStore';

interface ColumnHeader {
  key: keyof Token;
  label: string;
  sortable: boolean;
  className?: string;
}

const columns: ColumnHeader[] = [
  { key: 'symbol', label: 'Token', sortable: true, className: 'col-span-2' },
  { key: 'price', label: 'Price', sortable: true, className: 'col-span-1 text-right' },
  { key: 'priceChange24h', label: '24h %', sortable: true, className: 'col-span-1 text-right' },
  { key: 'volume24h', label: 'Vol', sortable: true, className: 'col-span-1 text-right' },
  { key: 'liquidity', label: 'Liq', sortable: true, className: 'col-span-1 text-right' },
  { key: 'age', label: 'Age', sortable: false, className: 'col-span-1 text-right' },
];

export const TokenTable = memo(() => {
  const { tokens, loading, sortBy, sortOrder, filterCategory, setSortBy } = useTokenStore();

  const filteredAndSortedTokens = useMemo(() => {
    let result = [...tokens];

    if (filterCategory !== 'all') {
      result = result.filter(token => token.category === filterCategory);
    }

    if (sortBy) {
      result.sort((a, b) => {
        const aVal = a[sortBy];
        const bVal = b[sortBy];
        
        if (typeof aVal === 'number' && typeof bVal === 'number') {
          return sortOrder === 'asc' ? aVal - bVal : bVal - aVal;
        }
        if (typeof aVal === 'string' && typeof bVal === 'string') {
          return sortOrder === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
        }
        return 0;
      });
    }
    return result;
  }, [tokens, sortBy, sortOrder, filterCategory]);

  const handleSort = (key: keyof Token) => {
    if (sortBy === key) {
      setSortBy(key, sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(key, 'desc');
    }
  };

  if (loading) {
    return <TableLoadingSkeleton rows={15} />;
  }

  return (
    <div className="rounded-lg border border-border bg-card flex flex-col relative">
      <ScrollArea className="w-full whitespace-nowrap rounded-md border">
        <div className="min-w-[800px]">
          {/* Table Header */}
          <div className="grid grid-cols-7 gap-4 p-4 border-b border-border bg-muted/30 items-center">
            {columns.map((column) => (
              <div
                key={column.key}
                className={cn(
                  'text-xs font-semibold text-muted-foreground flex items-center gap-1 uppercase tracking-wider',
                  column.className,
                  column.sortable && 'cursor-pointer hover:text-foreground transition-colors select-none justify-end first:justify-start'
                )}
                onClick={() => column.sortable && handleSort(column.key)}
              >
                {column.label}
                {column.sortable && (
                  <span className="text-muted-foreground/50">
                    {sortBy === column.key ? (
                      sortOrder === 'asc' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />
                    ) : (
                      <ArrowUpDown className="w-3 h-3" />
                    )}
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Table Body */}
          <div className="divide-y divide-border/50">
            {filteredAndSortedTokens.map((token) => (
              <TokenRow key={token.id} token={token} />
            ))}
          </div>
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      {filteredAndSortedTokens.length === 0 && (
        <div className="p-12 text-center text-muted-foreground">
          No tokens found
        </div>
      )}
    </div>
  );
});

TokenTable.displayName = 'TokenTable';