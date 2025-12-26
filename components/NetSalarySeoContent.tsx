
import React from 'react';
import { HelpCircle } from 'lucide-react';

const FaqItem: React.FC<{ question: string; children: React.ReactNode }> = ({ question, children }) => (
  <div className="py-4">
    <h3 className="font-semibold text-lg text-gray-800 flex items-center">
      <HelpCircle className="w-5 h-5 mr-3 text-blue-500" /> {question}
    </h3>
    <p className="mt-2 text-gray-600 pl-8">{children}</p>
  </div>
);

const NetSalarySeoContent: React.FC = () => {
  return (
    <div className="mt-12">
      <div className="mt-10">
        <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-blue-500 pb-2">
          Understanding Your Net Salary
        </h2>
        <p className="mt-4 text-gray-600">
          Your net salary, often called take-home pay, is the amount of money you receive after all deductions have been taken from your gross salary. These deductions typically include federal and provincial income taxes, Canada Pension Plan (CPP) or Quebec Pension Plan (QPP) contributions, and Employment Insurance (EI) or Quebec Parental Insurance Plan (QPIP) premiums. This calculator helps you see exactly where your money is going.
        </p>
      </div>

      <div className="mt-10 bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Net Salary Frequently Asked Questions
        </h2>
        <div className="divide-y divide-gray-200">
            <FaqItem question="What's the difference between gross salary and net salary?">
                <strong>Gross salary</strong> is the total amount of money your employer pays you before any taxes or deductions are taken out. <strong>Net salary</strong> is the actual amount that appears in your bank account after all deductions have been made.
            </FaqItem>
            <FaqItem question="Why is my take-home pay different from someone with the same salary?">
                Several factors can change your net salary, even if the gross income is the same. The primary reason is the province of residence, as each province has different tax brackets. Other factors include RRSP contributions, which lower your taxable income, and any additional deductions your employer might make for benefits like health insurance or a company pension plan.
            </FaqItem>
            <FaqItem question="Are bonuses taxed at a higher rate?">
                Bonuses are not taxed at a special, higher rate, but they can feel like it. A bonus is considered regular income, but because it's a large, lump-sum payment, the payroll software often withholds tax at a higher marginal rate, assuming you'll earn that much every pay period. Any overpayment of tax is typically refunded to you when you file your annual tax return.
            </FaqItem>
        </div>
      </div>
    </div>
  );
};

export default NetSalarySeoContent;
