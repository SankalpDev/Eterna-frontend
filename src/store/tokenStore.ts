import { create } from 'zustand';

export interface Token {
  id: string;
  symbol: string;
  name: string;
  price: number;
  priceChange24h: number;
  volume24h: number;
  liquidity: number;
  marketCap: number;
  holders: number;
  age: string;
  category: 'new' | 'final-stretch' | 'migrated';
  image?: string;
  verified?: boolean;
  lastUpdate?: number;
}

interface TokenState {
  tokens: Token[];
  loading: boolean;
  sortBy: keyof Token | null;
  sortOrder: 'asc' | 'desc';
  filterCategory: 'all' | Token['category'];
  setTokens: (tokens: Token[]) => void;
  updateToken: (id: string, updates: Partial<Token>) => void;
  setSortBy: (key: keyof Token, order: 'asc' | 'desc') => void;
  setFilterCategory: (category: 'all' | Token['category']) => void;
  setLoading: (loading: boolean) => void;
}

export const useTokenStore = create<TokenState>((set) => ({
  tokens: [],
  loading: true,
  sortBy: null,
  sortOrder: 'desc',
  filterCategory: 'all',
  
  setTokens: (tokens) => set({ tokens, loading: false }),
  
  updateToken: (id, updates) =>
    set((state) => ({
      tokens: state.tokens.map((token) =>
        token.id === id ? { ...token, ...updates, lastUpdate: Date.now() } : token
      ),
    })),
  
  setSortBy: (key, order) => set({ sortBy: key, sortOrder: order }),
  
  setFilterCategory: (category) => set({ filterCategory: category }),
  
  setLoading: (loading) => set({ loading }),
}));
