import OrderFormModern from '../OrderFormModern/OrderFormModern';

const OrderBlock = () => {
  return (
    <section
      className="flex justify-center items-center tablet:py-[156px] relative tablet:bg-[url('/order-fon.jpg')] mobile:bg-no-repeat mobile:bg-center mobile:bg-cover"
      id="order-form"
    >
      <div className="absolute top-0 left-0 right-0 h-[40px] bg-gradient-to-b from-black to-transparent pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 right-0 h-[40px] bg-gradient-to-b from-transparent to-black pointer-events-none"></div>
      <div className="absolute inset-0 bg-black opacity-60"></div>
      <div className="z-10">
        <OrderFormModern />
      </div>
    </section>
  );
};

export default OrderBlock;
