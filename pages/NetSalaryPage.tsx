
import React from 'react';
import CalculatorComponent from '../components/CalculatorComponent';
import ResultsDisplay from '../components/ResultsDisplay';
import NetSalarySeoContent from '../components/NetSalarySeoContent';
import SeoUpdater from '../components/SeoUpdater';

const NetSalaryPage: React.FC = () => {
  return (
    <div className="px-1 md:px-4">
      <SeoUpdater 
        title="Net Salary Calculator Canada" 
        description="Free 2025 net salary calculator for all Canadian provinces. Calculate your take-home pay after federal and provincial taxes, CPP, and EI."
        path="/"
      />
      <div className="relative mb-12 py-4 md:py-8">
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-1 bg-yellow-400 rounded-full"></div>
        <h1 className="text-4xl md:text-6xl font-black text-gray-900 text-center mb-4 tracking-tight">
          Net Salary <span className="text-blue-600 italic">Calculator</span>
        </h1>
        <p className="text-base md:text-xl text-gray-500 text-center font-medium max-w-2xl mx-auto px-4">
          Find out your exact take-home pay after all <span className="text-gray-900 font-bold border-b-2 border-yellow-400">Canadian taxes</span> and deductions.
        </p>
      </div>
      <CalculatorComponent />
      <ResultsDisplay />
      <div className="mt-16">
        <NetSalarySeoContent />
      </div>
    </div>
  );
};

export default NetSalaryPage;
