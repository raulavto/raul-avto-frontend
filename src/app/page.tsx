import Hero from '@/components/ModernHome/Hero/Hero';
import BuyingProcess from '@/components/ModernHome/BuyingProcess/BuyingProcess';
import Consultation from '@/components/ModernHome/Consultation/Consultation';
import Trusted from '@/components/ModernHome/Trusted/Trusted';
import AuctionsList from '@/components/ModernHome/Auctions/AuctionsList';
import TransportCategory from '@/components/ModernHome/TransportCategory/TransportCategory';
import ContactsBlock from '@/components/ModernHome/ContactsBlock/ContactsBlock';
import HomeProductList from '@/components/ModernHome/HomeProductList/HomeProductList';
import Feedback from '@/components/ModernHome/Feedback/Feedback';
import OrderBlock from '@/components/ModernHome/OrderBlock/OrderBlock';
import Propositions from '@/components/ModernHome/Propositions/Propositions';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '700'],
});

const page = () => {
  return (
    <section className={montserrat.className}>
      <Hero />
      <BuyingProcess />
      <Consultation />
      <Trusted />
      <AuctionsList />
      <TransportCategory />
      <ContactsBlock />
      <HomeProductList />
      <Feedback />
      <OrderBlock />
      <Propositions />
    </section>
  );
};

export default page;
