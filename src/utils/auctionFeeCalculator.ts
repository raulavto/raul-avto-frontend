/**
 * Auction Fee Calculator
 * 
 * Extracted from FormCraft logic in aucFee.htm
 * This module calculates auction fees based on auction type (Copart/IAAI) and lot price.
 * 
 * Field Mappings:
 * - field6: Internet bid fee Copart
 * - field7: Fee A - US Locations Copart (flat fee)
 * - field9: > 6% Fee A - US Locations Copart (percentage, 0.06 for prices > $15,000)
 * - field11: Internet bid fee IAAI
 * - field13: Fee A - US Locations IAAI (flat fee)
 * - field76: > 6% Fee A - US Locations IAAI (percentage, 0.06 for prices > $15,000)
 * - field48: Copart calculation [field2 * field9] (price × percentage)
 * - field77: IAAI calculation [field2 * field76] (price × percentage)
 * - field99: Broker fee IAAI ($35)
 * - field100: Gate Fee ($95)
 * - field101: Environmental Fee ($15)
 * - field102: Vehicle Report IAAI ($20)
 * - field103: Title pick up Copart ($20)
 */

export type AuctionType = 'Copart' | 'IAAI';

export interface AuctionFeeResult {
  // Copart fees
  internetBidFeeCopart: number;
  feeACopart: number; // Flat fee for US Locations
  feeACopartPercentage: number; // Percentage (0.06 for prices > $15,000)
  feeACopartCalculated: number; // field2 * field9 (price × percentage)
  
  // IAAI fees
  internetBidFeeIAAI: number;
  feeAIAAI: number; // Flat fee for US Locations
  feeAIAAIPercentage: number; // Percentage (0.06 for prices > $15,000)
  feeAIAAICalculated: number; // field2 * field76 (price × percentage)
  
  // Additional fees
  brokerFeeIAAI: number; // $35
  gateFee: number; // $95
  environmentalFee: number; // $15
  vehicleReportIAAI: number; // $20
  titlePickupCopart: number; // $20
}

/**
 * Calculate Internet Bid Fee for Copart based on price
 */
function getInternetBidFeeCopart(price: number): number {
  if (price < 100) return 0;
  if (price >= 100 && price < 500) return 50;
  if (price >= 500 && price < 1000) return 65;
  if (price >= 1000 && price < 1500) return 85;
  if (price >= 1500 && price < 2000) return 95;
  if (price >= 2000 && price < 4000) return 110;
  if (price >= 4000 && price < 6000) return 125;
  if (price >= 6000 && price < 8000) return 145;
  if (price >= 8000) return 160;
  return 0;
}

/**
 * Calculate Fee A - US Locations Copart (flat fee) based on price
 */
function getFeeACopart(price: number): number {
  if (price < 100) return 1;
  if (price >= 100 && price < 200) return 25;
  if (price >= 200 && price < 300) return 60;
  if (price >= 300 && price < 350) return 85;
  if (price >= 350 && price < 400) return 100;
  if (price >= 400 && price < 450) return 125;
  if (price >= 450 && price < 500) return 135;
  if (price >= 500 && price < 550) return 145;
  if (price >= 550 && price < 600) return 155;
  if (price >= 600 && price < 700) return 170;
  if (price >= 700 && price < 800) return 195;
  if (price >= 800 && price < 900) return 215;
  if (price >= 900 && price < 1000) return 230;
  if (price >= 1000 && price < 1200) return 250;
  if (price >= 1200 && price < 1300) return 270;
  if (price >= 1300 && price < 1400) return 285;
  if (price >= 1400 && price < 1500) return 300;
  if (price >= 1500 && price < 1600) return 315;
  if (price >= 1600 && price < 1700) return 330;
  if (price >= 1700 && price < 1800) return 350;
  if (price >= 1800 && price < 2000) return 370;
  if (price >= 2000 && price < 2400) return 390;
  if (price >= 2400 && price < 2500) return 425;
  if (price >= 2500 && price < 3000) return 460;
  if (price >= 3000 && price < 3500) return 505;
  if (price >= 3500 && price < 4000) return 555;
  if (price >= 4000 && price < 4500) return 600;
  if (price >= 4500 && price < 5000) return 625;
  if (price >= 5000 && price < 5500) return 650;
  if (price >= 5500 && price < 6000) return 675;
  if (price >= 6000 && price < 6500) return 700;
  if (price >= 6500 && price < 7000) return 720;
  if (price >= 7000 && price < 7500) return 755;
  if (price >= 7500 && price < 8000) return 775;
  if (price >= 8000 && price < 8500) return 800;
  if (price >= 8500 && price < 10000) return 820;
  if (price >= 10000 && price < 10500) return 850;
  if (price >= 10500 && price < 11000) return 850;
  if (price >= 11000 && price < 11500) return 850;
  if (price >= 11500 && price < 12000) return 860;
  if (price >= 12000 && price < 12500) return 875;
  if (price >= 12500 && price < 15000) return 890;
  // For prices >= 15000, fee A is 0 (percentage applies instead)
  if (price >= 15000) return 0;
  return 0;
}

/**
 * Calculate > 6% Fee A - US Locations Copart (percentage)
 * Returns 0.06 for prices > $15,000, otherwise 0
 */
function getFeeACopartPercentage(price: number): number {
  if (price >= 15000) return 0.06;
  return 0;
}

/**
 * Calculate Internet Bid Fee for IAAI based on price
 */
function getInternetBidFeeIAAI(price: number): number {
  if (price < 100) return 0;
  if (price >= 100 && price < 500) return 50;
  if (price >= 500 && price < 1000) return 65;
  if (price >= 1000 && price < 1500) return 85;
  if (price >= 1500 && price < 2000) return 95;
  if (price >= 2000 && price < 4000) return 110;
  if (price >= 4000 && price < 6000) return 125;
  if (price >= 6000 && price < 8000) return 145;
  if (price >= 8000) return 160;
  return 0;
}

/**
 * Calculate Fee A - US Locations IAAI (flat fee) based on price
 */
function getFeeAIAAI(price: number): number {
  if (price < 100) return 1;
  if (price >= 100 && price < 200) return 25;
  if (price >= 200 && price < 300) return 60;
  if (price >= 300 && price < 350) return 85;
  if (price >= 350 && price < 400) return 100;
  if (price >= 400 && price < 450) return 125;
  if (price >= 450 && price < 500) return 135;
  if (price >= 500 && price < 550) return 145;
  if (price >= 550 && price < 600) return 155;
  if (price >= 600 && price < 700) return 170;
  if (price >= 700 && price < 800) return 195;
  if (price >= 800 && price < 900) return 215;
  if (price >= 900 && price < 1000) return 230;
  if (price >= 1000 && price < 1200) return 250;
  if (price >= 1200 && price < 1300) return 270;
  if (price >= 1300 && price < 1400) return 285;
  if (price >= 1400 && price < 1500) return 300;
  if (price >= 1500 && price < 1600) return 315;
  if (price >= 1600 && price < 1700) return 330;
  if (price >= 1700 && price < 1800) return 350;
  if (price >= 1800 && price < 2000) return 370;
  if (price >= 2000 && price < 2400) return 390;
  if (price >= 2400 && price < 2500) return 425;
  if (price >= 2500 && price < 3000) return 460;
  if (price >= 3000 && price < 3500) return 505;
  if (price >= 3500 && price < 4000) return 555;
  if (price >= 4000 && price < 4500) return 600;
  if (price >= 4500 && price < 5000) return 625;
  if (price >= 5000 && price < 5500) return 650;
  if (price >= 5500 && price < 6000) return 675;
  if (price >= 6000 && price < 6500) return 700;
  if (price >= 6500 && price < 7000) return 720;
  if (price >= 7000 && price < 7500) return 755;
  if (price >= 7500 && price < 8000) return 775;
  if (price >= 8000 && price < 8500) return 800;
  if (price >= 8500 && price < 10000) return 820;
  if (price >= 10000 && price < 11500) return 850;
  if (price >= 11500 && price < 12000) return 860;
  if (price >= 12000 && price < 12500) return 875;
  if (price >= 12500 && price < 15000) return 890;
  // For prices >= 15000, fee A is 0 (percentage applies instead)
  if (price >= 15000) return 0;
  return 0;
}

/**
 * Calculate > 6% Fee A - US Locations IAAI (percentage)
 * Returns 0.06 for prices > $15,000, otherwise 0
 */
function getFeeAIAAIPercentage(price: number): number {
  if (price >= 15000) return 0.06;
  return 0;
}

/**
 * Calculate all auction fees based on auction type and lot price
 * 
 * @param auctionType - 'Copart' or 'IAAI'
 * @param lotPrice - Price of the lot in USA dollars
 * @returns AuctionFeeResult object with all calculated fees
 */
export function calculateAuctionFees(
  auctionType: AuctionType,
  lotPrice: number
): AuctionFeeResult {
  // Calculate Copart fees
  const internetBidFeeCopart = getInternetBidFeeCopart(lotPrice);
  const feeACopart = getFeeACopart(lotPrice);
  const feeACopartPercentage = getFeeACopartPercentage(lotPrice);
  const feeACopartCalculated = lotPrice * feeACopartPercentage;

  // Calculate IAAI fees
  const internetBidFeeIAAI = getInternetBidFeeIAAI(lotPrice);
  const feeAIAAI = getFeeAIAAI(lotPrice);
  const feeAIAAIPercentage = getFeeAIAAIPercentage(lotPrice);
  const feeAIAAICalculated = lotPrice * feeAIAAIPercentage;

  // Additional fees (only apply when price > 0)
  const brokerFeeIAAI = lotPrice > 0 ? 35 : 0;
  const gateFee = lotPrice > 0 ? 95 : 0;
  const environmentalFee = lotPrice > 0 ? 15 : 0;
  const vehicleReportIAAI = lotPrice > 0 ? 20 : 0;
  const titlePickupCopart = lotPrice > 0 ? 20 : 0;

  return {
    internetBidFeeCopart,
    feeACopart,
    feeACopartPercentage,
    feeACopartCalculated,
    internetBidFeeIAAI,
    feeAIAAI,
    feeAIAAIPercentage,
    feeAIAAICalculated,
    brokerFeeIAAI,
    gateFee,
    environmentalFee,
    vehicleReportIAAI,
    titlePickupCopart,
  };
}

/**
 * Get the total auction fee for a specific auction type
 * This combines all relevant fees for the selected auction type
 * 
 * @param auctionType - 'Copart' or 'IAAI'
 * @param lotPrice - Price of the lot in USA dollars
 * @returns Total auction fee amount
 */
export function getTotalAuctionFee(
  auctionType: AuctionType,
  lotPrice: number
): number {
  const fees = calculateAuctionFees(auctionType, lotPrice);

  if (auctionType === 'Copart') {
    // Copart total: Internet fee + Fee A (flat or calculated) + Gate Fee + Environmental Fee + Title Pickup
    const feeA = fees.feeACopart > 0 ? fees.feeACopart : fees.feeACopartCalculated;
    return (
      fees.internetBidFeeCopart +
      feeA +
      fees.gateFee +
      fees.environmentalFee +
      fees.titlePickupCopart
    );
  } else {
    // IAAI total: Internet fee + Fee A (flat or calculated) + Broker Fee + Gate Fee + Environmental Fee + Vehicle Report
    const feeA = fees.feeAIAAI > 0 ? fees.feeAIAAI : fees.feeAIAAICalculated;
    return (
      fees.internetBidFeeIAAI +
      feeA +
      fees.brokerFeeIAAI +
      fees.gateFee +
      fees.environmentalFee +
      fees.vehicleReportIAAI
    );
  }
}

