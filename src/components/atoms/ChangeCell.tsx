import { memo } from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatPercentage, getPriceChangeColor } from '@/utils/formatters';

interface ChangeCellProps {
  change: number;
  showIcon?: boolean;
}

export const ChangeCell = memo(({ change, showIcon = true }: ChangeCellProps) => {
  const Icon = change > 0 ? TrendingUp : change < 0 ? TrendingDown : Minus;

  return (
    <div className={cn('flex items-center gap-1 font-medium text-sm', getPriceChangeColor(change))}>
      {showIcon && <Icon className="w-4 h-4" />}
      <span>{formatPercentage(change)}</span>
    </div>
  );
});

ChangeCell.displayName = 'ChangeCell';
