const MINFIN_API_URL =
  'https://api.minfin.com.ua/mb/fcdfa0ab76a09ecf3994dbb503093925cce41c3c/';

export interface MinfinRate {
  id: string;
  pointDate: string;
  date: string;
  ask: string;
  bid: string;
  trendAsk: string;
  trendBid: string;
  currency: string;
  comment: string;
}

export const getMinfinApi = async (): Promise<MinfinRate[] | null> => {
  try {
    const response = await fetch(`${MINFIN_API_URL}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching minfin api:', error);
    return null;
  }
};

/**
 * Get the most recent EUR/USD exchange rate from MinFin API
 * MinFin API returns rates in UAH, so we calculate EUR/USD = (EUR in UAH) / (USD in UAH)
 * @returns The EUR/USD exchange rate or null if not available
 */
export const getEurExchangeRate = async (): Promise<number | null> => {
  try {
    const data = await getMinfinApi();
    if (!data || !Array.isArray(data)) {
      return null;
    }

    // Filter for EUR and USD entries and sort by pointDate (most recent first)
    const eurEntries = data
      .filter((entry: MinfinRate) => entry.currency === 'eur')
      .sort((a: MinfinRate, b: MinfinRate) => {
        const dateA = new Date(a.pointDate).getTime();
        const dateB = new Date(b.pointDate).getTime();
        return dateB - dateA; // Most recent first
      });

    const usdEntries = data
      .filter((entry: MinfinRate) => entry.currency === 'usd')
      .sort((a: MinfinRate, b: MinfinRate) => {
        const dateA = new Date(a.pointDate).getTime();
        const dateB = new Date(b.pointDate).getTime();
        return dateB - dateA; // Most recent first
      });

    if (eurEntries.length === 0 || usdEntries.length === 0) {
      return null;
    }

    // Get the most recent EUR and USD entries
    const mostRecentEur = eurEntries[0];
    const mostRecentUsd = usdEntries[0];

    const eurInUah = parseFloat(mostRecentEur.ask);
    const usdInUah = parseFloat(mostRecentUsd.ask);

    if (isNaN(eurInUah) || isNaN(usdInUah) || usdInUah === 0) {
      return null;
    }

    // Calculate EUR/USD = (EUR in UAH) / (USD in UAH)
    const eurToUsdRate = eurInUah / usdInUah;

    return eurToUsdRate;
  } catch (error) {
    console.error('Error getting EUR exchange rate:', error);
    return null;
  }
};
