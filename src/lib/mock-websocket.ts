// Mock WebSocket service for real-time token price updates
export interface TokenUpdate {
  id: string;
  price: number;
  priceChange: number;
  volume24h: number;
  liquidity: number;
  marketCap: number;
  holders: number;
  timestamp: number;
}

type UpdateCallback = (update: TokenUpdate) => void;

export class MockWebSocket {
  private callbacks: Set<UpdateCallback> = new Set();
  private interval: number | null = null;
  private tokens: string[] = [];

  constructor(tokenIds: string[]) {
    this.tokens = tokenIds;
  }

  connect() {
    // Simulate WebSocket connection
    console.log('MockWebSocket: Connected');
    
    // Send updates every 1-3 seconds
    this.interval = window.setInterval(() => {
      this.sendRandomUpdate();
    }, Math.random() * 2000 + 1000);
  }

  disconnect() {
    if (this.interval !== null) {
      clearInterval(this.interval);
      this.interval = null;
    }
    console.log('MockWebSocket: Disconnected');
  }

  subscribe(callback: UpdateCallback) {
    this.callbacks.add(callback);
    return () => this.callbacks.delete(callback);
  }

  private sendRandomUpdate() {
    if (this.tokens.length === 0) return;

    const randomToken = this.tokens[Math.floor(Math.random() * this.tokens.length)];
    const priceChange = (Math.random() - 0.5) * 0.1; // -5% to +5%
    
    const update: TokenUpdate = {
      id: randomToken,
      price: Math.random() * 0.001 + 0.0001,
      priceChange,
      volume24h: Math.random() * 1000000 + 100000,
      liquidity: Math.random() * 500000 + 50000,
      marketCap: Math.random() * 10000000 + 1000000,
      holders: Math.floor(Math.random() * 10000 + 1000),
      timestamp: Date.now(),
    };

    this.callbacks.forEach(callback => callback(update));
  }
}
