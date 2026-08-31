'use client';
import DynamicForm from '@/components/UI/DynamicForm/DynamicForm';
import PhoneInputField from '@/components/UI/PhoneInputField/PhoneInputField';
import InputField from '@/components/UI/InputField/InputField';
import Button from '@/components/UI/Button/Button';
import { FormikValues } from 'formik';
import { sendMessage } from '@/app/utils/sendMessage';
import useStore from '../../../app/zustand/useStore';
import translations from '../../../app/lang/partForms.json';
import translationsValidation from '../../../app/lang/formCall.json';
import * as yup from 'yup';
import { isValidPhoneNumber } from 'libphonenumber-js';

const initialValues = {
  phone: '',
  name: '',
};

const UserContactsForm = () => {
  const language = useStore((state) => state.language);
  const t = translations[language];
  const tValidation = translationsValidation[language];

  const validationSchema = yup.object({
    phone: yup
      .string()
      .test(
        'valid-phone',
        tValidation.phone_invalid,
        (value) => Boolean(value && isValidPhoneNumber(value))
      )
      .required(tValidation.phone_required),
    name: yup.string(),
  });

  const handleSubmit = (values: FormikValues) => {
    const { phone, name } = values;
    const contactInfo = `Имя: ${name}, Телефон: ${phone}`;

    sendMessage(`Заявка на сотрудничество. ${contactInfo}`);
  };

  return (
    <div className="max-w-[698px] mobile:rounded-sub-block-10 tablet:rounded-sub-block-26 desktop:rounded-sub-block-42 bg-gradient-sub-block mobile:p-[30px] md:p-[64px] mx-auto">
      <h2 className="max-w-[590px] text-center mobile:text-[20px] md:text-[33px] text-primary font-bold mb-[32px] md:mb-[64px] mx-auto">
        <span className="block">{t.form_heading_line1}</span>
        <span className="block">{t.form_heading_line2}</span>
        <span className="block">{t.form_heading_line3}</span>
      </h2>
      <DynamicForm
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <div className="flex flex-col items-center">
            <div className="mb-[24px] w-full">
              <PhoneInputField
                name="phone"
                placeholder={t.form_phone}
                inputClassName="placeholder:text-placeholderText placeholder:text-18 text-primary placeholder:font-semibold flex border-solid border-[1px] border-primary rounded-sub-block-12 bg-input px-[20px] py-[18px] w-full h-[60px]"
                errorClassName="text-red-500 text-[12px] mt-1"
              />
            </div>
            <div className="mb-[40px] w-full">
              <InputField
                type="text"
                name="name"
                placeholder={t.form_name_contact}
                inputClassName="placeholder:text-placeholderText placeholder:text-18 text-primary placeholder:font-semibold flex border-solid border-[1px] border-primary rounded-sub-block-12 bg-input px-[20px] py-[18px] w-full h-[60px]"
              />
            </div>
            <Button
              className="bg-gradient-red text-primary text-18 font-bold rounded-sub-block-16 flex items-center justify-center px-[20px] py-[18px] w-full h-[60px]"
              type="submit"
            >
              {t.form_submit}
            </Button>
          </div>
        )}
      </DynamicForm>
    </div>
  );
};

export default UserContactsForm;
