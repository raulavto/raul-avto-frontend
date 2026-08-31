'use client';

import { useState } from 'react';
import HeroCalculator from '@/components/Calculator/HeroCalculator/HeroCalculator';
import CalculatorBlock from '@/components/Calculator/CalculatorBlock/CalculatorBlock';
import Container from '@/components/Container/Container';
import type { CalculatorCountry } from '@/components/Calculator/CountrySelect/CountrySelect';

const CalculatorPage = () => {
  const [country, setCountry] = useState<CalculatorCountry | null>(null);

  return (
    <Container>
      <HeroCalculator country={country} />
      <CalculatorBlock country={country} onCountryChange={setCountry} />
    </Container>
  );
};

export default CalculatorPage;
