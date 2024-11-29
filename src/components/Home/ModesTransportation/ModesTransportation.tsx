"use client";
import Image from 'next/image';
import useStore from '../../../app/zustand/useStore';
import translations from '../../../app/lang/transportModes.json';

interface TransportMode {
  title: string;
  imgSrc: string;
  imgAlt: string;
}

const ModesTransportation: React.FC = () => {
  const language = useStore(state => state.language) || 'ru';
  const { deliver, car, moto, yacht, tractor } = translations[language] || {};

  const transportModes: TransportMode[] = [
    {
      title: car || 'Car',
      imgSrc: '/deliverycar.png',
      imgAlt: 'delivery car',
    },
    {
      title: moto || 'Motorcycle',
      imgSrc: '/deliverymoto.png',
      imgAlt: 'delivery moto',
    },
    {
      title: yacht || 'Yacht',
      imgSrc: '/delivertyaht.png',
      imgAlt: 'delivery yacht',
    },
    {
      title: tractor || 'Tractor',
      imgSrc: '/diliverytractor.png',
      imgAlt: 'delivery tractor',
    },
  ];

  return (
    <div className="pb-[80px] tablet:pb-[120px] desktop:pb-[241px]">
      <ul className="flex justify-center items-center flex-wrap gap-[32px]">
        {transportModes.map((mode, index) => (
          <li
            key={index}
            className="w-[420px] relative bg-gradient-sub-block rounded-sub-block-24 p-[32px] overflow-hidden"
          >
            <div className="text-20 font-bold text-countCar">{deliver || 'Доставим'}</div>
            <div className="text-28 font-bold text-primary">{mode.title}</div>
            <Image src={mode.imgSrc} alt={mode.imgAlt} width={400} height={265} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ModesTransportation;
