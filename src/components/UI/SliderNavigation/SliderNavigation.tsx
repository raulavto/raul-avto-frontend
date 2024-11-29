import Image from 'next/image';
import Button from '@/components/UI/Button/Button';

interface SliderNavigationProps {
  prevClass: string; // Класс для кнопки "предыдущий"
  nextClass: string; // Класс для кнопки "следующий"
  prevIcon: string; // Путь к изображению для кнопки "предыдущий"
  nextIcon: string; // Путь к изображению для кнопки "следующий"
}

const SliderNavigation = ({
  prevClass,
  nextClass,
  prevIcon,
  nextIcon,
}: SliderNavigationProps) => (
  <div className="flex justify-center mt-[42px] lg:mt-[50px]">
    <Button
      className={`${prevClass} mx-2 flex items-center justify-center bg-transparent focus:outline-transparent`}
    >
      <Image src={prevIcon} alt="btn icon prev" width={28} height={28} />
    </Button>
    <Button
      className={`${nextClass} mx-2 flex items-center justify-center bg-transparent focus:outline-transparent`}
    >
      <Image src={nextIcon} alt="btn icon next" width={55} height={55} />
    </Button>
  </div>
);

export default SliderNavigation;
