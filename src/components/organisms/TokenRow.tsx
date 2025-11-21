import { memo, useState } from 'react';
import { TokenInfo } from '@/components/molecules/TokenInfo';
import { PriceCell } from '@/components/atoms/PriceCell';
import { ChangeCell } from '@/components/atoms/ChangeCell';
import { TokenStats } from '@/components/molecules/TokenStats';
import { formatLargeNumber } from '@/utils/formatters';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import type { Token } from '@/store/tokenStore';

interface TokenRowProps {
  token: Token;
}

export const TokenRow = memo(({ token }: TokenRowProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div 
        className="grid grid-cols-7 gap-4 p-4 border-b border-border/50 hover:bg-white/5 transition-colors cursor-pointer group items-center text-sm"
        onClick={() => setIsOpen(true)}
      >
        <div className="col-span-2">
            <TokenInfo token={token} />
        </div>
        <div className="col-span-1 text-right">
            <PriceCell price={token.price} lastUpdate={token.lastUpdate} />
        </div>
        <div className="col-span-1 text-right flex justify-end">
            <ChangeCell change={token.priceChange24h} />
        </div>
        <div className="col-span-1 text-right font-mono text-muted-foreground">
            ${formatLargeNumber(token.volume24h)}
        </div>
        <div className="col-span-1 text-right font-mono text-muted-foreground">
            ${formatLargeNumber(token.liquidity)}
        </div>
        <div className="col-span-1 text-right text-muted-foreground text-xs">
            {token.age}
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[600px] bg-card border-border">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/40 to-accent/40 flex items-center justify-center text-sm font-bold">
                {token.symbol.slice(0, 2)}
              </div>
              <div>
                <div className="text-xl font-bold">{token.symbol}</div>
                <div className="text-sm text-muted-foreground font-normal">{token.name}</div>
              </div>
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">Current Price</div>
                <PriceCell price={token.price} lastUpdate={token.lastUpdate} />
              </div>
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">24h Change</div>
                <ChangeCell change={token.priceChange24h} />
              </div>
            </div>

            <TokenStats
              volume24h={token.volume24h}
              liquidity={token.liquidity}
              marketCap={token.marketCap}
              holders={token.holders}
            />

            <div className="flex gap-2">
              <Button className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">
                Trade
              </Button>
              <Button variant="outline" className="flex-1 border-border hover:bg-secondary">
                <ExternalLink className="w-4 h-4 mr-2" />
                View Chart
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
});

TokenRow.displayName = 'TokenRow';