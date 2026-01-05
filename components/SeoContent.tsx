
import React from 'react';
import { HelpCircle } from 'lucide-react';

interface SeoContentProps {
  provinceName?: string;
}

const FaqItem: React.FC<{ question: string; children: React.ReactNode }> = ({ question, children }) => (
  <div className="py-4">
    <h3 className="font-semibold text-lg text-gray-800 flex items-center">
      <HelpCircle className="w-5 h-5 mr-3 text-blue-500" /> {question}
    </h3>
    <p className="mt-2 text-gray-600 pl-8">{children}</p>
  </div>
);

const SeoContent: React.FC<SeoContentProps> = ({ provinceName = "Canada" }) => {
  return (
    <div className="mt-12">
      <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">
        {provinceName} Income Tax Calculator
      </h1>
      <p className="mt-4 text-lg text-gray-600">
        Calculate your take-home pay in {provinceName} with our easy-to-use tax calculator. See a detailed breakdown of federal and provincial taxes, CPP/QPP, and EI/QPIP deductions based on the latest 2025 tax brackets.
      </p>

      <div className="mt-10">
        <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-blue-500 pb-2">
          Understanding Your Taxes in {provinceName}
        </h2>
        <p className="mt-4 text-gray-600">
          In {provinceName}, your income is subject to both federal and provincial income taxes. This calculator helps you estimate your annual tax burden and net income. It also calculates mandatory contributions to the Canada Pension Plan (CPP) and Employment Insurance (EI), or the Quebec Pension Plan (QPP) and Quebec Parental Insurance Plan (QPIP) if you reside in Quebec.
        </p>
      </div>

      <div className="mt-10 bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Frequently Asked Questions (FAQ)
        </h2>
        <div className="divide-y divide-gray-200">
            <FaqItem question={`How are income taxes calculated in ${provinceName}?`}>
                Taxes are calculated using a marginal tax rate system. This means different portions of your income are taxed at different rates. Our calculator applies the specific 2025 brackets for both {provinceName} and the federal government to your taxable income.
            </FaqItem>
            <FaqItem question="What is the Basic Personal Amount (BPA)?">
                The BPA is a non-refundable tax credit that all individuals can claim on their income tax return. It reduces the amount of income you're required to pay tax on. Our calculations automatically account for the federal BPA.
            </FaqItem>
            <FaqItem question="How does an RRSP contribution lower my taxes?">
                Contributing to a Registered Retirement Savings Plan (RRSP) reduces your taxable income. For every dollar you contribute, your income for tax purposes is lowered by that same amount, which can result in significant tax savings.
            </FaqItem>
        </div>
      </div>
    </div>
  );
};

export default SeoContent;