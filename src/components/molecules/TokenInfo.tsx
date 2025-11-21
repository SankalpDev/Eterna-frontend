import { memo } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { TokenBadge } from '@/components/atoms/TokenBadge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import type { Token } from '@/store/tokenStore';

interface TokenInfoProps {
  token: Token;
}

export const TokenInfo = memo(({ token }: TokenInfoProps) => {
  return (
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/40 to-accent/40 flex items-center justify-center text-xs font-bold">
        {token.symbol.slice(0, 2)}
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-sm">{token.symbol}</span>
          {token.verified && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Verified Token</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
          <TokenBadge category={token.category} />
        </div>
        <span className="text-xs text-muted-foreground">{token.name}</span>
      </div>
    </div>
  );
});

TokenInfo.displayName = 'TokenInfo';
