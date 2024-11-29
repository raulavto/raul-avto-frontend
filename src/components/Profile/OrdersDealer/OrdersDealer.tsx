import Image from 'next/image';
import Link from 'next/link';

const orders = [
  {
    id: 1,
    imgSrc: '/profile-order-car-img.png',
    model: '2014 AUDI A8',
    vin: 'WGDGH2727DHDM338',
    lotNumber: '53608073',
    saleDate: '2023-07-05',
    dealer: 'GOBADZE RAULI',
    port: 'PORT, Nj',
    containerNumber: 'FANUJ321172',
    destinationPort: 'Poti, Georgia',
    recipient: 'MAMUKASURMANIDZE',
    balance: 2220,
    paid: 9230,
    shippedDate: '22-02-2023',
    arrivedDate: '23-02-2023',
  },
  {
    id: 2,
    imgSrc: '/car-1.png',
    model: 'Bugatti',
    vin: 'WGDGH2727DHDM338',
    lotNumber: '53608073',
    saleDate: '2023-07-05',
    dealer: 'GOBADZE RAULI',
    port: 'PORT, Nj',
    containerNumber: 'FANUJ321172',
    destinationPort: 'Poti, Georgia',
    recipient: 'MAMUKASURMANIDZE',
    balance: 2220,
    paid: 9230,
    shippedDate: '22-02-2023',
    arrivedDate: '23-02-2023',
  },
  {
    id: 3,
    imgSrc: '/car-2.png',
    model: 'Volkswagen',
    vin: 'WGDGH2727DHDM338',
    lotNumber: '53608073',
    saleDate: '2023-07-05',
    dealer: 'GOBADZE RAULI',
    port: 'PORT, Nj',
    containerNumber: 'FANUJ321172',
    destinationPort: 'Poti, Georgia',
    recipient: 'MAMUKASURMANIDZE',
    balance: 2220,
    paid: 9230,
    shippedDate: '22-02-2023',
    arrivedDate: '23-02-2023',
  },
];

const OrdersDealer = () => {
  return (
    <div className="p-[38px] bg-gradient-sub-block mobile:rounded-sub-block-10 tablet:rounded-sub-block-26 mt-[32px] text-white">
      <h2 className="text-24 text-primary font-bold mb-[32px]">Мои заказы</h2>
      <ul>
        {orders.map((order, index) => (
          <li
            key={order.id}
            className={`py-[32px] flex flex-col lg:flex-row justify-between items-center border-t border-primary ${
              index === orders.length - 1 ? 'pb-0' : ''
            }`}
          >
            <div className="flex gap-[14px] mobile:mb-[40px] tablet:tablet:mb-[90px] lg:mb-0">
              <div className="flex items-center justify-center w-[46px] tablet:min-h-full lg:h-[195px] rounded-sub-block-8 bg-orderssubblock">
                <div className="text-primary text-[18px] font-semibold">
                  {index + 1}
                </div>
              </div>
              <div className="flex flex-col gap-[14px]">
                <div>
                  <Image
                    src={order.imgSrc}
                    alt={order.model}
                    width={240}
                    height={135}
                    className="rounded-lg mobile:w-[500px] mobile:h-[200px] tablet:w-[700px] tablet:h-[300px] lg:w-[240px] lg:h-[135px]"
                  />
                </div>
                <p className="flex items-center justify-center tablet:w-full lg:w-[240px] h-[46px] rounded-sub-block-8 bg-orderssubblock text-primary text-[16px] font-semibold">
                  Sale date: {order.saleDate}
                </p>
              </div>
            </div>
            <div className="flex flex-col mobile:items-center lg:items-start">
              <h3 className="mobile:text-30 tablet:text-40 lg:text-20 font-bold text-primary text-center">
                {order.model}
              </h3>
              <p className="mobile:text-[23px] tablet:text-[30px] lg:text-[12px] lg:leading-6 mobile:text-center lg:text-left desktop:text-18 text-primary font-semibold w-full">
                Vin:{' '}
                <span className="bg-gradient-red bg-clip-text text-transparent">
                  {order.vin}
                </span>
              </p>
              <p className="mobile:text-[23px] tablet:text-[30px] lg:text-[12px] desktop:text-16 text-secondary font-semibold text-center">
                Номер лота:{' '}
                <span className="text-primary">{order.lotNumber}</span>
              </p>
              <Link
                href={`/profile/${order.id}`}
                className="flex items-center justify-center bg-gradient-red mobile:text-[22px] lg:text-[12px] desktop:text-14 font-bold text-primary px-[24px] py-[14px] rounded-sub-block-10 mobile:w-full lg:w-[116px] mobile:h-[60px] lg:h-[40px] mobile:mb-[30px] tablet:mb-[90px] lg:mb-0 mt-[10px] focus:outline-focus outline-none"
              >
                Детально
              </Link>
            </div>
            <div className="flex flex-col gap-[16px]">
              <div className="flex flex-col mobile:items-center lg:items-start mobile:gap-[10px] tablet:gap-[30px] lg:gap-[16px] mobile:mb-[30px] tablet:tablet:mb-[90px] lg:mb-0">
                <p className="mobile:text-[22px] tablet:text-[30px] lg:text-[12px] desktop:text-[16px] mobile:leading-10 tablet:leading-6 text-secondary font-semibold text-center lg:tex-left">
                  Диллер:{' '}
                  <span className="text-primary font-semibold uppercase">
                    {order.dealer}
                  </span>
                </p>
                <p className="mobile:text-[22px] tablet:text-[30px] lg:text-[12px] desktop:text-[16px] mobile:leading-10 tablet:leading-6 text-secondary font-semibold text-center lg:tex-left">
                  Порт:{' '}
                  <span className="text-primary font-semibold uppercase">
                    {order.port}
                  </span>
                </p>
                <p className="mobile:text-[22px] tablet:text-[30px] lg:text-[12px] desktop:text-[16px] mobile:leading-10 tablet:leading-6 text-secondary font-semibold text-center lg:tex-left">
                  Номер контейнера:{' '}
                  <span className="text-primary font-semibold uppercase">
                    {order.containerNumber}
                  </span>
                </p>
                <p className="mobile:text-[22px] tablet:text-[30px] lg:text-[12px] desktop:text-[16px] mobile:leading-10 tablet:leading-6 text-secondary font-semibold text-center lg:tex-left">
                  Приемный порт:{' '}
                  <span className="text-primary font-semibold uppercase">
                    {order.destinationPort}
                  </span>
                </p>
                <p className="mobile:text-[22px] tablet:text-[30px] lg:text-[12px] desktop:text-[16px] mobile:leading-10 tablet:leading-6 text-secondary font-semibold text-center lg:tex-left">
                  Получатель:{' '}
                  <span className="text-primary font-semibold uppercase">
                    {order.recipient}
                  </span>
                </p>
              </div>
            </div>
            <div className="flex justify-center items-center flex-col gap-[12px] mobile:mb-[30px] lg:mb-0 mobile:w-full tablet:w-auto">
              <div className="flex items-center justify-center bg-balancegreen mobile:w-full lg:max-w-[250px] tablet:h-[60px] lg:h-[46px] text-primary tablet:text-[26px] lg:text-[12px] desktop:text-[16px] text-center leading-[22px] font-semibold p-[12px] rounded-sub-block-8">
                Баланс: {order.balance}
              </div>
              <div className="flex items-center justify-center bg-paid lg:max-w-[250px] mobile:w-full tablet:h-[60px] lg:h-[46px] text-primary lg:text-[12px] tablet:text-[26px] desktop:text-[16px] text-center leading-[22px] font-semibold p-[12px] rounded-sub-block-8">
                Оплачено: {order.paid}
              </div>
            </div>
            <div className="flex justify-between items-center flex-col gap-3 mobile:w-full tablet:w-auto">
              <div className="flex items-center justify-center bg-balancegreen mobile:w-full lg:max-w-[92px] w-full tablet:h-[60px] lg:h-[56px] p-3 rounded-sub-block-8 tablet:text-[18px] lg:text-[8px] desktop:text-[10px] text-primary text-center font-semibold">
                Отгружено {order.shippedDate}
              </div>
              <div className="flex items-center justify-center bg-arrived mobile:w-full lg:max-w-[92px] w-full tablet:h-[60px] lg:h-[56px] p-3 rounded-sub-block-8 tablet:text-[18px] lg:text-[8px] desktop:text-[10px] text-primary text-center font-semibold">
                Прибыло {order.arrivedDate}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrdersDealer;
