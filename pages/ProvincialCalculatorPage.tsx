
import React from 'react';
import CalculatorComponent from '../components/CalculatorComponent';
import ResultsDisplay from '../components/ResultsDisplay';
import SeoContent from '../components/SeoContent';
import { TAX_CONSTANTS_2025 } from '../utils/taxConstants';
import type { ProvinceKey } from '../types';

interface ProvincialCalculatorPageProps {
  provinceCode: ProvinceKey;
}

const ProvincialCalculatorPage: React.FC<ProvincialCalculatorPageProps> = ({ provinceCode }) => {
  const provinceName = TAX_CONSTANTS_2025.provinces[provinceCode].name;

  return (
    <div>
      <CalculatorComponent defaultProvince={provinceCode} />
      <ResultsDisplay />
      <SeoContent provinceName={provinceName} />
    </div>
  );
};

export default ProvincialCalculatorPage;