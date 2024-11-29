'use client';
import InputField from '@/components/UI/InputField/InputField';
import Button from '@/components/UI/Button/Button';
import DynamicForm from '@/components/UI/DynamicForm/DynamicForm';
import Container from '@/components/Container/Container';
import { FormikHelpers, FormikValues } from 'formik';
import { useState } from 'react';
import { Slider } from '@nextui-org/react';
import useStore from '@/app/zustand/useStore';
import translations from '../../../app/lang/orderFormModern.json';
import translationsValidation from '../../../app/lang/formCall.json';
import { sendMessage } from '@/app/utils/sendMessage';
import Notification from '@/components/UI/Notification/Notification';
import * as yup from 'yup';
import { isValidPhoneNumber } from 'libphonenumber-js';

interface FormCallValues {
  name: string;
  phoneNumber: string;
  brand: string;
  model: string;
  mileage: [number, number];
  year: [number, number];
}

const initialValues: FormCallValues = {
  name: '',
  phoneNumber: '',
  brand: '',
  model: '',
  mileage: [50000, 200000],
  year: [2000, new Date().getFullYear()],
};

const OrderFormModern = () => {
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [mileage, setMileage] = useState([50000, 200000]);
  const [year, setYear] = useState([2000, new Date().getFullYear()]);
  const language = useStore((state) => state.language);
  const t = translations[language];
  const tValidation = translationsValidation[language];

  const validationSchema = yup.object({
    name: yup.string().required(`${tValidation.name_required}`),
    phoneNumber: yup
      .string()
      .test(
        'valid-phone',
        `${tValidation.phone_invalid}`,
        (value) => value && isValidPhoneNumber(value)
      )
      .required(`${tValidation.phone_required}`),
    brand: yup.string().required(`${tValidation.brand_required}`),
    model: yup.string().required(`${tValidation.model_required}`),
  });

  const handleSubmit = (
    values: FormikValues,
    formikHelpers: FormikHelpers<FormCallValues>
  ) => {
    const { resetForm } = formikHelpers;
    const message = `
      Заявка на подбор авто: имя:${values.name},телефон:${values.phoneNumber},марка:${values.brand},модель:${values.model},пробег:${values.mileage[0]} - ${values.mileage[1]} км,год:${values.year[0]} - ${values.year[1]}
    `;
    sendMessage(message);
    resetForm();
    // Сброс значений ползунков
    setMileage([50000, 200000]);
    setYear([2000, new Date().getFullYear()]);
    setNotificationVisible(true);
  };
  return (
    <Container>
      <section className="relative bg-white rounded-[20px] py-[32px] tabletplus:py-[50px] tabletplus:px-[80px] px-[35px]">
        <DynamicForm
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {(formikProps) => (
            <div>
              <h2 className="mx-auto max-w-[225px] tablet:max-w-full text-center text-[24px] tabletplus:text-[32px] font-semibold mb-[10px] tabletplus:mb-[14px]">
                {t.order_title}
              </h2>
              <p className="mx-auto max-w-[235px] tabletplus:max-w-[320px] text-center text-[14px] tabletplus:text-[16px] mb-[24px] tabletplus:mb-[49px]">
                {t.order_subtitle}
              </p>
              <div className="tablet:mb-[26px] tablet:max-w-[470px] tablet:w-full tablet:flex tablet:flex-wrap tablet:gap-x-[20px] tablet:gap-y-[8px]">
                <div className="mx-auto max-w-[243px] tabletplus:max-w-[225px] mb-[12px] tablet:mb-0">
                  <InputField
                    type="text"
                    name="name"
                    placeholder={t.input_name}
                    inputClassName="input-order-bg border-[1px] border-gray-400 px-[16px] w-full h-[40px] rounded-[12px] placeholder:text-[12px] placeholder:text-[#a1a1aa] text-black"
                    errorClassName="text-red-500 text-[8px] mt-1"
                  />
                </div>
                <div className="mx-auto max-w-[243px] tabletplus:max-w-[225px] mb-[12px] tablet:mb-0">
                  <InputField
                    type="text"
                    name="phoneNumber"
                    placeholder={t.input_phone}
                    inputClassName="input-order-bg border-[1px] border-gray-400 px-[16px] w-full h-[40px] rounded-[12px] placeholder:text-[12px] placeholder:text-[#a1a1aa] text-black"
                    errorClassName="text-red-500 text-[8px] mt-1"
                  />
                </div>
                <div className="mx-auto max-w-[243px] tabletplus:max-w-[225px] mb-[12px] tablet:mb-0">
                  <InputField
                    type="text"
                    name="brand"
                    placeholder={t.input_brand}
                    inputClassName="input-order-bg border-[1px] border-gray-400 px-[16px] w-full h-[40px] rounded-[12px] placeholder:text-[12px] placeholder:text-[#a1a1aa] text-black"
                    errorClassName="text-red-500 text-[8px] mt-1"
                  />
                </div>
                <div className="mx-auto max-w-[243px] tabletplus:max-w-[225px] mb-[20px] tablet:mb-0">
                  <InputField
                    type="text"
                    name="model"
                    placeholder={t.input_model}
                    inputClassName="input-order-bg border-[1px] border-gray-400 px-[16px] w-full h-[40px] rounded-[12px] placeholder:text-[12px] placeholder:text-[#a1a1aa] text-black"
                    errorClassName="text-red-500 text-[8px] mt-1"
                  />
                </div>
              </div>
              <div className="tablet:flex tablet:gap-[20px] tablet:w-full tablet:mb-[50px]">
                <div className="max-w-[243px] tablet:w-full mb-[20px] tablet:mb-0">
                  <Slider
                    label={t.mileage_label}
                    step={5000}
                    minValue={50000}
                    maxValue={200000}
                    value={mileage}
                    defaultValue={[mileage[0], mileage[1]]}
                    onChange={(values: number[]) => {
                      setMileage(values);
                      formikProps.setFieldValue('mileage', values);
                    }}
                    formatOptions={{ style: 'unit', unit: 'kilometer' }}
                    classNames={{
                      track: 'h-[2px]', // Линия слайдера
                      filler: 'bg-red-600', // Заполнение слева до ползунка
                      label: 'text-[12px] mb-[8px] font-medium', // Лейбл
                    }}
                    renderValue={(props) => (
                      <output {...props}>
                        {mileage[0] === 50000 && mileage[1] === 200000
                          ? null
                          : `${mileage[0]} - ${mileage[1]} км`}
                      </output>
                    )}
                    renderThumb={(props) => (
                      <div
                        {...props}
                        className="group p-1 top-1/2 bg-background rounded-full cursor-grab data-[dragging=true]:cursor-grabbing"
                      >
                        <span className="bg-red-600 w-4 h-4 rounded-full block group-data-[dragging=true]:scale-90" />
                      </div>
                    )}
                  />
                </div>
                <div className="max-w-[243px] tablet:w-full mb-[36px] tablet:mb-0">
                  <Slider
                    label={t.year_label}
                    step={1}
                    minValue={2000}
                    maxValue={new Date().getFullYear()}
                    value={year}
                    defaultValue={[year[0], year[1]]}
                    onChange={(values: number[]) => {
                      setYear(values);
                      formikProps.setFieldValue('year', values);
                    }}
                    classNames={{
                      track: 'h-[2px]', // Линия слайдера
                      filler: 'bg-red-600', // Заполнение слева до ползунка
                      label: 'text-[12px] mb-[8px] font-medium', // Лейбл
                    }}
                    renderValue={(props) => (
                      <output {...props}>
                        {year[0] === 2000 &&
                        year[1] === new Date().getFullYear()
                          ? null
                          : `${year[0]} - ${year[1]}`}
                      </output>
                    )}
                    renderThumb={(props) => (
                      <div
                        {...props}
                        className="group p-1 top-1/2 bg-background rounded-full cursor-grab data-[dragging=true]:cursor-grabbing"
                      >
                        <span className="bg-red-600 w-4 h-4 rounded-full block group-data-[dragging=true]:scale-90" />
                      </div>
                    )}
                  />
                </div>
              </div>
              <div className="mx-auto w-full max-w-[313px] tablet:max-w-[205px]">
                <Button
                  className="mx-auto bg-gradient-red text-primary text-[14px] font-semibold rounded-sub-block-12 w-full h-[48px] tablet:h-[40px]"
                  type="submit"
                >
                  {t.submit_button}
                </Button>
              </div>
            </div>
          )}
        </DynamicForm>
        <div className="absolute bottom-3 left-3">
          {notificationVisible && (
            <Notification onHide={() => setNotificationVisible(false)} />
          )}
        </div>
      </section>
    </Container>
  );
};

export default OrderFormModern;
