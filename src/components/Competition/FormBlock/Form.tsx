'use client';
import Button from '@/components/UI/Button/Button';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import * as yup from 'yup';
import { sendMessage } from '@/app/utils/sendMessage';

const schema = yup.object().shape({
  name: yup.string().required('Імʼя є обовʼязковим'),
  instagram: yup.string().required('Нік інстаграм є обовʼязковим'),
  phone: yup
    .string()
    .matches(
      /^(\+?38)?\s?\(?0\d{2}\)?[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/,
      'Невірний формат номера телефону'
    )
    .required('Номер телефону є обовʼязковим'),
  agreement: yup.boolean().oneOf([true], 'Ви повинні погодитися з умовами'),
});

const Form = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    instagram: '',
    phone: '',
    agreement: false,
  });
  const [errors, setErrors] = useState({
    name: '',
    instagram: '',
    phone: '',
    agreement: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
   
    try {
      await schema.validate(formData, { abortEarly: false });
      setErrors({ name: '', instagram: '', phone: '', agreement: '' });

      const message = `
✨ Нова заявка на участь у конкурсі! ✨  
👤 Ім'я: ${formData.name}  
📱 Телефон: ${formData.phone}  
📸 Instagram: ${formData.instagram}  
 
`;
      sendMessage(message);
      console.log(message);
      setFormData({
        name: '',
        instagram: '',
        phone: '',
        agreement: false,
      });
      router.push('https://send.monobank.ua/jar/96CygjGUtR');
    } catch (err) {
      const newErrors = { name: '', instagram: '', phone: '', agreement: '' };
      if (err.inner) {
        err.inner.forEach((error) => {
          if (error.path) {
            newErrors[error.path] = error.message;
          }
        });
      }
      setErrors(newErrors);
    } 
  };

  return (
    <div className="py-[25px] px-[22px] bg-[#F4F4F4] rounded-t-[10px] tablet:py-[33px] mac:px-[43px]   tablet:w-[66.5%] tablet:rounded-none tablet:rounded-l-[10px]">
      <h2 className="text-[#0B0909] font-bold uppercase text-[20px] tabletplus:text-[32px] mac:text-[40px] mb-3 text-center pointuserbar:mb-4 leading-[1.23]">
        Стань на крок
        <br /> ближче до Audi!
      </h2>
      <p className="text-[#0B0909] leading-[1.23]  mb-5 pointuserbar:mb-11 text-center tetx-[16px]">
        Заповни форму та зроби внесок, щоб стати учасником конкурсу
      </p>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 tablet:gap-4"
      >
        <div className="max-w-[408px] mx-auto flex flex-col gap-4">
          <div className="relative">
            <input
              type="text"
              name="name"
              placeholder="Ім'я"
              value={formData.name}
              onChange={handleChange}
              className="w-full rounded-xl py-[10px] px-4 bg-[#d4d4d866] border border-[#555] placeholder-[#A1A1AA] placeholder:text-[12px] text-[12px] outline-none"
            />
            {errors.name && (
              <p className="text-red-500 text-[10px] absolute bottom-[-14px]">
                {errors.name}
              </p>
            )}
          </div>

          <div className="relative">
            <input
              type="text"
              name="instagram"
              placeholder="Нік інстаграм"
              value={formData.instagram}
              onChange={handleChange}
              className="w-full rounded-xl py-[10px] px-4 bg-[#d4d4d866] border border-[#555] placeholder-[#A1A1AA] placeholder:text-[12px] text-[12px] outline-none"
            />
            {errors.instagram && (
              <p className="text-red-500 text-[10px] absolute bottom-[-14px]">
                {errors.instagram}
              </p>
            )}
          </div>

          <div className="relative">
            <input
              type="text"
              name="phone"
              placeholder="Номер телефону"
              value={formData.phone}
              onChange={handleChange}
              className="w-full rounded-xl py-[10px] px-4 bg-[#d4d4d866] border border-[#555] placeholder-[#A1A1AA] placeholder:text-[12px] text-[12px] outline-none"
            />
            {errors.phone && (
              <p className="text-red-500 text-[10px] absolute bottom-[-14px]">
                {errors.phone}
              </p>
            )}
          </div>

          <div className="flex items-center relative">
            <input
              id="checkbox"
              type="checkbox"
              name="agreement"
              checked={formData.agreement}
              onChange={handleChange}
              className="mr-2 w-4 h-4"
            />
            <label
              htmlFor="checkbox"
              className="text-[12px] font-light text-black leading-[1.23]"
            >
              Погоджуюсь з обробкою персональних даних та умовами оферти
            </label>
            {errors.agreement && (
              <p className="text-red-500 text-[10px] absolute bottom-[-14px]">
                {errors.agreement}
              </p>
            )}
          </div>

          <div className="mac:flex items-center gap-4 w-full">
            <div className="relative h-12 tabletplus:h-[60px] mac:w-[94%]">
              <Button
                type="submit"
                className="w-full h-full rounded-sub-block-12 bg-gradient-red text-[14px] text-white tablet:pr-5"
              >
                Оплатити через MonoPay
              </Button>
              <Image
                src="/copmetitionIcons/mono.svg"
                alt="mono icon"
                width={48}
                height={48}
                className="tabletplus:w-[60px] tabletplus:h-[60px] absolute top-0 right-0"
              />
            </div>
            <p className="text-center font-semibold mt-2 tablet:mt-0 text-[20px] text-nowrap">
              200 Грн
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Form;
