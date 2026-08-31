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

function getLatestAsk(
  data: MinfinRate[],
  currency: string
): number | null {
  const entries = data
    .filter((entry) => entry.currency === currency)
    .sort(
      (a, b) =>
        new Date(b.pointDate).getTime() - new Date(a.pointDate).getTime()
    );

  if (entries.length === 0) return null;
  const ask = parseFloat(entries[0].ask);
  return Number.isFinite(ask) && ask > 0 ? ask : null;
}

/**
 * Get the most recent EUR/USD exchange rate from MinFin API
 * MinFin API returns rates in UAH, so we calculate EUR/USD = (EUR in UAH) / (USD in UAH)
 */
export const getEurExchangeRate = async (): Promise<number | null> => {
  try {
    const data = await getMinfinApi();
    if (!data || !Array.isArray(data)) {
      return null;
    }

    const eurInUah = getLatestAsk(data, 'eur');
    const usdInUah = getLatestAsk(data, 'usd');

    if (!eurInUah || !usdInUah) {
      return null;
    }

    return eurInUah / usdInUah;
  } catch (error) {
    console.error('Error getting EUR exchange rate:', error);
    return null;
  }
};

/**
 * Get the most recent USD→UAH ask rate from MinFin (for pension brackets).
 */
export const getUsdUahRate = async (): Promise<number | null> => {
  try {
    const data = await getMinfinApi();
    if (!data || !Array.isArray(data)) {
      return null;
    }
    return getLatestAsk(data, 'usd');
  } catch (error) {
    console.error('Error getting USD/UAH exchange rate:', error);
    return null;
  }
};
