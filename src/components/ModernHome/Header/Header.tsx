import Navigation from './Navigation/Navigation';
import UserBar from './UserBar/UserBar';
import Burger from './Burger/Burger';
import Container from '@/components/Container/Container';
import LanguageSelection from '@/components/UI/LanguageSelection/LanguageSelection';
const Header = () => {
  return (
    <header className="fixed inset-x-0 z-[200] bg-black mobile:pt-[13px] tablet:pt-[20px] pb-[12px]">
      <Container>
        <div className="flex items-center justify-between">
          <Navigation />
          <UserBar />
          <div className="flex items-center gap-[16px]">
            <div className="pointuserbar:hidden">
              <LanguageSelection />
            </div>
            <Burger />
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
