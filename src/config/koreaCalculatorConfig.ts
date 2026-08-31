/**
 * Тарифи калькулятора авто з Південної Кореї (RAUL AVTO).
 * Змінюйте лише цифри нижче — формули в коді чіпати не потрібно.
 */

export const koreaCalculatorConfig = {
  /** Огляд автомобіля (Етап 1), USD */
  inspection: 150,

  /** Доставка в порт Європи (Констанца), USD — редагується тут */
  deliveryToEuropePort: 2500,

  /** Погрузка автомобіля та експортні документи, USD */
  loadingAndExportDocs: 750,

  /** Комплекс у порту (відкриття контейнера / вивантаження), USD */
  portComplex: 800,

  /** Брокерські послуги, USD */
  broker: 150,

  /** Доставка транспортного засобу до пункту видачі, USD (базова) */
  deliveryToPickupPoint: 250,

  /**
   * Доплата до «Доставка до пункту видачі» залежно від порту приходу, USD.
   * База (deliveryToPickupPoint) + доплата нижче.
   */
  arrivalPortSurcharge: {
    /** Литва (Клайпеда) */
    klaipeda: 0,
    /** Румунія (Констанса) */
    constanta: 0,
    /** Україна (Одеса) — без доплати */
    odesa: 0,
  },

  /** Сертифікація, USD */
  certification: 150,

  /**
   * Внутрішній податок Кореї (KRW).
   * Додається до вартості в вонах ПЕРЕД конвертацією в USD.
   * Користувач цей додаток НЕ бачить.
   */
  hiddenTaxKrw: 440_000,

  /**
   * Курс конвертації KRW → USD.
   * Відображувана ціна: (вартість_KRW + hiddenTaxKrw) / krwToUsdRate
   */
  krwToUsdRate: 1440,

  /**
   * Fallback митної бази, якщо авто немає в жодній таблиці:
   * (KRW + hiddenTaxKrw) / krwToUsdRate + customsFallbackUsdAdd
   */
  customsFallbackUsdAdd: 1600,

  /**
   * «Наші послуги» — пороги від вартості авто в USD
   * (як у американському калькуляторі).
   */
  ourServices: {
    /** До $10 000 включно */
    under10000: 400,
    /** Від $10 001 до $15 000 */
    under15000: 500,
    /** Понад $15 000 */
    over15000: 600,
  },
} as const;

export type KoreaArrivalPort = keyof typeof koreaCalculatorConfig.arrivalPortSurcharge;

export type KoreaCalculatorConfig = typeof koreaCalculatorConfig;

export function getKoreaDeliveryPickupTotal(
  arrivalPort: KoreaArrivalPort | string | undefined
): number {
  const port =
    arrivalPort && arrivalPort in koreaCalculatorConfig.arrivalPortSurcharge
      ? (arrivalPort as KoreaArrivalPort)
      : 'odesa';
  return (
    koreaCalculatorConfig.deliveryToPickupPoint +
    koreaCalculatorConfig.arrivalPortSurcharge[port]
  );
}
