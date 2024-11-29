import Container from '@/components/Container/Container';
import FooterLogo from './FooterLogo';
import FooterNavigation from './FooterNavigation';
import FooterContacs from './FooterContacs';
import FooterMap from './FooterMap';
import FooterSocial from './FooterSocial';
import FooterCall from './FooterCall';

const Footer = () => {
  return (
    <footer className="mobile:pt-[64px] mobile:pb-[80px] tablet:pb-[60px] lg:pt-[58px] lg:pb-[58px]">
      <Container>
        <ul className="flex flex-col items-center tablet:flex-row tablet:flex-wrap tablet:justify-evenly tablet:items-start tablet:gap-[30px]">
          <li className="mobile:mb-[64px] tablet:mb-0 order-[1]">
            <div className="flex justify-center mb-[10px]">
              <FooterLogo />
            </div>
            <div className="tablet:hidden">
              <FooterSocial />
            </div>
          </li>
          <li className="flex gap-[40px] order-[3] tablet:order-[2] mb-[48px]">
            <div>
              <FooterNavigation />
            </div>
            <div className="tablet:hidden">
              <FooterContacs />
            </div>
          </li>
          <li className="hidden tablet:flex tablet:order-[3]">
            <FooterContacs />
          </li>
          <li className="order-[4]">
            <div className="tablet:mb-[26px]">
              <FooterMap />
            </div>
            <div className="hidden tablet:flex">
              <FooterSocial />
            </div>
          </li>
          <li className="order-[2] mobile:mb-[48px] tablet:mb-0 tablet:order-[5]">
            <FooterCall />
          </li>
        </ul>
      </Container>
    </footer>
  );
};

export default Footer;
