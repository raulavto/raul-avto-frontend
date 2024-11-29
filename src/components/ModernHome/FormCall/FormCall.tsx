'use client';
import InputField from '@/components/UI/InputField/InputField';
import Button from '@/components/UI/Button/Button';
import DynamicForm from '@/components/UI/DynamicForm/DynamicForm';
import Container from '@/components/Container/Container';
import { FormikHelpers, FormikValues } from 'formik';
import { useState, useEffect } from 'react';
import { IoIosArrowUp, IoIosArrowDown, IoMdClose } from 'react-icons/io';
import { useAppDispatch, useAppSelector } from '@/hooks/redux-hook';
import {
  closeModalFeedback,
  openModalFeedback,
} from '@/Redux/feedbackFormSlice/feedbackFormSlice';
import * as yup from 'yup';
import { isValidPhoneNumber } from 'libphonenumber-js';
import useStore from '@/app/zustand/useStore';
import translations from '../../../app/lang/formCall.json';
import { Select, SelectItem } from '@nextui-org/react';
import { sendMessage } from '@/app/utils/sendMessage';
import Notification from '@/components/UI/Notification/Notification';

interface FormCallValues {
  date: string;
  hour: string;
  minute: string;
  phoneNumber: string;
}

const initialValues: FormCallValues = {
  date: 'Сьогодні',
  hour: '09',
  minute: '00',
  phoneNumber: '',
};

const FormCall = () => {
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(initialValues.date);
  const [selectedHour, setSelectedHour] = useState(Number(initialValues.hour));
  const [selectedMinute, setSelectedMinute] = useState(
    Number(initialValues.minute)
  );
  const dispatch = useAppDispatch();
  const isVisible = useAppSelector(
    (state) => state.feedbackForm.isModalFeedbackOpen
  );
  const language = useStore((state) => state.language);
  const t = translations[language];
  const validationSchema = yup.object({
    phoneNumber: yup
      .string()
      .test(
        'valid-phone',
        `${t.phone_invalid}`,
        (value) => value && isValidPhoneNumber(value)
      )
      .required(`${t.phone_required}`),
  });

  useEffect(() => {
    setSelectedDate(t.today);
  }, [language]);

  useEffect(() => {
    // Проверяем, если форма уже была показана, то не показываем снова
    if (!sessionStorage.getItem('formShown')) {
      const timer = setTimeout(() => {
        dispatch(openModalFeedback());
        sessionStorage.setItem('formShown', 'true'); // Сохраняем, что форма была показана
      }, 30000); // 30 секунд

      return () => clearTimeout(timer);
    }
  }, [dispatch]);

  const handleSubmit = (
    values: FormikValues,
    formikHelpers: FormikHelpers<FormCallValues>
  ) => {
    const { resetForm } = formikHelpers;
    const message = `
    Запрос на звонок:дата: ${values.date},время: ${values.hour}:${values.minute},телефон: ${values.phoneNumber}
  `;
    sendMessage(message);

    setSelectedDate(initialValues.date);
    setSelectedHour(Number(initialValues.hour));
    setSelectedMinute(Number(initialValues.minute));
    resetForm();

    // Показываем уведомление
    setNotificationVisible(true);
  };

  const increaseHour = (formikProps: any) => {
    setSelectedHour((prev) => (prev === 20 ? 9 : prev + 1));
    formikProps.setFieldValue(
      'hour',
      String(selectedHour === 20 ? 9 : selectedHour + 1).padStart(2, '0')
    );
  };

  const decreaseHour = (formikProps: any) => {
    setSelectedHour((prev) => (prev === 9 ? 20 : prev - 1));
    formikProps.setFieldValue(
      'hour',
      String(selectedHour === 9 ? 20 : selectedHour - 1).padStart(2, '0')
    );
  };

  const increaseMinute = (formikProps: any) => {
    setSelectedMinute((prev) => (prev + 15) % 60);
    formikProps.setFieldValue(
      'minute',
      String((selectedMinute + 15) % 60).padStart(2, '0')
    );
  };

  const decreaseMinute = (formikProps: any) => {
    setSelectedMinute((prev) => (prev === 0 ? 45 : prev - 15));
    formikProps.setFieldValue(
      'minute',
      String(selectedMinute === 0 ? 45 : selectedMinute - 15).padStart(2, '0')
    );
  };

  const handleClose = () => {
    dispatch(closeModalFeedback());
  };

  if (!isVisible) return null;

  return (
    <section className="mx-[10px] fixed z-[200] inset-x-0 bottom-10 rounded-sub-block-22 border-[1px] border-gay-500 bg-black py-[48px] text-white transition-opacity duration-500 opacity-0 animate-fadeIn">
      <button
        onClick={handleClose}
        className="absolute top-4 right-4 text-white text-[24px] cursor-pointer"
      >
        <IoMdClose />
      </button>
      <Container>
        <div className="w-full max-w-[926px] mx-auto">
          <h2 className="uppercase mobile:text-center pointuserbar:text-left text-[20px] font-bold mb-[22px]">
            {t.form_title}
          </h2>
          <DynamicForm
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {(formikProps) => (
              <div className="flex mobile:flex-col mobile:gap-10 pointuserbar:gap-0 mobile:justify-center mobile:items-center pointuserbar:flex-row">
                {/* Date Select */}
                <div className="w-full max-w-[244px] mobile:mr-0 pointuserbar:mr-[32px]">
                  <Select
                    aria-label="date"
                    selectedKeys={new Set([selectedDate])}
                    // defaultSelectedKeys={new Set([selectedDate])}
                    onSelectionChange={(value) => {
                      const date = Array.from(value).join('');
                      setSelectedDate(date);
                      formikProps.setFieldValue('date', date);
                    }}
                    classNames={{
                      selectorIcon: 'text-white',
                      trigger:
                        'w-full max-w-[244px] bg-input-for-form-call border-[1px] border-gray-500 text-[12px] font-medium h-[40px] rounded-sub-block-12 px-[16px] pr-[32px]',
                      // listboxWrapper: 'max-h-[400px]',
                    }}
                    style={{ color: 'white' }}
                  >
                    <SelectItem key={t.today} className="">
                      {t.today}
                    </SelectItem>
                    <SelectItem key={t.tomorrow} className="">
                      {t.tomorrow}
                    </SelectItem>
                  </Select>
                </div>

                {/* Hour Selector with Buttons */}
                <div className="flex pointuserbar:mr-[32px]">
                  <div className="mr-[12px] w-[82px] h-[40px] flex items-center justify-center gap-[13px] bg-input-for-form-call border-[1px] border-gray-500 rounded-[8px]">
                    <div className="text-[28px] text-white font-medium">
                      {String(selectedHour).padStart(2, '0')}
                    </div>
                    <div>
                      <button
                        type="button"
                        onClick={() => decreaseHour(formikProps)}
                        className=""
                      >
                        <IoIosArrowUp />
                      </button>

                      <button
                        type="button"
                        onClick={() => increaseHour(formikProps)}
                        className=""
                      >
                        <IoIosArrowDown />
                      </button>
                    </div>
                  </div>

                  {/* Minute Selector with Buttons */}
                  <div className="w-[82px] h-[40px] flex items-center justify-center gap-[13px] bg-input-for-form-call border-[1px] border-gray-500 rounded-[8px]">
                    <div className="text-[28px] text-white font-medium">
                      {String(selectedMinute).padStart(2, '0')}
                    </div>
                    <div>
                      <button
                        type="button"
                        onClick={() => decreaseMinute(formikProps)}
                        className=""
                      >
                        <IoIosArrowUp />
                      </button>

                      <button
                        type="button"
                        onClick={() => increaseMinute(formikProps)}
                        className=""
                      >
                        <IoIosArrowDown />
                      </button>
                    </div>
                  </div>
                </div>
                <InputField
                  type="text"
                  name="phoneNumber"
                  placeholder={t.phone_placeholder}
                  inputClassName="bg-input-for-form-call text-white border-[1px] border-gray-500 rounded-[12px] pointuserbar:mr-[12px] px-[16px] placeholder:text-[12px] placeholder-gray-400 w-full max-w-[225px] h-[40px]"
                  errorClassName="pointuserbar:absolute pointuserbar:bottom-[10px] mx-auto text-red-500 text-[16px] text-center mobileplus:mt-1"
                />

                <Button
                  className="bg-red-600 text-white text-[14px] font-semibold rounded-sub-block-12 w-full max-w-[205px] h-[40px]"
                  type="submit"
                >
                  {t.waiting_for_call}
                </Button>
              </div>
            )}
          </DynamicForm>
        </div>
      </Container>
      <div className="absolute bottom-[15px] right-[15px]">
        {notificationVisible && (
          <Notification onHide={() => setNotificationVisible(false)} />
        )}
      </div>
    </section>
  );
};

export default FormCall;
