'use client';
import DynamicForm from '@/components/UI/DynamicForm/DynamicForm';
import InputField from '@/components/UI/InputField/InputField';
import Button from '@/components/UI/Button/Button';
import Link from 'next/link';
import { FormikValues } from 'formik';

const initialValues = {
  email: '',
  password: '',
};
const LoginDealerForm = () => {
  const handleSubmit = (value: FormikValues) => {
    console.log(value);
  };
  return (
    <div className="max-w-[632px] w-full mobile:rounded-sub-block-16 tablet:rounded-sub-block-32 mobile:p-[20px] tablet:p-[64px] bg-gradient-sub-block">
      <div className="mobile:flex mobile:gap-6 tablet:gap-0 mobile:justify-center mobile:items-center tablet:items-start tablet:justify-between mobile:flex-col tablet:flex-row mb-[56px]">
        <div>
          <h1 className="mobile:text-30 mobile:text-center tablet:text-left tablet:text-40 text-primary font-bold mb-[24px]">
            Вход дилерам
          </h1>
          <p className="mobile:text-center tablet:text-left text-17 text-secondary font-medium">
            Войти через email и пароль
          </p>
        </div>
        <div>
          <Link
            className="bg-input text-primary text-14 font-bold rounded-sub-block-10 flex items-center justify-center px-[20px] py-[14px] w-[130px] h-[44px] transform transition duration-300 ease-in-out hover:scale-105 hover:text-hoverprimary focus:outline-focus outline-none"
            href="/auth/registration-dealer"
          >
            Регистрация
          </Link>
        </div>
      </div>
      <DynamicForm initialValues={initialValues} onSubmit={handleSubmit}>
        {(formikProps) => (
          <div className="flex flex-col items-center">
            <div className="mb-[24px] flex-1 w-full">
              <InputField
                type="text"
                name="email"
                label="Email"
                placeholder="Введите email"
                labelClassName="text-18 mb-[10px] font-semibold"
                inputClassName="placeholder:text-placeholderText placeholder:text-18 text-primary placeholder:font-semibold flex border-solid border-[1px] border-primary rounded-sub-block-12 bg-input px-[20px] py-[18px] w-full h-[60px]"
              />
            </div>
            <div className="mb-[8px] w-full">
              <InputField
                type="password"
                name="password"
                label="Пароль"
                placeholder="Введите пароль"
                labelClassName="text-18 mb-[10px] font-semibold"
                inputClassName="placeholder:text-placeholderText placeholder:text-18 text-primary placeholder:font-semibold border-solid border-[1px] border-primary rounded-sub-block-12 bg-input px-[20px] py-[18px] w-full h-[60px]"
              />
            </div>
            <Link
              className="flex text-primary text-14 font-semibold ml-auto mb-[20px] focus:outline-focus outline-none"
              href="/"
            >
              Забыли пароль?
            </Link>
            <Button
              className="bg-gradient-red text-primary text-18 font-bold rounded-sub-block-16 flex items-center justify-center px-[20px] py-[18px] w-full h-[60px]"
              type="submit"
            >
              Продолжить
            </Button>
          </div>
        )}
      </DynamicForm>
    </div>
  );
};

export default LoginDealerForm;
