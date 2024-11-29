'use client';
import useStore from '../../../app/zustand/useStore';
import translations from '../../../app/lang/calcResult.json';

const TotalAmountCalculator = ({data}) => {
  const language = useStore((state) => state.language);
  const t = translations[language];
  const { auction, auctionCost, engineCapacity, fuelType, transportType, yearOfManufacture, auctionLoc, departPort, deliveryPort} = data

  console.log(data);

  // auction fee
  let auctionFee = 0;

  if (auction === 'copart') {
    if (auctionCost >= 17500) auctionFee = 30 + 75 + auctionCost * 0.02;
    else if (auctionCost >= 4000) auctionFee = 30 + 75 + 350;
    else if (auctionCost >= 3000) auctionFee = 30 + 75 + 325;
    else if (auctionCost >= 2500) auctionFee = 30 + 75 + 300;
    else if (auctionCost >= 2000) auctionFee = 30 + 50 + 275;
    else if (auctionCost >= 1700) auctionFee = 30 + 50 + 250;
    else if (auctionCost >= 1400) auctionFee = 30 + 50 + 225;
    else if (auctionCost >= 1200) auctionFee = 30 + 50 + 200;
    else if (auctionCost >= 1000) auctionFee = 30 + 35 + 175;
    else if (auctionCost >= 800) auctionFee = 30 + 35 + 150;
    else if (auctionCost >= 600) auctionFee = 30 + 35 + 125;
    else if (auctionCost >= 400) auctionFee = 30 + 35 + 95;
    else if (auctionCost >= 200) auctionFee = 30 + 35 + 75;
    else if (auctionCost >= 100) auctionFee = 30 + 35 + 45;
    else auctionFee = 30 + 35 + 20;
  } else if (auction === 'iaai') {
    if (auctionCost >= 35000) auctionFee = 155 + 89 + auctionCost * 0.02;
    else if (auctionCost >= 30000) auctionFee = 155 + 89 + 700;
    else if (auctionCost >= 25000) auctionFee = 155 + 89 + 650;
    else if (auctionCost >= 20000) auctionFee = 155 + 89 + 600;
    else if (auctionCost >= 15000) auctionFee = 155 + 89 + 550;
    else if (auctionCost >= 10000) auctionFee = 155 + 89 + 500;
    else if (auctionCost >= 7500) auctionFee = 155 + 89 + 475;
    else if (auctionCost >= 5000) auctionFee = 155 + 89 + 450;
    else if (auctionCost >= 4000) auctionFee = 155 + 79 + 425;
    else if (auctionCost >= 3000) auctionFee = 155 + 69 + 400;
    else if (auctionCost >= 2700) auctionFee = 155 + 69 + 375;
    else if (auctionCost >= 2400) auctionFee = 155 + 69 + 350;
    else if (auctionCost >= 2000) auctionFee = 155 + 59 + 325;
    else if (auctionCost >= 1800) auctionFee = 155 + 59 + 300;
    else if (auctionCost >= 1600) auctionFee = 155 + 59 + 275;
    else if (auctionCost >= 1500) auctionFee = 155 + 49 + 250;
    else if (auctionCost >= 1400) auctionFee = 155 + 49 + 225;
    else if (auctionCost >= 1200) auctionFee = 155 + 49 + 200;
    else if (auctionCost >= 1000) auctionFee = 155 + 39 + 185;
    else if (auctionCost >= 900) auctionFee = 155 + 39 + 170;
    else if (auctionCost >= 700) auctionFee = 155 + 39 + 140;
    else if (auctionCost >= 600) auctionFee = 155 + 39 + 125;
    else if (auctionCost >= 500) auctionFee = 155 + 29 + 105;
    else if (auctionCost >= 400) auctionFee = 155 + 29 + 90;
    else if (auctionCost >= 300) auctionFee = 155 + 29 + 70;
    else if (auctionCost >= 200) auctionFee = 155 + 29 + 50;
    else if (auctionCost >= 100) auctionFee = 155 + 35;
    else auctionFee = 155 + 25;
  } else if (auction === 'manheim') {
    if (auctionCost >= 1001) auctionFee = 66 + auctionCost * 0.125;
    else if (auctionCost >= 501) auctionFee = 66 + 122;
    else if (auctionCost >= 201) auctionFee = 66 + 60;
    else auctionFee = 66 + 33;
  } else if (auction === 'adesa') {
    if (auctionCost >= 100000) auctionFee = 65 + 1100;
    else if (auctionCost >= 95000) auctionFee = 65 + 1050;
    else if (auctionCost >= 90000) auctionFee = 65 + 1000;
    else if (auctionCost >= 85000) auctionFee = 65 + 950;
    else if (auctionCost >= 80000) auctionFee = 65 + 900;
    else if (auctionCost >= 75000) auctionFee = 65 + 850;
    else if (auctionCost >= 70000) auctionFee = 65 + 795;
    else if (auctionCost >= 17000) auctionFee = 65 + 755;
    else if (auctionCost >= 15000) auctionFee = 65 + 695;
    else if (auctionCost >= 14000) auctionFee = 65 + 675;
    else if (auctionCost >= 13000) auctionFee = 65 + 625;
    else if (auctionCost >= 12000) auctionFee = 65 + 595;
    else if (auctionCost >= 11000) auctionFee = 65 + 575;
    else if (auctionCost >= 10000) auctionFee = 65 + 550;
    else if (auctionCost >= 9000) auctionFee = 65 + 495;
    else if (auctionCost >= 8000) auctionFee = 65 + 475;
    else if (auctionCost >= 7000) auctionFee = 65 + 455;
    else if (auctionCost >= 6000) auctionFee = 65 + 395;
    else if (auctionCost >= 5000) auctionFee = 65 + 385;
    else if (auctionCost >= 4000) auctionFee = 65 + 365;
    else if (auctionCost >= 3000) auctionFee = 65 + 345;
    else if (auctionCost >= 2000) auctionFee = 65 + 295;
    else if (auctionCost >= 1500) auctionFee = 65 + 275;
    else if (auctionCost >= 1000) auctionFee = 65 + 175;
    else auctionFee = 65 + 95;
  }
  // our fee
  let ourFee = 0;

  if (auctionCost < 10001 || !auctionCost) {
    ourFee = 300;
  } else if (auctionCost > 10000 && auctionCost < 15000) {
    ourFee = 400
  } else {ourFee = 500}

  // delivery 
  let usaDelivery = 150 + auctionLoc * 1;

  let seaDelivery = 0;

  if (deliveryPort === 'kl') {
    if (departPort === 'nj') {
      seaDelivery = 875;
    } else if (departPort === 'ga') {
      seaDelivery = 875;
    } else if (departPort === 'fl') {
      seaDelivery = 950;
    } else if (departPort === 'tx') {
      seaDelivery = 1025;
    } else if (departPort === 'ca') {
      seaDelivery = 1425;
    }
  } else {
    if (departPort === 'bt') {
      seaDelivery = 1200;
    } else if (departPort === 'ca') {
      seaDelivery = 1800;
    } else if (departPort === 'tx') {
      seaDelivery = 1500;
    } else if (departPort === 'ga') {
      seaDelivery = 1200;
    } else if (departPort === 'fl') {
      seaDelivery = 1350;
    }
  }

  if (seaDelivery > 0) {
    seaDelivery = seaDelivery * 1 + 400; 
  }

  let groundDelivery = 0;

  if (deliveryPort === 'kl') {
    groundDelivery = 350
  }

  const totalDelivery = usaDelivery * 1 + seaDelivery * 1 + groundDelivery * 1

  // customs 

  let importDuty = 0;
  if (transportType !== 'electric') {
    importDuty = auctionCost * 0.1;
  }

  const currentYear = new Date().getFullYear();
  const vehicleAge = currentYear - parseInt(yearOfManufacture, 10);

  let exciseTax = 0;
  if (fuelType === 'petrol') {
    exciseTax = engineCapacity / 1000 * (engineCapacity <= 3000 ? 50 : 100);
  } else if (fuelType === 'diesel') {
    exciseTax = engineCapacity / 1000 * (engineCapacity <= 3500 ? 75 : 150);
  } else if (fuelType === 'hybrid') {
    exciseTax = engineCapacity / 1000 * 50; 
  }

  exciseTax *= vehicleAge <= 5 ? 1 : vehicleAge - 5;

  let vat = 0;
  if (transportType !== 'electric') {
    vat = (auctionCost *1 + importDuty * 1 + exciseTax *1) * 0.2;
  }

  const totalCustomsFees = importDuty * 1 + exciseTax * 1 + vat * 1;

  const pension = 0.04 * auctionCost

  const totalDeliveryWithParking = totalDelivery + 330 + 30

  return (
    <div className="mobile:rounded-sub-block-10 tablet:rounded-sub-block-24 lg:rounded-sub-block-42 mobile:p-[20px] tablet:p-[80px] max-w-[940px] w-full bg-gradient-sub-block">
      <ul className="flex flex-col">
        <li className="border-b-[1px] border-solid border-primary">
          <div className="flex justify-between items-center">
            <div className="mobile:text-14 tablet:text-18 text-secondary font-semibold">
              {t.total}
            </div>
            <div className="mobile:text-14 tablet:text-18 text-primary font-semibold">
              $ {auctionCost ? auctionCost * 1 + auctionFee: '0'}
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

            <li className="flex items-center justify-between">
              <div className="mobile:text-[14px] leading-[48px] tablet:text-16 text-secondary font-semibold">
                {t.portDel}
              </div>
              <div className="flex-grow mx-[16px] h-[1px] bg-primary"></div>
              <div className="mobile:text-[14px] leading-[48px] tablet:text-16 text-secondary font-semibold">
                $ {usaDelivery ? usaDelivery : 0}
              </div>
            </li>

            <li className="flex items-center justify-between">
              <div className="mobile:text-[14px] leading-[48px] tablet:text-16 text-secondary font-semibold">
                {t.port_complex} 
              </div>
              <div className="flex-grow mx-[16px] h-[1px] bg-primary"></div>
              <div className="mobile:text-[14px] leading-[48px] tablet:text-16 text-secondary font-semibold">
                $ 330
              </div>
            </li>
            
            <li className="flex items-center justify-between">
              <div className="mobile:text-[14px] leading-[48px] tablet:text-16 text-secondary font-semibold">
                {t.port_parking}
              </div>
              <div className="flex-grow mx-[16px] h-[1px] bg-primary"></div>
              <div className="mobile:text-[14px] leading-[48px] tablet:text-16 text-secondary font-semibold">
                $ 30
              </div>
            </li>

            <li className="flex items-center justify-between">
              <div className="mobile:text-[14px] leading-[48px] tablet:text-16 text-secondary font-semibold">
                {t.vehicle_delivery}
              </div>
              <div className="flex-grow mx-[16px] h-[1px] bg-primary"></div>
              <div className="mobile:text-[14px] leading-[48px] tablet:text-16 text-secondary font-semibold">
                $ {seaDelivery ? seaDelivery : 500}
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
            </li> */}
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
            $ {totalCustomsFees ? 150 + 150 + pension + totalCustomsFees + totalDeliveryWithParking + ourFee + auctionCost * 1 + auctionFee : 0}
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
