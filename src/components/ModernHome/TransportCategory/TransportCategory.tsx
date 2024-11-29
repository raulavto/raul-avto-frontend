'use client';
import { motion } from 'framer-motion';
import Container from '@/components/Container/Container';
import Image from 'next/image';
import Link from 'next/link';
import useStore from '@/app/zustand/useStore';
import translations from '../../../app/lang/transportCategory.json';

const items = [
  {
    id: 1,
    src: '/delivery-avto.jpg',
    alt: 'photo avto',
    titleKey: 'automobile',
    width: 502,
    height: 303,
  },
  {
    id: 2,
    src: '/delivery-moto.jpg',
    alt: 'photo moto',
    titleKey: 'motorcycle',
    width: 718,
    height: 303,
  },
  {
    id: 3,
    src: '/delivery-yacht.jpg',
    alt: 'photo yacht',
    titleKey: 'yacht',
    width: 827,
    height: 303,
  },
  {
    id: 4,
    src: '/delivery-spec-technics.jpg',
    alt: 'photo spec',
    titleKey: 'special_tech',
    width: 403,
    height: 303,
  },
];

const TransportCategory = () => {
  const language = useStore((state) => state.language);
  const t = translations[language];

  return (
    <section className="pt-[112px] pb-[126px] lg:pt-[200px] lg:pb-[200px] overflow-x-hidden">
      <Container>
        <ul
          className="grid gap-[20px] 
                        grid-cols-1 
                        mobileplus:grid-cols-2 mobileplus:auto-rows-[303px] mobileplus:grid-flow-dense 
                        tabletplus:grid-cols-3 tabletplus:auto-rows-[303px]
                        mac:flex mac:flex-wrap mac:justify-center"
        >
          {items.map((item, index) => (
            <motion.li
              key={item.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: index * 0.2 }}
              viewport={{ once: true, amount: 0.3 }}
              className="relative rounded-[20px]"
            >
              <Link
                href="/#order-form"
                className="overflow-hidden block w-full h-full rounded-[20px] border-[1px] border-white"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={item.width}
                  height={item.height}
                  className="mobile:max-w-full mobile:h-[313px] object-cover object-center scale-[1.1] rounded-[20px]"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                  <span className="text-white text-2xl font-bold desktop:text-[32px]">
                    {t[item.titleKey]}
                  </span>
                </div>
              </Link>
            </motion.li>
          ))}
        </ul>
      </Container>
    </section>
  );
};

export default TransportCategory;
