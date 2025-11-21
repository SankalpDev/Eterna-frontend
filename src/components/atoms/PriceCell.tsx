import { memo, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { formatPrice, getPriceChangeColor } from '@/utils/formatters';

interface PriceCellProps {
  price: number;
  lastUpdate?: number;
}

export const PriceCell = memo(({ price, lastUpdate }: PriceCellProps) => {
  const [highlight, setHighlight] = useState(false);
  const [prevPrice, setPrevPrice] = useState(price);

  useEffect(() => {
    if (lastUpdate && price !== prevPrice) {
      setHighlight(true);
      setPrevPrice(price);
      
      const timer = setTimeout(() => setHighlight(false), 500);
      return () => clearTimeout(timer);
    }
  }, [lastUpdate, price, prevPrice]);

  const changeDirection = price > prevPrice ? 'up' : price < prevPrice ? 'down' : 'neutral';

  return (
    <div
      className={cn(
        'font-mono text-sm transition-all duration-300',
        highlight && changeDirection === 'up' && 'text-price-up scale-105',
        highlight && changeDirection === 'down' && 'text-price-down scale-105',
        !highlight && 'text-foreground'
      )}
    >
      {formatPrice(price)}
    </div>
  );
});

PriceCell.displayName = 'PriceCell';
