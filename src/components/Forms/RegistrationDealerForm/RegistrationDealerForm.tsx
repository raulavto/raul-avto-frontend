'use client';
import DynamicForm from '@/components/UI/DynamicForm/DynamicForm';
import InputField from '@/components/UI/InputField/InputField';
import Button from '@/components/UI/Button/Button';
import Link from 'next/link';
import { FormikValues } from 'formik';

const initialValues = {
  email: '',
  phone: '',
  name: '',
  adress: '',
  password: '',
  retrypassword: '',
};

const RegistrationDealerForm = () => {
  const handleSubmit = (value: FormikValues) => {
    console.log(value);
  };
  return (
    <div className="max-w-[806px] w-full mobile:rounded-sub-block-16 tablet:rounded-sub-block-32 mobile:p-[20px] tablet:p-[64px] bg-gradient-sub-block">
      <div className="mobile:flex mobile:gap-6 tablet:gap-0 mobile:justify-center mobile:items-center tablet:items-start tablet:justify-between mobile:flex-col tablet:flex-row mb-[56px]">
        <div>
          <h1 className="mobile:text-30 mobile:text-center tablet:text-left tablet:text-40 text-primary font-bold mb-[24px]">
            Регистрация дилерам
          </h1>
          <p className="mobile:text-center tablet:text-left text-17 text-secondary font-medium">
            Отправьте заявку и мы позвоним, чтобы уточнить детали
          </p>
        </div>
        <div>
          <Link
            className="bg-input text-primary text-14 font-bold rounded-sub-block-10 flex items-center justify-center px-[20px] py-[14px] w-[130px] h-[44px] transform transition duration-300 ease-in-out hover:scale-105 hover:text-hoverprimary focus:outline-focus outline-none"
            href="/auth/login-dealer"
          >
            Войти
          </Link>
        </div>
      </div>
      <DynamicForm initialValues={initialValues} onSubmit={handleSubmit}>
        {(formikProps) => (
          <>
            <div className="grid mobile:grid-cols-1 tablet:grid-cols-2 gap-x-[20px] gap-y-[24px] w-full">
              <div className="w-full">
                <InputField
                  type="text"
                  name="email"
                  label="Email"
                  placeholder="Введите email"
                  labelClassName="text-18 mb-[10px] font-semibold"
                  inputClassName="placeholder:text-placeholderText placeholder:text-18 text-primary placeholder:font-semibold flex border-solid border-[1px] border-primary rounded-sub-block-12 bg-input px-[20px] py-[18px] w-full h-[60px]"
                />
              </div>
              <div className="w-full">
                <InputField
                  type="tel"
                  name="phone"
                  label="Телефон"
                  placeholder="Введите телефон"
                  labelClassName="text-18 mb-[10px] font-semibold"
                  inputClassName="placeholder:text-placeholderText placeholder:text-18 text-primary placeholder:font-semibold border-solid border-[1px] border-primary rounded-sub-block-12 bg-input px-[20px] py-[18px] w-full h-[60px]"
                />
              </div>
              <div className="w-full">
                <InputField
                  type="text"
                  name="name"
                  label="Имя, фамилия"
                  placeholder="Введите имя и фамилию"
                  labelClassName="text-18 mb-[10px] font-semibold"
                  inputClassName="placeholder:text-placeholderText mobile:placeholder:text-[14px] tablet:placeholder:text-18 text-primary placeholder:font-semibold flex border-solid border-[1px] border-primary rounded-sub-block-12 bg-input px-[20px] py-[18px] w-full h-[60px]"
                />
              </div>
              <div className="w-full">
                <InputField
                  type="text"
                  name="adress"
                  label="Адрес"
                  placeholder="Введите регион и адресс"
                  labelClassName="text-18 mb-[10px] font-semibold"
                  inputClassName="placeholder:text-placeholderText mobile:placeholder:text-[14px] tablet:placeholder:text-18 text-primary placeholder:font-semibold flex border-solid border-[1px] border-primary rounded-sub-block-12 bg-input px-[20px] py-[18px] w-full h-[60px]"
                />
              </div>
              <div className="w-full">
                <InputField
                  type="password"
                  name="password"
                  label="Пароль"
                  placeholder="Введите пароль"
                  labelClassName="text-18 mb-[10px] font-semibold"
                  inputClassName="placeholder:text-placeholderText placeholder:text-18 text-primary placeholder:font-semibold border-solid border-[1px] border-primary rounded-sub-block-12 bg-input px-[20px] py-[18px] w-full h-[60px]"
                />
              </div>
              <div className="w-full">
                <InputField
                  type="password"
                  name="retrypassword"
                  label="Повторите пароль"
                  placeholder="Повторите пароль"
                  labelClassName="text-18 mb-[10px] font-semibold"
                  inputClassName="placeholder:text-placeholderText placeholder:text-18 text-primary placeholder:font-semibold border-solid border-[1px] border-primary rounded-sub-block-12 bg-input px-[20px] py-[18px] w-full h-[60px]"
                />
              </div>
            </div>
            <Button
              className="bg-gradient-red text-primary text-18 font-bold rounded-sub-block-16 flex items-center justify-center px-[20px] py-[18px] max-w-[678px] w-full h-[60px] mt-[40px] "
              type="submit"
            >
              Отправить заявку на регистрацию
            </Button>
          </>
        )}
      </DynamicForm>
    </div>
  );
};

export default RegistrationDealerForm;
