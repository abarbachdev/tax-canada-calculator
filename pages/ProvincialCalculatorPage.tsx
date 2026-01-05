
import React from 'react';
import CalculatorComponent from '../components/CalculatorComponent';
import ResultsDisplay from '../components/ResultsDisplay';
import SeoContent from '../components/SeoContent';
import SeoUpdater from '../components/SeoUpdater';
import { TAX_CONSTANTS_2025 } from '../utils/taxConstants';
import type { ProvinceKey } from '../types';

interface ProvincialCalculatorPageProps {
  provinceCode: ProvinceKey;
}

const ProvincialCalculatorPage: React.FC<ProvincialCalculatorPageProps> = ({ provinceCode }) => {
  const province = TAX_CONSTANTS_2025.provinces[provinceCode];
  const provinceName = province.name;

  return (
    <div>
      <SeoUpdater 
        title={`${provinceName} Tax Calculator 2025`} 
        description={`Calculate your take-home pay in ${provinceName}. Accurate breakdown of ${provinceName} provincial tax brackets, federal tax, CPP, and EI.`}
        path={`/${province.slug}-tax-calculator`}
      />
      <CalculatorComponent defaultProvince={provinceCode} />
      <ResultsDisplay />
      <SeoContent provinceName={provinceName} />
    </div>
  );
};

export default ProvincialCalculatorPage;
