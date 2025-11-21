import { memo } from 'react';
import { formatLargeNumber, formatNumber } from '@/utils/formatters';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Info } from 'lucide-react';

interface TokenStatsProps {
  volume24h: number;
  liquidity: number;
  marketCap: number;
  holders: number;
}

export const TokenStats = memo(({ volume24h, liquidity, marketCap, holders }: TokenStatsProps) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <StatItem label="Volume 24h" value={volume24h} />
      <StatItem label="Liquidity" value={liquidity} />
      <StatItem label="Market Cap" value={marketCap} />
      <StatItem 
        label="Holders" 
        value={holders} 
        format={formatNumber}
        info="Number of unique wallet addresses holding this token"
      />
    </div>
  );
});

interface StatItemProps {
  label: string;
  value: number;
  format?: (val: number) => string;
  info?: string;
}

const StatItem = ({ label, value, format = formatLargeNumber, info }: StatItemProps) => (
  <div className="flex flex-col gap-1">
    <div className="flex items-center gap-1">
      <span className="text-xs text-muted-foreground">{label}</span>
      {info && (
        <Popover>
          <PopoverTrigger>
            <Info className="w-3 h-3 text-muted-foreground hover:text-foreground transition-colors" />
          </PopoverTrigger>
          <PopoverContent className="text-xs w-64 bg-popover border-border">
            {info}
          </PopoverContent>
        </Popover>
      )}
    </div>
    <span className="text-sm font-mono font-medium">${format(value)}</span>
  </div>
);

TokenStats.displayName = 'TokenStats';
