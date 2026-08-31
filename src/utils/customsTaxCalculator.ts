/**
 * Customs, Taxes, Pension and Fees Calculator
 *
 * Based on Ukrainian Tax Code (Art. 215) and 2026 first-registration rules.
 */

export type FuelType = 'petrol' | 'diesel' | 'hybrid' | 'electric';

export interface CustomsTaxResult {
  carCost: number;
  importDuty: number;
  exciseTax: number;
  vat: number;
  customFees: number;
  totalCustomsFees: number;
  pension: number;
  certification: number;
  vehicleAge: number;
  ageCoefficient: number;
  euroToDollar: number;
}

/** 2026 living wage for working-age persons (UAH) — used for pension brackets */
export const LIVING_WAGE_UAH_2026 = 3328;
export const PENSION_BRACKET_3_UAH = 165 * LIVING_WAGE_UAH_2026; // 549 120
export const PENSION_BRACKET_4_UAH = 290 * LIVING_WAGE_UAH_2026; // 965 120

const BROKER_FEE_USD = 150;
const CERTIFICATION_FEE_USD = 150;

/**
 * Full calendar years from the year AFTER manufacture to the tax year.
 * Квік (ПКУ ст. 215): min 1, max 15.
 * Example (2026): car 2021 → Квік = 4
 */
export function calculateAgeCoefficient(yearOfManufacture: number): number {
  const currentYear = new Date().getFullYear();
  const years = currentYear - yearOfManufacture - 1;
  return Math.min(15, Math.max(1, years));
}

export function calculateVehicleAge(yearOfManufacture: number): number {
  return new Date().getFullYear() - yearOfManufacture;
}

/**
 * Import duty (ввізне мито)
 * - ICE / hybrid: 10% of customs value
 * - Electric: 0%
 */
export function calculateImportDuty(
  fuelType: FuelType,
  carCost: number
): number {
  if (fuelType === 'electric') {
    return 0;
  }
  return parseFloat((carCost * 0.1).toFixed(0));
}

/**
 * Excise tax (акциз)
 *
 * ICE / hybrid: Ставка_базова × (см³ / 1000) × Квік × EUR→USD
 * Electric: 1 EUR × battery kWh × EUR→USD
 */
export function calculateExciseTax(
  fuelType: FuelType,
  engineCapacity: number,
  yearOfManufacture: number,
  eurToUsdRate: number = 1.08
): number {
  if (fuelType === 'electric') {
    // engineCapacity for EV = battery capacity in kWh
    return parseFloat((engineCapacity * eurToUsdRate).toFixed(0));
  }

  let rate = 0;
  if (fuelType === 'petrol' || fuelType === 'hybrid') {
    rate = engineCapacity <= 3000 ? 50 : 100;
  } else if (fuelType === 'diesel') {
    rate = engineCapacity <= 3500 ? 75 : 150;
  }

  const ageCoefficient = calculateAgeCoefficient(yearOfManufacture);
  const baseExcise = (engineCapacity / 1000) * rate * eurToUsdRate * ageCoefficient;

  return parseFloat(baseExcise.toFixed(0));
}

/**
 * VAT 20% of (customs value + import duty + excise).
 * Applies to all fuel types from 01.01.2026 (EV VAT benefit cancelled).
 */
export function calculateVAT(
  carCost: number,
  importDuty: number,
  exciseTax: number
): number {
  return parseFloat(((carCost + importDuty + exciseTax) * 0.2).toFixed(0));
}

/**
 * Pension fund on first registration (3% / 4% / 5%).
 * Base = vehicle cost without VAT (customs value), converted to UAH for brackets.
 * Pure electric (not hybrid): max $100.
 */
export function calculatePension(
  carCostUsd: number,
  usdToUahRate: number = 41,
  fuelType?: FuelType
): number {
  const costUah = carCostUsd * usdToUahRate;

  let rate = 0.03;
  if (costUah > PENSION_BRACKET_4_UAH) {
    rate = 0.05;
  } else if (costUah > PENSION_BRACKET_3_UAH) {
    rate = 0.04;
  }

  const pension = parseFloat((carCostUsd * rate).toFixed(0));
  if (fuelType === 'electric') {
    return Math.min(pension, 100);
  }
  return pension;
}

/**
 * Calculate all customs, taxes, and fees.
 *
 * @param engineCapacity - cm³ for ICE/hybrid, or battery kWh for electric
 */
export function calculateCustomsTaxes(
  auctionCost: number,
  auctionFee: number,
  baseFee: number = 1800,
  fuelType: FuelType,
  engineCapacity: number,
  yearOfManufacture: number,
  eurToUsdRate: number = 1.08,
  usdToUahRate: number = 41
): CustomsTaxResult {
  const carCost = Number(auctionCost) + Number(auctionFee) + baseFee;
  const vehicleAge = calculateVehicleAge(yearOfManufacture);
  const ageCoefficient = calculateAgeCoefficient(yearOfManufacture);

  const importDuty = calculateImportDuty(fuelType, carCost);
  const exciseTax = calculateExciseTax(
    fuelType,
    engineCapacity,
    yearOfManufacture,
    eurToUsdRate
  );
  const vat = calculateVAT(carCost, importDuty, exciseTax);

  const customFees = importDuty + exciseTax + vat;
  const totalCustomsFees = customFees + BROKER_FEE_USD;

  const pension = calculatePension(carCost, usdToUahRate, fuelType);
  const certification = CERTIFICATION_FEE_USD;

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
    ageCoefficient,
    euroToDollar: eurToUsdRate,
  };
}

/**
 * Detailed excise breakdown (debug / UI).
 */
export function getExciseTaxBreakdown(
  fuelType: FuelType,
  engineCapacity: number,
  yearOfManufacture: number,
  eurToUsdRate: number = 1.08
): {
  rate: number;
  baseAmount: number;
  ageCoefficient: number;
  finalAmount: number;
} {
  if (fuelType === 'electric') {
    const finalAmount = parseFloat((engineCapacity * eurToUsdRate).toFixed(0));
    return {
      rate: 1,
      baseAmount: parseFloat((engineCapacity * eurToUsdRate).toFixed(2)),
      ageCoefficient: 1,
      finalAmount,
    };
  }

  let rate = 0;
  if (fuelType === 'petrol' || fuelType === 'hybrid') {
    rate = engineCapacity <= 3000 ? 50 : 100;
  } else if (fuelType === 'diesel') {
    rate = engineCapacity <= 3500 ? 75 : 150;
  }

  const ageCoefficient = calculateAgeCoefficient(yearOfManufacture);
  const liters = engineCapacity / 1000;
  const baseAmount = liters * rate * eurToUsdRate;
  const finalAmount = parseFloat((baseAmount * ageCoefficient).toFixed(0));

  return {
    rate,
    baseAmount: parseFloat(baseAmount.toFixed(2)),
    ageCoefficient,
    finalAmount,
  };
}
