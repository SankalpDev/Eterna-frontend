// Utility functions for formatting numbers and currencies

export const formatPrice = (price: number): string => {
  if (price < 0.0001) {
    return `$${price.toExponential(2)}`;
  }
  if (price < 0.01) {
    return `$${price.toFixed(6)}`;
  }
  if (price < 1) {
    return `$${price.toFixed(4)}`;
  }
  return `$${price.toFixed(2)}`;
};

export const formatLargeNumber = (num: number): string => {
  if (num >= 1_000_000_000) {
    return `${(num / 1_000_000_000).toFixed(2)}B`;
  }
  if (num >= 1_000_000) {
    return `${(num / 1_000_000).toFixed(2)}M`;
  }
  if (num >= 1_000) {
    return `${(num / 1_000).toFixed(2)}K`;
  }
  return num.toFixed(2);
};

export const formatPercentage = (percent: number): string => {
  const sign = percent >= 0 ? '+' : '';
  return `${sign}${percent.toFixed(2)}%`;
};

export const getPriceChangeColor = (change: number): string => {
  if (change > 0) return 'text-price-up';
  if (change < 0) return 'text-price-down';
  return 'text-price-neutral';
};

export const formatNumber = (num: number): string => {
  return num.toLocaleString('en-US');
};
