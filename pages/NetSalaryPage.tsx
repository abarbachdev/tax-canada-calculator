
import React from 'react';
import CalculatorComponent from '../components/CalculatorComponent';
import ResultsDisplay from '../components/ResultsDisplay';
import NetSalarySeoContent from '../components/NetSalarySeoContent';

const NetSalaryPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 text-center mb-2">
        Net Salary Calculator Canada (2025/2026)
      </h1>
      <p className="text-lg text-gray-600 text-center mb-8">
        Find out your take-home pay after all taxes and deductions.
      </p>
      <CalculatorComponent />
      <ResultsDisplay />
      <NetSalarySeoContent />
    </div>
  );
};

export default NetSalaryPage;