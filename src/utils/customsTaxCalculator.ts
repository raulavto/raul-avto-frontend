/**
 * Customs, Taxes, Pension and Fees Calculator
 *
 * Extracted from TotalAmountCalculator.tsx
 * This module calculates customs fees, taxes, pension, and other related fees.
 *
 * Based on Ukrainian customs regulations for vehicle import.
 */

export type FuelType = 'petrol' | 'diesel' | 'hybrid' | 'electric';

export interface CustomsTaxResult {
  // Base calculations
  carCost: number; // auctionCost + auctionFee + baseFee (1600)

  // Customs fees
  importDuty: number; // 10% of carCost (or engineCapacity for electric)
  exciseTax: number; // Based on engine capacity, fuel type, and vehicle age
  vat: number; // 20% of (carCost + importDuty + exciseTax) for non-electric
  customFees: number; // importDuty + exciseTax + vat
  totalCustomsFees: number; // customFees + 150 (broker fee)

  // Registration fees
  pension: number; // 3% of carCost
  certification: number; // Fixed: 150

  // Additional info
  vehicleAge: number;
  euroToDollar: number; // Exchange rate: 1.08
}

/**
 * Calculate vehicle age based on manufacture year
 */
function calculateVehicleAge(yearOfManufacture: number): number {
  const currentYear = new Date().getFullYear();
  return currentYear - yearOfManufacture;
}

/**
 * Calculate Import Duty
 *
 * For electric vehicles: engineCapacity * 1 (1 kW = 1 EUR)
 * For other vehicles: 10% of carCost
 */
export function calculateImportDuty(
  fuelType: FuelType,
  carCost: number,
  engineCapacity: number
): number {
  if (fuelType === 'electric') {
    return engineCapacity * 1; // 1 kW = 1 EUR
  } else {
    return parseFloat((carCost * 0.1).toFixed(0)); // 10%
  }
}

/**
 * Calculate Excise Tax
 *
 * Formula: (engineCapacity / 1000) * rate * euroToDollar * ageMultiplier
 *
 * Rates by fuel type:
 * - Petrol: 50 EUR per liter (≤3000cc) or 100 EUR per liter (>3000cc)
 * - Diesel: 75 EUR per liter (≤3500cc) or 150 EUR per liter (>3500cc)
 * - Hybrid: 50 EUR per liter (≤3000cc) or 100 EUR per liter (>3000cc)
 * - Electric: 0 (no excise tax)
 *
 * Age multiplier:
 * - If vehicle age ≤ 5 years: multiplier = 1
 * - If vehicle age > 5 years: multiplier = vehicleAge - 1
 */
export function calculateExciseTax(
  fuelType: FuelType,
  engineCapacity: number,
  vehicleAge: number
): number {
  if (fuelType === 'electric') {
    return 0;
  }

  const euroToDollar = 1.08;
  let rate = 0;

  if (fuelType === 'petrol') {
    rate = engineCapacity <= 3000 ? 50 : 100;
  } else if (fuelType === 'diesel') {
    rate = engineCapacity <= 3500 ? 75 : 150;
  } else if (fuelType === 'hybrid') {
    rate = engineCapacity <= 3000 ? 50 : 100;
  }

  const baseExcise = (engineCapacity / 1000) * rate * euroToDollar;
  const ageMultiplier = vehicleAge <= 5 ? 1 : vehicleAge - 1;

  return parseFloat((baseExcise * ageMultiplier).toFixed(0));
}

/**
 * Calculate VAT (Value-Added Tax)
 *
 * Formula: (carCost + importDuty + exciseTax) * 0.2
 *
 * Note: VAT is NOT applied to electric vehicles
 */
export function calculateVAT(
  fuelType: FuelType,
  carCost: number,
  importDuty: number,
  exciseTax: number
): number {
  if (fuelType === 'electric') {
    return 0;
  }

  return parseFloat(((carCost + importDuty + exciseTax) * 0.2).toFixed(0));
}

/**
 * Calculate Pension Fund contribution
 *
 * Formula: carCost * 0.03 (3%)
 */
export function calculatePension(carCost: number): number {
  return parseFloat((carCost * 0.03).toFixed(0));
}

/**
 * Calculate all customs, taxes, and fees
 *
 * @param auctionCost - Initial bid cost in auction
 * @param auctionFee - Auction fee
 * @param baseFee - Base fee (default: 1600)
 * @param fuelType - Type of fuel (petrol, diesel, hybrid, electric)
 * @param engineCapacity - Engine capacity in cm³ (or kW for electric)
 * @param yearOfManufacture - Year the vehicle was manufactured
 * @returns CustomsTaxResult object with all calculated fees
 */
export function calculateCustomsTaxes(
  auctionCost: number,
  auctionFee: number,
  baseFee: number = 1600,
  fuelType: FuelType,
  engineCapacity: number,
  yearOfManufacture: number
): CustomsTaxResult {
  // Calculate car cost
  const carCost = Number(auctionCost) + Number(auctionFee) + baseFee;

  // Calculate vehicle age
  const vehicleAge = calculateVehicleAge(yearOfManufacture);

  // Calculate customs fees
  const importDuty = calculateImportDuty(fuelType, carCost, engineCapacity);
  const exciseTax = calculateExciseTax(fuelType, engineCapacity, vehicleAge);
  const vat = calculateVAT(fuelType, carCost, importDuty, exciseTax);

  // Calculate totals
  const customFees = importDuty + exciseTax + vat;
  const totalCustomsFees = customFees + 150; // +150 broker fee

  // Calculate registration fees
  const pension = calculatePension(carCost);
  const certification = 150; // Fixed fee

  return {
    carCost,
    importDuty,
    exciseTax,
    vat,
    customFees,
    totalCustomsFees,
    pension,
    certification,
    vehicleAge,
    euroToDollar: 1.08,
  };
}

/**
 * Get detailed breakdown of excise tax calculation
 * Useful for debugging or displaying calculation steps
 */
export function getExciseTaxBreakdown(
  fuelType: FuelType,
  engineCapacity: number,
  vehicleAge: number
): {
  rate: number;
  baseAmount: number;
  ageMultiplier: number;
  finalAmount: number;
} {
  if (fuelType === 'electric') {
    return {
      rate: 0,
      baseAmount: 0,
      ageMultiplier: 0,
      finalAmount: 0,
    };
  }

  const euroToDollar = 1.08;
  let rate = 0;

  if (fuelType === 'petrol') {
    rate = engineCapacity <= 3000 ? 50 : 100;
  } else if (fuelType === 'diesel') {
    rate = engineCapacity <= 3500 ? 75 : 150;
  } else if (fuelType === 'hybrid') {
    rate = engineCapacity <= 3000 ? 50 : 100;
  }

  const liters = engineCapacity / 1000;
  const baseAmount = liters * rate * euroToDollar;
  const ageMultiplier = vehicleAge <= 5 ? 1 : vehicleAge - 1;
  const finalAmount = parseFloat((baseAmount * ageMultiplier).toFixed(0));

  return {
    rate,
    baseAmount: parseFloat(baseAmount.toFixed(2)),
    ageMultiplier,
    finalAmount,
  };
}
