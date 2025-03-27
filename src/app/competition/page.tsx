import { Montserrat } from 'next/font/google';

import Banner from '@/components/Competition/Banner/Banner';
import TimerBlock from '@/components/Competition/TimerBlock/TimerBlock';
import Conditions from '@/components/Competition/Conditions/Conditions';
import Prizes from '@/components/Competition/Prizes/Prizes';
import Partners from '@/components/Competition/Partners/Partners';

const montserrat = Montserrat({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '700'],
});

const Competition = () => {
  return (
    <div className={montserrat.className}>
      <Banner />
      <TimerBlock />
      <Conditions />
      <Prizes />
      <Partners />
    </div>
  );
};

export default Competition;
