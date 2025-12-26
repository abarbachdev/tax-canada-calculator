
import React from 'react';
import CalculatorComponent from '../components/CalculatorComponent';
import PaychequeResultsDisplay from '../components/PaychequeResultsDisplay';
import PaychequeSeoContent from '../components/PaychequeSeoContent';

const PaychequeCalculatorPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 text-center mb-2">
        Canadian Paycheque Calculator
      </h1>
      <p className="text-lg text-gray-600 text-center mb-8">
        See a detailed breakdown of your take-home pay for each pay period.
      </p>
      <CalculatorComponent />
      <PaychequeResultsDisplay />
      <PaychequeSeoContent />
    </div>
  );
};

export default PaychequeCalculatorPage;