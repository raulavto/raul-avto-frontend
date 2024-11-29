import PersonalInfoForm from '@/components/Forms/PersonalInfoForm/PersonalInfoForm';
import ChangePassword from '@/components/Forms/ChangePassword/ChangePassword';
import OrderTable from '../Orders/Orders';
import OrdersDealer from '../OrdersDealer/OrdersDealer';
const ProfileComponent = () => {
  return (
    <div className="mobile:pt-[30px] tablet:pt-[70px] desktop:pt-[127px] pb-[39px]">
      <h1 className="mb-[40px] font-bold mobile:text-24 tablet:text-34 desktop:text-40 text-primary">
        Личный кабинет
      </h1>
      <div className="flex items-center justify-center gap-[32px] mobile:flex-wrap desktop:flex-nowrap">
        <PersonalInfoForm />
        <ChangePassword />
      </div>
      <OrderTable />
      <OrdersDealer />
    </div>
  );
};

export default ProfileComponent;
