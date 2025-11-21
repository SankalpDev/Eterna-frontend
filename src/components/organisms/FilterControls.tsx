import { memo } from 'react';
import { useTokenStore } from '@/store/tokenStore';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { Token } from '@/store/tokenStore';

export const FilterControls = memo(() => {
  const { filterCategory, setFilterCategory } = useTokenStore();

  const handleCategoryChange = (value: string) => {
    setFilterCategory(value as 'all' | Token['category']);
  };

  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Token Discovery</h2>
        <p className="text-sm text-muted-foreground">
          Real-time token trading data with live price updates
        </p>
      </div>

      <Tabs value={filterCategory} onValueChange={handleCategoryChange}>
        <TabsList className="bg-muted">
          <TabsTrigger value="all">All Tokens</TabsTrigger>
          <TabsTrigger value="new">New Pairs</TabsTrigger>
          <TabsTrigger value="final-stretch">Final Stretch</TabsTrigger>
          <TabsTrigger value="migrated">Migrated</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
});

FilterControls.displayName = 'FilterControls';
