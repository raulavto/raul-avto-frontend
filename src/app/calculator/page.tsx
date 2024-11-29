import HeroCalculator from '@/components/Calculator/HeroCalculator/HeroCalculator';
import CalculatorBlock from '@/components/Calculator/CalculatorBlock/CalculatorBlock';
import Container from '@/components/Container/Container';
const CalculatorPage = () => {
  return (
    <Container>
      <HeroCalculator />
      <CalculatorBlock />
    </Container>
  );
};

export default CalculatorPage;
