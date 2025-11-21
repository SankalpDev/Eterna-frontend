import { memo } from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { Token } from '@/store/tokenStore';

interface TokenBadgeProps {
  category: Token['category'];
}

const categoryConfig = {
  new: {
    label: 'New',
    className: 'bg-primary/20 text-primary border-primary/30 hover:bg-primary/30',
  },
  'final-stretch': {
    label: 'Final Stretch',
    className: 'bg-warning/20 text-warning border-warning/30 hover:bg-warning/30',
  },
  migrated: {
    label: 'Migrated',
    className: 'bg-success/20 text-success border-success/30 hover:bg-success/30',
  },
};

export const TokenBadge = memo(({ category }: TokenBadgeProps) => {
  const config = categoryConfig[category];

  return (
    <Badge variant="outline" className={cn('text-xs font-medium', config.className)}>
      {config.label}
    </Badge>
  );
});

TokenBadge.displayName = 'TokenBadge';
