'use client';

import { useTokenData } from '@/hooks/useTokenData';
import { FilterControls } from '@/components/organisms/FilterControls';
import { TokenTable } from '@/components/organisms/TokenTable';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

export default function Dashboard() {
  // We invoke the hook here. Since this is a client component, it works perfectly.
  const { isLoading, error } = useTokenData();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <span className="text-xl font-bold text-primary-foreground">A</span>
              </div>
              <div>
                <h1 className="text-xl font-bold">Axiom Trade</h1>
                <p className="text-xs text-muted-foreground">Token Discovery Platform</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
              <span className="text-xs text-muted-foreground">Live Updates</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Failed to load token data. Please try again later.
            </AlertDescription>
          </Alert>
        )}

        <FilterControls />
        <TokenTable />
      </main>
    </div>
  );
}