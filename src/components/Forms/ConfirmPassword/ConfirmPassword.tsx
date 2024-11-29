'use client';
import DynamicForm from '@/components/UI/DynamicForm/DynamicForm';
import InputField from '@/components/UI/InputField/InputField';
import Button from '@/components/UI/Button/Button';
import { FormikValues } from 'formik';

const initialValues = {
  one: '',
  two: '',
  three: '',
  four: '',
  five: '',
  six: '',
};

const ConfirmPassword = () => {
  const handleSubmit = (value: FormikValues) => {
    console.log(value);
  };
  return (
    <div className="flex flex-col items-center justify-center bg-gradient-sub-block max-w-[544px] w-full mobile:rounded-sub-block-16 tablet:rounded-sub-block-32 p-[64px]">
      <h1 className="mobile:text-30 mobile:text-center tablet:text-40 text-primary font-bold mb-[24px]">
        Введите код
      </h1>
      <p className="text-secondary text-17 text-center  font-medium mb-[56px]">
        Мы выслали его Вам на почту
      </p>
      <DynamicForm initialValues={initialValues} onSubmit={handleSubmit}>
        {(formikProps) => (
          <>
            <div className="flex justify-center gap-[12px] mobile:flex-wrap tablet:flex-nowrap ">
              <div>
                <InputField
                  type="text"
                  name="one"
                  placeholder="-"
                  inputClassName="placeholder:text-placeholderText placeholder:text-18 text-primary placeholder:font-semibold flex border-solid border-[1px] border-primary rounded-sub-block-12 bg-input px-[20px] py-[18px] w-[59px] h-[72px] text-center"
                />
              </div>
              <div>
                <InputField
                  type="text"
                  name="two"
                  placeholder="-"
                  inputClassName="placeholder:text-placeholderText placeholder:text-18 text-primary placeholder:font-semibold flex border-solid border-[1px] border-primary rounded-sub-block-12 bg-input px-[20px] py-[18px] w-[59px] h-[72px] text-center"
                />
              </div>
              <div>
                <InputField
                  type="text"
                  name="three"
                  placeholder="-"
                  inputClassName="placeholder:text-placeholderText placeholder:text-18 text-primary placeholder:font-semibold flex border-solid border-[1px] border-primary rounded-sub-block-12 bg-input px-[20px] py-[18px] w-[59px] h-[72px] text-center"
                />
              </div>
              <div>
                <InputField
                  type="text"
                  name="four"
                  placeholder="-"
                  inputClassName="placeholder:text-placeholderText placeholder:text-18 text-primary placeholder:font-semibold flex border-solid border-[1px] border-primary rounded-sub-block-12 bg-input px-[20px] py-[18px] w-[59px] h-[72px] text-center"
                />
              </div>
              <div>
                <InputField
                  type="text"
                  name="five"
                  placeholder="-"
                  inputClassName="placeholder:text-placeholderText placeholder:text-18 text-primary placeholder:font-semibold flex border-solid border-[1px] border-primary rounded-sub-block-12 bg-input px-[20px] py-[18px] w-[59px] h-[72px] text-center"
                />
              </div>
              <div>
                <InputField
                  type="text"
                  name="six"
                  placeholder="-"
                  inputClassName="placeholder:text-placeholderText placeholder:text-18 text-primary placeholder:font-semibold flex border-solid border-[1px] border-primary rounded-sub-block-12 bg-input px-[20px] py-[18px] w-[59px] h-[72px] text-center"
                />
              </div>
            </div>
            <Button
              className="bg-gradient-red text-primary text-18 font-bold rounded-sub-block-16 flex items-center justify-center px-[20px] py-[18px] w-full h-[60px] mt-[40px] "
              type="submit"
            >
              Продолжить
            </Button>
          </>
        )}
      </DynamicForm>
    </div>
  );
};

export default ConfirmPassword;
