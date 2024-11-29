'use client';
import LanguageSelection from '@/components/UI/LanguageSelection/LanguageSelection';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/UI/Button/Button';
import SelectedAuthRouts from '@/components/Modals/SelectedAuthRouts/SelectedAuthRouts';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
const UserBar = () => {
  const [showModal, setShowModal] = useState(false);
  const pathname = usePathname();
  const isActiveClass = 'text-red-600 text-14';

  const toggleModal = () => {
    setShowModal((prev) => !prev);
  };

  return (
    <ul className="mobile:hidden pointuserbar:flex items-center ml-auto">
      {/* VIN */}
      {/* <li className="mr-[26px] relative">
        <input
          type="text"
          placeholder="Знайти авто по VIN"
          className="placeholder:text-[#a1a1aa] placeholder:text-14 text-primary placeholder:font-medium flex border-solid border-[1px] border-primary rounded-sub-block-10 bg-gradient-input px-[14px] py-4 w-[225px] h-[40px] focus:outline-focus outline-none"
        />
        <Image
          className="absolute top-1/2 right-[14px] transform translate-y-[-50%] cursor-pointer"
          src="/search-input.png"
          alt="search icon"
          width={16}
          height={16}
        />
      </li> */}

      {/* auth */}

      {/* <li>
              <div className="flex items-center gap-[40px] text-14 text-primary font-bold mr-[40px]">
                <Link
                  className={`transition-colors duration-300 ease-in-out hover:text-red-600 ${
                    pathname === '/profile' ? isActiveClass : ''
                  }`}
                  href="/profile"
                >
                  Личный кабинет
                </Link>
                <button type="button">Выйти</button>
              </div>
            </li> */}
      {/* <li className="relative">
        <Button
          onClick={toggleModal}
          className="bg-white text-[14px] font-semibold py-[10px] px-[43px] mr-[22px] text-black rounded-sub-block-12 h-[40px] hover:text-red-600"
          type="button"
        >
          Вхід
        </Button>
        {showModal && (
          <div className="absolute left-[-15px] bottom-[-100px] z-10">
            <SelectedAuthRouts toggleModal={toggleModal} />
          </div>
        )}
      </li> */}
      <li className="mr-[16px]">
        <LanguageSelection />
      </li>
    </ul>
  );
};

export default UserBar;
