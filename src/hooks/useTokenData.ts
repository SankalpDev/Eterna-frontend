import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useTokenStore } from '@/store/tokenStore';
import { MockWebSocket } from '@/lib/mock-websocket';
import type { Token } from '@/store/tokenStore';

// Mock data generator
const generateMockTokens = (): Token[] => {
  const categories: Token['category'][] = ['new', 'final-stretch', 'migrated'];
  const tokens: Token[] = [];

  for (let i = 0; i < 50; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    tokens.push({
      id: `token-${i}`,
      symbol: `TKN${i}`,
      name: `Token ${i}`,
      price: Math.random() * 0.01 + 0.0001,
      priceChange24h: (Math.random() - 0.5) * 20,
      volume24h: Math.random() * 1000000 + 100000,
      liquidity: Math.random() * 500000 + 50000,
      marketCap: Math.random() * 10000000 + 1000000,
      holders: Math.floor(Math.random() * 10000 + 1000),
      age: `${Math.floor(Math.random() * 24)}h ${Math.floor(Math.random() * 60)}m`,
      category,
      verified: Math.random() > 0.7,
    });
  }

  return tokens;
};

const fetchTokens = async (): Promise<Token[]> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1500));
  return generateMockTokens();
};

export const useTokenData = () => {
  const { setTokens, updateToken, tokens } = useTokenStore();

  // Fetch initial data
  const { data, isLoading, error } = useQuery({
    queryKey: ['tokens'],
    queryFn: fetchTokens,
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  useEffect(() => {
    if (data) {
      setTokens(data);
    }
  }, [data, setTokens]);

  // Set up WebSocket for real-time updates
  useEffect(() => {
    if (tokens.length === 0) return;

    const ws = new MockWebSocket(tokens.map(t => t.id));
    ws.connect();

    const unsubscribe = ws.subscribe((update) => {
      updateToken(update.id, {
        price: update.price,
        priceChange24h: update.priceChange * 100,
        volume24h: update.volume24h,
        liquidity: update.liquidity,
        marketCap: update.marketCap,
        holders: update.holders,
      });
    });

    return () => {
      unsubscribe();
      ws.disconnect();
    };
  }, [tokens.length, updateToken]);

  return { isLoading, error };
};
