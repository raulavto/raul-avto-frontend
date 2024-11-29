'use client';
import Image from 'next/image';
import Link from 'next/link';

const DynamicComponentPage = () => {
  return (
    <div className="max-w-[1750px] mx-auto">
      <div className="mb-[40px] flex mobile:flex-wrap items-center mobile:gap-[20px] tablet:gap-[32px]">
        <h1 className="text-primary mobile:text-30 tablet:text-40 font-bold">
          2014 AUDI A8
        </h1>
        <div className=" flex items-center justify-center bg-gradient-sub-block max-w-[139px] h-[44px] rounded-sub-block-10 py-[14px] px-[24px] text-primary text-14 font-bold">
          2023-09-25
        </div>
        <Link
          className="flex items-center justify-center max-w-[210px] h-[44px] bg-gradient-red rounded-sub-block-10 py-[14px] px-[24px] text-primary text-14 font-bold transform transition duration-300 ease-in-out hover:scale-105 hover:text-hoverprimary"
          href="/"
        >
          Перейти на аукцион
        </Link>
      </div>
      <div className="flex mobile:items-center mobile:justify-center lg:items-start lg:justify-start mobile:flex-wrap lg:flex-nowrap gap-[32px] w-full">
        <div className="flex flex-col gap-[18px] self-start mobile:rounded-sub-block-10 tablet:rounded-sub-block-26 bg-gradient-sub-block p-[38px] mobile:max-w-full lg:max-w-[703px] w-full">
          <div className="flex items-center justify-center gap-4 mobile:max-w-full lg:max-w-[627px] h-[92px] bg-input w-full mobile:rounded-sub-block-10 tablet:rounded-[18px] p-[16px]">
            <button
              className="flex items-center justify-center max-w-[289px] w-full h-[60px] py-[18px] px-[20px] bg-gradient-white rounded-sub-block-12 font-bold mobile:text-14 tablet:text-18 text-dynamicblock"
              type="button"
            >
              Америка
            </button>
            <button
              className="flex items-center justify-center max-w-[289px] w-full h-[60px] py-[18px] px-[20px] bg-transparent rounded-sub-block-12 font-bold mobile:text-14 tablet:text-18 text-primary"
              type="button"
            >
              Порт
            </button>
          </div>
          <Image
            className="rounded-sub-block-18 mobile:w-full"
            src="/profile-order-car-img.png"
            alt="car photo"
            width={627}
            height={352}
          />
          <ul className="flex flex-wrap items-center mobile:justify-evenly justify-center gap-[18px]">
            <li>
              <Image
                className="rounded-sub-block-11 w-[111px] h-[111px]"
                src="/profile-order-car-img.png"
                alt="car photo"
                width={111}
                height={111}
              />
            </li>
            <li>
              <Image
                className="rounded-sub-block-11 w-[111px] h-[111px]"
                src="/profile-order-car-img.png"
                alt="car photo"
                width={111}
                height={111}
              />
            </li>
            <li>
              <Image
                className="rounded-sub-block-11 w-[111px] h-[111px]"
                src="/profile-order-car-img.png"
                alt="car photo"
                width={111}
                height={111}
              />
            </li>
            <li>
              <Image
                className="rounded-sub-block-11 w-[111px] h-[111px]"
                src="/profile-order-car-img.png"
                alt="car photo"
                width={111}
                height={111}
              />
            </li>
            <li>
              <Image
                className="rounded-sub-block-11 w-[111px] h-[111px]"
                src="/profile-order-car-img.png"
                alt="car photo"
                width={111}
                height={111}
              />
            </li>
            <li>
              <Image
                className="rounded-sub-block-11 w-[111px] h-[111px]"
                src="/profile-order-car-img.png"
                alt="car photo"
                width={111}
                height={111}
              />
            </li>
            <li>
              <Image
                className="rounded-sub-block-11 w-[111px] h-[111px]"
                src="/profile-order-car-img.png"
                alt="car photo"
                width={111}
                height={111}
              />
            </li>
            <li>
              <Image
                className="rounded-sub-block-11 w-[111px] h-[111px]"
                src="/profile-order-car-img.png"
                alt="car photo"
                width={111}
                height={111}
              />
            </li>
            <li>
              <Image
                className="rounded-sub-block-11 w-[111px] h-[111px]"
                src="/profile-order-car-img.png"
                alt="car photo"
                width={111}
                height={111}
              />
            </li>
            <li>
              <Image
                className="rounded-sub-block-11 w-[111px] h-[111px]"
                src="/profile-order-car-img.png"
                alt="car photo"
                width={111}
                height={111}
              />
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-[32px] mobile:max-w-full lg:max-w-[462px] w-full">
          <div className="mobile:rounded-sub-block-10 tablet:rounded-sub-block-26 bg-gradient-sub-block p-[38px] w-full">
            <h2 className="text-24 text-primary font-bold mb-[32px]">
              Информация об автомобиле
            </h2>
            <ul className="flex flex-col gap-4">
              <li className="text-[16px] text-secondary font-semibold">
                Марка:{' '}
                <span className="text-[16px] text-primary font-semibold uppercase">
                  Audi
                </span>
              </li>
              <li className="text-[16px] text-secondary font-semibold">
                Модель:{' '}
                <span className="text-[16px] text-primary font-semibold uppercase">
                  A8
                </span>
              </li>
              <li className="text-[16px] text-secondary font-semibold">
                Год:{' '}
                <span className="text-[16px] text-primary font-semibold">
                  2014
                </span>
              </li>
              <li className="text-[16px] text-secondary font-semibold">
                Номер лота:{' '}
                <span className="text-[16px] text-primary font-semibold uppercase">
                  HJDJJ44445HBJBKJBK
                </span>
              </li>
              <li className="text-[16px] text-secondary font-semibold">
                Вин код:{' '}
                <span className="text-[16px] text-primary font-semibold">
                  544343434345
                </span>
              </li>
              <li className="text-[16px] text-secondary font-semibold">
                Название аукциона:{' '}
                <span className="text-[16px] text-primary font-semibold">
                  copart
                </span>
              </li>
              <li className="text-[16px] text-secondary font-semibold">
                Дата покупки:{' '}
                <span className="text-[16px] text-primary font-semibold">
                  2023-07-10
                </span>
              </li>
              <li className="text-[16px] text-secondary font-semibold">
                Дата оплаты на аукционе:{' '}
                <span className="text-[16px] text-primary font-semibold">
                  2023-07-10
                </span>
              </li>
              <li className="text-[16px] text-secondary font-semibold">
                Дата доставки на склад:{' '}
                <span className="text-[16px] text-primary font-semibold">
                  2023-07-10
                </span>
              </li>
              <li className="text-[16px] text-secondary font-semibold">
                Дата получения тайтла:{' '}
                <span className="text-[16px] text-primary font-semibold">
                  2023-07-10
                </span>
              </li>
            </ul>
          </div>
          <div className="mobile:rounded-sub-block-10 tablet:rounded-sub-block-26 bg-gradient-sub-block p-[38px] w-full">
            <h2 className="text-24 text-primary font-bold mb-[32px]">
              Комментарий
            </h2>
            <ul className="flex flex-col gap-4">
              <li className="text-[16px] text-secondary font-semibold">
                Марка:{' '}
                <span className="text-[16px] text-primary font-semibold uppercase">
                  AUDI
                </span>
              </li>
              <li className="text-[16px] text-secondary font-semibold">
                Модель:{' '}
                <span className="text-[16px] text-primary font-semibold uppercase">
                  A8
                </span>
              </li>
              <li className="text-[16px] text-secondary font-semibold">
                Год:{' '}
                <span className="text-[16px] text-primary font-semibold">
                  2014
                </span>
              </li>
              <li className="text-[16px] text-secondary font-semibold">
                Номер лота:{' '}
                <span className="text-[16px] text-primary font-semibold uppercase">
                  HJDJJ44445HBJBKJBK
                </span>
              </li>
              <li className="text-[16px] text-secondary font-semibold">
                Вин код:{' '}
                <span className="text-[16px] text-primary font-semibold">
                  544343434345
                </span>
              </li>
              <li className="text-[16px] text-secondary font-semibold">
                Название аукциона:{' '}
                <span className="text-[16px] text-primary font-semibold">
                  copart
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col gap-[32px] mobile:max-w-full lg:max-w-[520px] w-full">
          <div className="mobile:rounded-sub-block-10 tablet:rounded-sub-block-26 bg-gradient-sub-block p-[38px] w-full">
            <h2 className="text-24 text-primary font-bold mb-[32px]">
              Транспортировка
            </h2>
            <ul className="flex flex-col gap-4">
              <li className="text-[16px] text-secondary font-semibold">
                Номер контейнера:{' '}
                <span className="text-[16px] text-primary font-semibold uppercase">
                  FANU1321172
                </span>
              </li>
              <li className="text-[16px] text-secondary font-semibold">
                Линия перевозки:{' '}
                <span className="text-[16px] text-primary font-semibold uppercase">
                  HJHSHJ-JNEE
                </span>
              </li>
              <li className="text-[16px] text-secondary font-semibold">
                Дата погрузки в контейнер:{' '}
                <span className="text-[16px] text-primary font-semibold">
                  0000-00-00
                </span>
              </li>
              <li className="text-[16px] text-secondary font-semibold">
                Терминал:{' '}
                <span className="text-[16px] text-primary font-semibold">
                  0000-00-00
                </span>
              </li>
              <li className="text-[16px] text-secondary font-semibold">
                Дата открытия контейнера:{' '}
                <span className="text-[16px] text-primary font-semibold">
                  2023-09-25
                </span>
              </li>
              <li className="text-[16px] text-secondary font-semibold">
                Green date:{' '}
                <span className="text-[16px] text-primary font-semibold">
                  2023-09-25
                </span>
              </li>
              <li className="text-[16px] text-secondary font-semibold">
                Приемный порт:{' '}
                <span className="text-[16px] text-primary font-semibold">
                  Poti, Georgia
                </span>
              </li>
            </ul>
          </div>
          <div className="mobile:rounded-sub-block-10 tablet:rounded-sub-block-26 bg-gradient-sub-block p-[38px] w-full">
            <h2 className="text-24 text-primary font-bold mb-[32px]">
              Получатель
            </h2>
            <ul className="flex flex-col gap-4">
              <li className="text-[16px] text-secondary font-semibold">
                Получатель:{' '}
                <span className="text-[16px] text-primary font-semibold uppercase">
                  MAMUKASURMANIDZE
                </span>
              </li>
              <li className="text-[16px] text-secondary font-semibold">
                Личный номер получателя:{' '}
                <span className="text-[16px] text-primary font-semibold">
                  26000105954
                </span>
              </li>
              <li className="text-[16px] text-secondary font-semibold">
                Номер телефона получателя:{' '}
                <span className="text-[16px] text-primary font-semibold">
                  +26000105954
                </span>
              </li>
              <li className="text-[16px] text-secondary font-semibold">
                Дата доставки на склад:{' '}
                <span className="text-[16px] text-primary font-semibold">
                  2023-07-10 14:33:12
                </span>
              </li>
            </ul>
          </div>
          <div className="mobile:rounded-sub-block-10 tablet:rounded-sub-block-26 bg-gradient-sub-block p-[38px] w-full">
            <h2 className="text-24 text-primary font-bold mb-[32px]">
              Фин. информация
            </h2>
            <ul className="flex flex-col gap-4">
              <li className="text-[16px] text-secondary font-semibold">
                Стоимость аукциона:{' '}
                <span className="text-[16px] text-primary font-semibold">
                  6,9325
                </span>
              </li>
              <li className="text-[16px] text-secondary font-semibold">
                Воемя напоминания:{' '}
                <span className="text-[16px] text-primary font-semibold">
                  0000-00-00
                </span>
              </li>
              <li className="text-[16px] text-secondary font-semibold">
                Баланс:{' '}
                <span className="text-[16px] text-primary font-semibold">
                  145$
                </span>
              </li>
              <li className="text-[16px] text-secondary font-semibold">
                Оплачено:{' '}
                <span className="bg-paid w-[70px] h-[32px] rounded-sub-block-6 inline-flex items-center justify-center text-[16px] text-primary font-semibold">
                  $9233
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DynamicComponentPage;
