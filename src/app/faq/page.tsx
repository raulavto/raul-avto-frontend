import FaqComponent from '@/components/FaqComponent/FaqComponent';
import ContactsBlock from '@/components/ModernHome/ContactsBlock/ContactsBlock';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '700'],
});
const FaqPage = () => {
  return (
    <div className={`${montserrat.className} space-y-24`}>
      <FaqComponent />
      <ContactsBlock />
    </div>
  );
};

export default FaqPage;
