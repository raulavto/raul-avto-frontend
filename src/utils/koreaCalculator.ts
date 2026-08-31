/**
 * Розрахунок офіційних платежів для Кореї.
 * Формули мита/акцизу/ПДВ/пенсії — як у США,
 * але базова вартість: таблиця Кореї → загальні ризики → введена ціна.
 */
import {
  calculateImportDuty,
  calculateExciseTax,
  calculateVAT,
  calculatePension,
  calculateAgeCoefficient,
  calculateVehicleAge,
  type FuelType,
  type CustomsTaxResult,
} from '@/utils/customsTaxCalculator';

export function calculateKoreaOfficialPayments(
  customsBaseUsd: number,
  fuelType: FuelType,
  engineCapacity: number,
  yearOfManufacture: number,
  eurToUsdRate: number = 1.08,
  usdToUahRate: number = 41
): Pick<
  CustomsTaxResult,
  | 'carCost'
  | 'importDuty'
  | 'exciseTax'
  | 'vat'
  | 'customFees'
  | 'pension'
  | 'vehicleAge'
  | 'ageCoefficient'
  | 'euroToDollar'
> {
  const carCost = Number(customsBaseUsd) || 0;
  const importDuty = calculateImportDuty(fuelType, carCost);
  const exciseTax = calculateExciseTax(
    fuelType,
    engineCapacity,
    yearOfManufacture,
    eurToUsdRate
  );
  const vat = calculateVAT(carCost, importDuty, exciseTax);
  const customFees = importDuty + exciseTax + vat;
  const pension = calculatePension(carCost, usdToUahRate, fuelType);

  return {
    carCost,
    importDuty,
    exciseTax,
    vat,
    customFees,
    pension,
    vehicleAge: calculateVehicleAge(yearOfManufacture),
    ageCoefficient: calculateAgeCoefficient(yearOfManufacture),
    euroToDollar: eurToUsdRate,
  };
}
