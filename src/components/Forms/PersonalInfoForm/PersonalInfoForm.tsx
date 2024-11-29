'use client';
import DynamicForm from '@/components/UI/DynamicForm/DynamicForm';
import InputField from '@/components/UI/InputField/InputField';
import Button from '@/components/UI/Button/Button';
import { FormikValues } from 'formik';

const initialValues = {
  name: '',
  email: '',
  phone: '',
  adress: '',
};
const PersonalInfoForm = () => {
  const handleSubmit = (value: FormikValues) => {
    console.log(value);
  };
  return (
    <div className="bg-gradient-sub-block mobile:rounded-sub-block-10 tablet:rounded-sub-block-26 p-[38px] mobile:w-full desktop:max-w-[1120px] w-full">
      <h2 className="text-primary text-24 font-bold mb-[32px]">
        Персональная информация
      </h2>
      <DynamicForm initialValues={initialValues} onSubmit={handleSubmit}>
        {(formikProps) => (
          <div className="flex flex-col gap-6">
            <div className="flex mobile:flex-col tablet:flex-row items-center gap-6 w-full">
              <div className="flex items-center gap-3 w-full">
                <div className="w-full">
                  <InputField
                    type="text"
                    name="name"
                    label="Имя, фамилия"
                    placeholder="Олег Купфер"
                    labelClassName="text-18 mb-[10px] font-semibold"
                    inputClassName="placeholder:text-placeholderText mobile:placeholder:text-[12px] tablet:placeholder:text-18 text-primary placeholder:font-semibold flex border-solid border-[1px] border-primary rounded-sub-block-12 bg-input px-[20px] py-[18px] mobile:h-[50px] w-full tablet:h-[60px]"
                  />
                </div>
                <div className="self-end">
                  <Button
                    className="flex items-center justify-center mobile:w-[100px] mobile:h-[50px] tablet:w-[126px] tablet:h-[60px] rounded-sub-block-12 bg-copybtn py-[18px] px-[20px] font-bold mobile:text-12 tablet:text-18 text-primary "
                    type="submit"
                  >
                    Изменить
                  </Button>
                </div>
              </div>
              <div className="flex items-center gap-3 w-full">
                <div className="w-full">
                  <InputField
                    type="text"
                    name="email"
                    label="Email"
                    placeholder="oleg173@gmail.com"
                    labelClassName="text-18 mb-[10px] font-semibold"
                    inputClassName="placeholder:text-placeholderText mobile:placeholder:text-[12px] tablet:placeholder:text-18  text-primary placeholder:font-semibold flex border-solid border-[1px] border-primary rounded-sub-block-12 bg-input px-[20px] py-[18px] w-full mobile:h-[50px] w-full tablet:h-[60px]"
                  />
                </div>
                <div className="self-end">
                  <Button
                    className="flex items-center justify-center mobile:w-[100px] mobile:h-[50px] tablet:w-[126px] tablet:h-[60px] rounded-sub-block-12 bg-copybtn py-[18px] px-[20px] font-bold mobile:text-12 tablet:text-18 text-primary "
                    type="submit"
                  >
                    Изменить
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex mobile:flex-col tablet:flex-row items-center gap-6">
              <div className="flex items-center gap-3 w-full">
                <div className="w-full">
                  <InputField
                    type="tel"
                    name="phone"
                    label="Телефон"
                    placeholder="+ 1 999 999 99 99"
                    labelClassName="text-18 mb-[10px] font-semibold"
                    inputClassName="placeholder:text-placeholderText mobile:placeholder:text-[12px] tablet:placeholder:text-18  text-primary placeholder:font-semibold flex border-solid border-[1px] border-primary rounded-sub-block-12 bg-input px-[20px] py-[18px] w-full mobile:h-[50px] w-full tablet:h-[60px]"
                  />
                </div>
                <div className="self-end">
                  <Button
                    className="flex items-center justify-center mobile:w-[100px] mobile:h-[50px] tablet:w-[126px] tablet:h-[60px] rounded-sub-block-12 bg-copybtn py-[18px] px-[20px] font-bold mobile:text-12 tablet:text-18 text-primary "
                    type="submit"
                  >
                    Изменить
                  </Button>
                </div>
              </div>
              <div className="flex items-center gap-3 w-full">
                <div className="w-full">
                  <InputField
                    type="text"
                    name="adress"
                    label="Адрес"
                    placeholder="Ukraine, Odessa, Lovtsovo 17 st."
                    labelClassName="text-18 mb-[10px] font-semibold"
                    inputClassName="placeholder:text-placeholderText mobile:placeholder:text-[12px] tablet:placeholder:text-18  text-primary placeholder:font-semibold flex border-solid border-[1px] border-primary rounded-sub-block-12 bg-input px-[20px] py-[18px] mobile:h-[50px] tablet:h-[60px] w-full"
                  />
                </div>
                <div className="self-end">
                  <Button
                    className="flex items-center justify-center mobile:w-[100px] mobile:h-[50px] tablet:w-[126px] tablet:h-[60px] rounded-sub-block-12 bg-copybtn py-[18px] px-[20px] font-bold mobile:text-12 tablet:text-18 text-primary "
                    type="submit"
                  >
                    Изменить
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </DynamicForm>
    </div>
  );
};

export default PersonalInfoForm;
