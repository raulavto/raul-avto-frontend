'use client';
import { useState } from 'react';
import DynamicForm from '@/components/UI/DynamicForm/DynamicForm';
import InputField from '@/components/UI/InputField/InputField';
import Button from '@/components/UI/Button/Button';
import { FormikValues } from 'formik';
import { sendMessage } from '@/app/utils/sendMessage';
import useStore from '../../../app/zustand/useStore';
import translations from '../../../app/lang/partForms.json';

const initialValues = {
  phone: '',
  name: '',
  comment: '',
};

const validate = (values) => {
  const errors = {};
  if (!values.phone) {
    errors.phone = 'Phone number is required';
  }
  return errors;
};

const QuestionsForm = ({ link }) => {
  const language = useStore(state => state.language);
  const t = translations[language];
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (values: FormikValues, { resetForm }) => {
    const { phone, name, comment } = values;
    if (!phone) {
      alert('Phone number is required');
      return;
    }

    let contactInfo = `Имя: ${name}, Телефон: ${phone}, Комментарий: ${comment}`;
    let message = `Заявка с вопросом.`;

    if (link) {
      message = ` Заявка на консультацию по автомобилю: ${link}\n`;
    }

    message += contactInfo;

    await sendMessage(message);

    setIsSubmitted(true);
    resetForm();
    setTimeout(() => setIsSubmitted(false), 2000);
  };

  return (
    <div>
      <DynamicForm initialValues={initialValues} validate={validate} onSubmit={handleSubmit}>
        {(formikProps) => (
          <div className="flex flex-col items-center">
            <div className="mb-[24px] flex-1 w-full">
              <InputField
                type="tel"
                name="phone"
                label={t.form_phone}
                placeholder={t.form_phone_placeholder}
                labelClassName="text-16 mb-[16px] font-semibold"
                inputClassName="placeholder:text-placeholderText placeholder:text-18 text-primary placeholder:font-semibold flex border-solid border-[1px] border-primary rounded-sub-block-12 bg-input px-[20px] py-[18px] w-full h-[60px]"
              />
            </div>
            <div className="mb-[24px] w-full">
              <InputField
                type="text"
                name="name"
                label={t.form_name}
                placeholder={t.form_name_placeholder}
                labelClassName="text-16 mb-[16px] font-semibold"
                inputClassName="placeholder:text-placeholderText placeholder:text-18 text-primary placeholder:font-semibold flex border-solid border-[1px] border-primary rounded-sub-block-12 bg-input px-[20px] py-[18px] w-full h-[60px]"
              />
            </div>
            <div className="mb-[40px] w-full">
              <InputField
                as="textarea"
                name="comment"
                label={t.form_comment}
                placeholder={t.form_comment_placeholder}
                labelClassName="text-16 mb-[16px] font-semibold"
                inputClassName="placeholder:text-placeholderText placeholder:text-18 text-primary placeholder:font-semibold border-solid border-[1px] border-primary rounded-sub-block-12 bg-input px-[20px] py-[18px] w-full h-[108px]"
              />
            </div>
            {isSubmitted ? (
              <div className="text-green-500 text-2xl">&#10004;</div>
            ) : (
              <Button
                className="bg-gradient-red text-primary text-18 font-bold rounded-sub-block-16 flex items-center justify-center px-[20px] py-[18px] w-full h-[60px]"
                type="submit"
              >
                {t.form_submit}
              </Button>
            )}
          </div>
        )}
      </DynamicForm>
    </div>
  );
};

export default QuestionsForm;
