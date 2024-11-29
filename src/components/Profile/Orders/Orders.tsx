const orders = [
  {
    orderNumber: '1589',
    vin: 'WGDGH2727DHDM338',
    purchaseDate: '12.11.2024',
    manufacturer: 'Mercedez',
    model: 'Amg GT',
    container: 'FHSHSH45G',
    containerOpenDate: '20.12.2024',
    debt: '$2202',
  },
  {
    orderNumber: '1589',
    vin: 'WGDGH2727DHDM338',
    purchaseDate: '12.11.2024',
    manufacturer: 'Mercedez',
    model: 'Amg GT',
    container: 'FHSHSH45G',
    containerOpenDate: '20.12.2024',
    debt: '$2202',
  },
  {
    orderNumber: '1589',
    vin: 'WGDGH2727DHDM338',
    purchaseDate: '12.11.2024',
    manufacturer: 'Mercedez',
    model: 'Amg GT',
    container: 'FHSHSH45G',
    containerOpenDate: '20.12.2024',
    debt: '$2202',
  },
];

const OrderTable = () => {
  return (
    <div className="p-[38px] bg-gradient-sub-block mobile:rounded-sub-block-10 tablet:rounded-sub-block-26 mt-[32px]">
      <h2 className="text-24 text-primary font-bold mb-[32px]">Мои заказы</h2>
      <ul className="hidden lg:grid grid-cols-8 py-[32px] border-b border-primary text-secondary tablet:text-[13px] desktop:text-18">
        <li className="font-semibold text-center">Номер заказа</li>
        <li className="font-semibold text-center">VIN код</li>
        <li className="font-semibold text-center">Дата покупки</li>
        <li className="font-semibold text-center">Производитель</li>
        <li className="font-semibold text-center">Модель</li>
        <li className="font-semibold text-center">Контейнер</li>
        <li className="font-semibold text-center">Контейнер открыт</li>
        <li className="font-semibold text-center">Долг</li>
      </ul>

      {orders.map((order, index) => (
        <div
          key={index}
          className={`grid lg:grid-cols-8 sm:grid-cols-4 grid-cols-2 py-[32px] border-t border-primary ${index === orders.length - 1 ? 'pb-0' : ''
            }`}
        >
          <div className="text-center mobile:text-12 tablet:text-18 lg:text-12 desktop:text-[13px] fullhd:text-18 text-primary font-semibold">
            {order.orderNumber}
            <span className="block lg:hidden text-secondary py-[5px]">
              Номер заказа
            </span>
          </div>
          <div className="text-center mobile:text-12 tablet:text-18 lg:text-12 desktop:text-[13px] fullhd:text-18 text-primary font-semibold bg-gradient-red bg-clip-text text-transparent">
            {order.vin}
            <span className="block lg:hidden text-secondary py-[5px]">
              VIN код
            </span>
          </div>
          <div className="text-center mobile:text-12 tablet:text-18 lg:text-12 desktop:text-[13px] fullhd:text-18 text-primary font-semibold">
            {order.purchaseDate}
            <span className="block lg:hidden text-secondary py-[5px]">
              Дата покупки
            </span>
          </div>
          <div className="text-center mobile:text-12 tablet:text-18 lg:text-12 desktop:text-[13px] fullhd:text-18 text-primary font-semibold">
            {order.manufacturer}
            <span className="block lg:hidden text-secondary py-[5px]">
              Производитель
            </span>
          </div>
          <div className="text-center mobile:text-12 tablet:text-18 lg:text-12 desktop:text-[13px] fullhd:text-18 text-primary font-semibold">
            {order.model}
            <span className="block lg:hidden text-secondary py-[5px]">
              Модель
            </span>
          </div>
          <div className="text-center mobile:text-12 tablet:text-18 lg:text-12 desktop:text-[13px] fullhd:text-18 text-primary font-semibold bg-gradient-red bg-clip-text text-transparent">
            {order.container}
            <span className="block lg:hidden text-secondary py-[5px]">
              Контейнер
            </span>
          </div>
          <div className="text-center mobile:text-12 tablet:text-18 lg:text-12 desktop:text-[13px] fullhd:text-18 text-primary font-semibold">
            {order.containerOpenDate}
            <span className="block lg:hidden text-secondary py-[5px]">
              Контейнер открыт
            </span>
          </div>
          <div className="text-center mobile:text-12 tablet:text-18 lg:text-12 desktop:text-[13px] fullhd:text-18 text-primary font-semibold">
            {order.debt}
            <span className="block lg:hidden text-secondary py-[5px]">
              Долг
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderTable;
