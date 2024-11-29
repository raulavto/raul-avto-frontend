import Link from 'next/link';

type ShowModalProps = {
  toggleModal: () => void;
};
const SelectedAuthRouts = ({ toggleModal }: ShowModalProps) => {
  return (
    <div className="flex flex-col w-[112px] rounded-sub-block-10 bg-input px-[24px] py-[14px]">
      <Link
        className="text-14 text-primary font-bold pb-[15px] transition-colors duration-300 ease-in-out hover:text-red-600 "
        href="/auth/login-client"
        onClick={toggleModal}
      >
        Клиент
      </Link>
      <div className="w-full h-[1px] bg-primary"></div>
      <Link
        className="text-14 text-primary font-bold pt-[15px] transition-colors duration-300 ease-in-out hover:text-red-600 "
        href="/auth/login-dealer"
        onClick={toggleModal}
      >
        Дилерам
      </Link>
    </div>
  );
};

export default SelectedAuthRouts;
