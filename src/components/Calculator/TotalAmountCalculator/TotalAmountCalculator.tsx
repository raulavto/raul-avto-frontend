'use client';
import useStore from '../../../app/zustand/useStore';
import translations from '../../../app/lang/calcResult.json';
import { liveBidFees, unsecuredPaymentMethods } from './fees';

const baseFee = 1600;

const TotalAmountCalculator = ({ data }) => {
  console.log('🚀 ~ TotalAmountCalculator ~ data:', data);
  const language = useStore((state) => state.language);
  const t = translations[language];
  const {
    auction,
    auctionCost,
    engineCapacity,
    fuelType,
    transportType,
    yearOfManufacture,
    auctionLoc,
    departPort,
    deliveryPort,
  } = data;

  // auction fee
  const getAuctionFee = (auctionCost: number) => {
    const firstFee = 419; //initial: 129, increase: 290

    const secondFee =
      unsecuredPaymentMethods.find(
        (fee) => auctionCost >= fee.min && auctionCost <= fee.max
      )?.fee || 0;

    // Якщо вартість більше 15000, то враховуємо відсоток
    let secondFeeAmount = 0;
    if (auctionCost >= 15000) {
      secondFeeAmount = auctionCost * secondFee;
    } else {
      secondFeeAmount = secondFee;
    }

    const thirdFee =
      liveBidFees.find(
        (fee) => auctionCost >= fee.min && auctionCost <= fee.max
      )?.fee || 0;

    return firstFee + secondFeeAmount + thirdFee;
  };

  const auctionFee = parseFloat(getAuctionFee(auctionCost).toFixed(0));
  const auctionTotal = auctionCost * 1 + auctionFee;

  // our fee
  let ourFee = 0;

  if (auctionTotal < 10001 || !auctionTotal) {
    ourFee = 400;
  } else if (auctionTotal > 10000 && auctionTotal < 15001) {
    ourFee = 500;
  } else {
    ourFee = 600;
  }

  // delivery
  let usaDelivery = 150 + auctionLoc * 1;

  let seaDelivery = 0;

  if (deliveryPort === 'kl') {
    if (departPort === 'NJ') {
      // motorcyle isnt specified initially
      if (transportType === 'sedan' || transportType === 'motorcycle') {
        seaDelivery = 1275;
      } else if (transportType === 'suv') {
        seaDelivery = 1387;
      } else if (transportType === 'mediumSuv') {
        seaDelivery = 1587;
      }
    } else if (departPort === 'GA') {
      if (transportType === 'sedan' || transportType === 'motorcycle') {
        seaDelivery = 1275;
      } else if (transportType === 'suv') {
        seaDelivery = 1375;
      } else if (transportType === 'mediumSuv') {
        seaDelivery = 1575;
      }
    } else if (departPort === 'FL') {
      if (transportType === 'sedan' || transportType === 'motorcycle') {
        seaDelivery = 1350;
      } else if (transportType === 'suv') {
        seaDelivery = 1450;
      } else if (transportType === 'mediumSuv') {
        seaDelivery = 1650;
      }
    } else if (departPort === 'TX') {
      if (transportType === 'sedan' || transportType === 'motorcycle') {
        seaDelivery = 1425;
      } else if (transportType === 'suv') {
        seaDelivery = 1525;
      } else if (transportType === 'mediumSuv') {
        seaDelivery = 1725;
      }
    } else if (departPort === 'CA') {
      if (transportType === 'sedan' || transportType === 'motorcycle') {
        seaDelivery = 1775;
      } else if (transportType === 'suv') {
        seaDelivery = 1925;
      } else if (transportType === 'mediumSuv') {
        seaDelivery = 2125;
      }
    }
  } else if (deliveryPort === 'bt') {
    if (departPort === 'NY') {
      seaDelivery = 1200;
    } else if (departPort === 'CA') {
      seaDelivery = 1800;
    } else if (departPort === 'TX') {
      seaDelivery = 1500;
    } else if (departPort === 'Savannah') {
      seaDelivery = 1200;
    } else if (departPort === 'FL') {
      seaDelivery = 1350;
    }
  } else {
    if (departPort === 'NY') {
      seaDelivery = 1925;
    } else if (departPort === 'CA') {
      seaDelivery = 2625;
    } else if (departPort === 'TX') {
      seaDelivery = 2025;
    } else if (departPort === 'Savannah') {
      seaDelivery = 1925;
    } else if (departPort === 'FL') {
      seaDelivery = 1800;
    }
  }

  if (seaDelivery > 0 && deliveryPort === 'kl') {
    seaDelivery = seaDelivery + 500;
  } else if (seaDelivery > 0) {
    seaDelivery = seaDelivery + 300;
  }

  // Sea delivery total
  const totalSeaDelivery = seaDelivery * 1 + data.cityCost * 1;

  let groundDelivery = 0;

  if (deliveryPort === 'kl') {
    groundDelivery = 1050;
  } else if (deliveryPort === 'adesa') {
    groundDelivery = 200;
  }

  const totalDelivery = totalSeaDelivery + groundDelivery * 1;

  const carCost = Number(auctionCost) + Number(auctionFee) + baseFee;
  // customs

  let importDuty = 0;
  if (fuelType === 'electric') {
    importDuty = engineCapacity * 1; // 1 kW = 1 EUR
  } else {
    importDuty = parseFloat((carCost * 0.1).toFixed(0));
  }

  const currentYear = new Date().getFullYear();
  const vehicleAge = currentYear - parseInt(yearOfManufacture, 10);

  let exciseTax = 0;
  const euroToDollar = 1.08;

  if (fuelType === 'petrol') {
    exciseTax = parseFloat(
      (
        (engineCapacity / 1000) *
        (engineCapacity <= 3000 ? 50 : 100) *
        euroToDollar
      ).toFixed(0)
    );
  } else if (fuelType === 'diesel') {
    exciseTax = parseFloat(
      (
        (engineCapacity / 1000) *
        (engineCapacity <= 3500 ? 75 : 150) *
        euroToDollar
      ).toFixed(0)
    );
  } else if (fuelType === 'hybrid') {
    exciseTax = parseFloat(
      (
        (engineCapacity / 1000) *
        (engineCapacity <= 3000 ? 50 : 100) *
        euroToDollar
      ).toFixed(0)
    );
  }

  exciseTax *= vehicleAge <= 5 ? 1 : vehicleAge - 1;

  let vat = 0;
  if (fuelType !== 'electric') {
    vat = parseFloat(
      ((carCost + importDuty * 1 + exciseTax * 1) * 0.2).toFixed(0)
    );
  }

  const customFees = importDuty * 1 + exciseTax * 1 + vat * 1;

  const totalCustomsFees = customFees + 150;

  const pension = parseFloat((0.03 * carCost).toFixed(0));

  // Port Complex and Port Parking
  const totalDeliveryWithParking = totalDelivery + 360 + 60;

  return (
    <div className="mobile:rounded-sub-block-10 tablet:rounded-sub-block-24 lg:rounded-sub-block-42 mobile:p-[20px] tablet:p-[80px] max-w-[940px] w-full bg-gradient-sub-block">
      <ul className="flex flex-col">
        <li className="border-b-[1px] border-solid border-primary">
          <div className="flex justify-between items-center">
            <div className="mobile:text-14 tablet:text-18 text-secondary font-semibold">
              {t.total}
            </div>
            <div className="mobile:text-14 tablet:text-18 text-primary font-semibold">
              $ {auctionTotal ? auctionTotal : '0'}
            </div>
          </div>
          <ul className="mobile:ml-0 tablet:ml-[72px]">
            <li className="flex items-center justify-between">
              <div className="mobile:text-[14px] leading-[48px] tablet:text-16 text-secondary font-semibold">
                {t.initial_bid}
              </div>
              <div className="flex-grow mx-[16px] h-[1px] bg-primary"></div>
              <div className="mobile:text-[14px] leading-[48px] tablet:text-16 text-secondary font-semibold">
                $ {auctionCost ? auctionCost : '0'}
              </div>
            </li>
            <li className="flex items-center justify-between">
              <div className="mobile:text-[14px] leading-[48px] tablet:text-16 text-secondary font-semibold">
                {t.auction_fee}
              </div>
              <div className="flex-grow mx-[16px] h-[1px] bg-primary"></div>
              <div className="mobile:text-[14px] leading-[48px] tablet:text-16 text-secondary font-semibold">
                $ {auctionFee ? auctionFee : '0'}
              </div>
            </li>
          </ul>
        </li>
        <li className="border-b-[1px] border-solid border-primary pt-4">
          <div className="flex justify-between items-center mb-4">
            <div className="mobile:text-14 tablet:text-18 text-secondary font-semibold">
              {t.our_services}
            </div>
            <div className="mobile:text-14 tablet:text-18 text-primary font-semibold">
              $ {ourFee ? ourFee : 100}
            </div>
          </div>
        </li>
        <li className="border-b-[1px] border-solid border-primary pt-4">
          <div className="flex justify-between items-center">
            <div className="mobile:text-14 tablet:text-18 text-secondary font-semibold">
              {t.delivery}
            </div>
            <div className="mobile:text-14 tablet:text-18 text-primary font-semibold">
              $ {totalDeliveryWithParking ? totalDeliveryWithParking : 0}
            </div>
          </div>

          <ul className="mobile:ml-0 tablet:ml-[72px]">
            {/* <li className="flex items-center justify-between">
              <div className="mobile:text-[14px] leading-[48px] tablet:text-16 text-secondary font-semibold">
                {t.portDel}
              </div>
              <div className="flex-grow mx-[16px] h-[1px] bg-primary"></div>
              <div className="mobile:text-[14px] leading-[48px] tablet:text-16 text-secondary font-semibold">
                $ {data.cityCost ? data.cityCost : 0}
              </div>
            </li>
            <li className="flex items-center justify-between">
              <div className="mobile:text-[14px] leading-[48px] tablet:text-16 text-secondary font-semibold">
                {t.vehicle_delivery}
              </div>
              <div className="flex-grow mx-[16px] h-[1px] bg-primary"></div>
              <div className="mobile:text-[14px] leading-[48px] tablet:text-16 text-secondary font-semibold">
                $ {seaDelivery ? seaDelivery : 0}
              </div>
            </li> */}
            <li className="flex items-center justify-between">
              <div className="mobile:text-[14px] leading-[48px] tablet:text-16 text-secondary font-semibold">
                {t.delivery_to_port}
              </div>
              <div className="flex-grow mx-[16px] h-[1px] bg-primary"></div>
              <div className="mobile:text-[14px] leading-[48px] tablet:text-16 text-secondary font-semibold">
                $ {totalSeaDelivery ? totalSeaDelivery : '0'}
              </div>
            </li>
            <li className="flex items-center justify-between">
              <div className="mobile:text-[14px] leading-[48px] tablet:text-16 text-secondary font-semibold">
                {t.port_complex}
              </div>
              <div className="flex-grow mx-[16px] h-[1px] bg-primary"></div>
              <div className="mobile:text-[14px] leading-[48px] tablet:text-16 text-secondary font-semibold">
                $ 360
              </div>
            </li>
            <li className="flex items-center justify-between">
              <div className="mobile:text-[14px] leading-[48px] tablet:text-16 text-secondary font-semibold">
                {t.port_parking}
              </div>
              <div className="flex-grow mx-[16px] h-[1px] bg-primary"></div>
              <div className="mobile:text-[14px] leading-[48px] tablet:text-16 text-secondary font-semibold">
                $ 60
              </div>
            </li>
            <li className="flex items-center justify-between">
              <div className="mobile:text-[14px] leading-[48px] tablet:text-16 text-secondary font-semibold">
                {t.ukrDel}
              </div>
              <div className="flex-grow mx-[16px] h-[1px] bg-primary"></div>
              <div className="mobile:text-[14px] leading-[48px] tablet:text-16 text-secondary font-semibold">
                $ {groundDelivery ? groundDelivery : 0}
              </div>
            </li>
          </ul>
        </li>
        <li className="border-b-[1px] border-solid border-primary pt-4">
          <div className="flex justify-between items-center">
            <div className="mobile:text-14 tablet:text-18 text-secondary font-semibold">
              {t.customs_clearance}
            </div>
            <div className="mobile:text-14 tablet:text-18 text-primary font-semibold">
              $ {totalCustomsFees ? totalCustomsFees : 0}
            </div>
          </div>
          <ul className="mobile:ml-0 tablet:ml-[72px]">
            <li className="flex items-center justify-between">
              <div className="mobile:text-[14px] leading-[48px] tablet:text-16 text-secondary font-semibold">
                {t.broker}
              </div>
              <div className="flex-grow mx-[16px] h-[1px] bg-primary"></div>
              <div className="mobile:text-[14px] leading-[48px] tablet:text-16 text-secondary font-semibold">
                $ 150
              </div>
            </li>
            {/* <li className="flex items-center justify-between">
              <div className="mobile:text-[14px] leading-[48px] tablet:text-16 text-secondary font-semibold">
                {t.official_payments}
              </div>
              <div className="flex-grow mx-[16px] h-[1px] bg-primary"></div>
              <div className="mobile:text-[14px] leading-[48px] tablet:text-16 text-secondary font-semibold">
                $ 0
              </div>
            </li>
            <li className="flex items-center justify-between">
              <div className="mobile:text-[14px] leading-[48px] tablet:text-16 text-secondary font-semibold">
                {t.import_duty}
              </div>
              <div className="flex-grow mx-[16px] h-[1px] bg-primary"></div>
              <div className="mobile:text-[14px] leading-[48px] tablet:text-16 text-secondary font-semibold">
                $ {importDuty ? importDuty : 0}
              </div>
            </li>
            <li className="flex items-center justify-between">
              <div className="mobile:text-[14px] leading-[48px] tablet:text-16 text-secondary font-semibold">
                {t.excise_tax}
              </div>
              <div className="flex-grow mx-[16px] h-[1px] bg-primary"></div>
              <div className="mobile:text-[14px] leading-[48px] tablet:text-16 text-secondary font-semibold">
                $ {exciseTax ? exciseTax : 0}
              </div>
            </li>
            <li className="flex items-center justify-between">
              <div className="mobile:text-[14px] leading-[48px] tablet:text-16 text-secondary font-semibold">
                {t.vat}
              </div>
              <div className="flex-grow mx-[16px] h-[1px] bg-primary"></div>
              <div className="mobile:text-[14px] leading-[48px] tablet:text-16 text-secondary font-semibold">
                $ {vat ? vat : 0}
              </div>
            </li> */}
            <li className="flex items-center justify-between">
              <div className="mobile:text-[14px] leading-[48px] tablet:text-16 text-secondary font-semibold">
                {t.custom_fees}
              </div>
              <div className="flex-grow mx-[16px] h-[1px] bg-primary"></div>
              <div className="mobile:text-[14px] leading-[48px] tablet:text-16 text-secondary font-semibold">
                $ {customFees ? customFees : 0}
              </div>
            </li>
          </ul>
        </li>
        <li className="border-b-[1px] border-solid border-primary pt-4">
          <div className="flex justify-between items-center">
            <div className="mobile:text-14 tablet:text-18 text-secondary font-semibold">
              {t.registration}
            </div>
            <div className="mobile:text-14 tablet:text-18 text-primary font-semibold">
              $ {pension ? 150 + pension : 0}
            </div>
          </div>
          <ul className="mobile:ml-0 tablet:ml-[72px]">
            <li className="flex items-center justify-between">
              <div className="mobile:text-[14px] leading-[48px] tablet:text-16 text-secondary font-semibold">
                {t.certification}
              </div>
              <div className="flex-grow mx-[16px] h-[1px] bg-primary"></div>
              <div className="mobile:text-[14px] leading-[48px] tablet:text-16 text-secondary font-semibold">
                $ 150
              </div>
            </li>
            <li className="flex items-center justify-between">
              <div className="mobile:text-[14px] leading-[48px] tablet:text-16 text-secondary font-semibold">
                {t.pension_fund}
              </div>
              <div className="flex-grow mx-[16px] h-[1px] bg-primary"></div>
              <div className="mobile:text-[14px] leading-[48px] tablet:text-16 text-secondary font-semibold">
                $ {pension ? pension : 0}
              </div>
            </li>
          </ul>
        </li>
      </ul>
      <div className="pt-[24px]">
        <div className="flex items-center justify-between mb-[12px]">
          <div className="text-primary text-20 font-semibold">
            {t.total_cost}
          </div>
          <div className="text-primary text-20 font-semibold">
            ${' '}
            {totalCustomsFees
              ? +150 +
                pension +
                totalCustomsFees +
                totalDeliveryWithParking +
                ourFee +
                auctionCost * 1 +
                auctionFee
              : 0}
          </div>
        </div>
        <p className="max-w-[380px] -mb-6 text-12 text-secondary">
          {t.disclaimer}
        </p>
        {/* <button className="bg-primary text-white font-semibold py-[10px] px-[24px] rounded-lg">
          {t.more_details}
        </button> */}
      </div>
    </div>
  );
};

export default TotalAmountCalculator;
