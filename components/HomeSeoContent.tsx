
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

const HomeSeoContent: React.FC = () => {
  return (
    <div className="mt-12">
      <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">
        Canada Tax Return Calculator (2025 Filing Season for 2024 Tax Year)
      </h1>
      <p className="mt-4 text-lg text-gray-600">
        Estimate your income tax refund or balance owing before you file. Our simple calculator helps you understand your total tax liability for the year based on your T4 and RRSP contributions.
      </p>

      <div className="mt-10">
        <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-blue-500 pb-2">
          Filing Your Annual Tax Return
        </h2>
        <p className="mt-4 text-gray-600">
          Every year, Canadians are required to file an income tax return to report their income and determine if they have paid the correct amount of tax throughout the year. If you've paid more than you owe, you get a refund. If you've paid less, you have a balance owing. This calculator provides a simplified estimate of that final number, helping you plan ahead for tax season.
        </p>
      </div>

      <div className="mt-10 bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Tax Filing Frequently Asked Questions
        </h2>
        <div className="divide-y divide-gray-200">
            <FaqItem question="What information do I need to use this calculator?">
                You'll need your total employment income and the income tax deducted from your T4 slip (Box 14 and Box 22, respectively). You'll also need the total amount of your annual RRSP contributions and your province of residence on December 31st of the tax year.
            </FaqItem>
            <FaqItem question="What is the tax filing deadline in Canada?">
                For most individuals, the deadline to file your income tax return is April 30th. If you or your spouse or common-law partner are self-employed, the deadline is June 15th. However, any balance owing is still due on April 30th.
            </FaqItem>
            <FaqItem question="Is this calculator 100% accurate?">
                This is a simplified estimator. It does not account for all possible tax credits (like tuition, medical expenses, or charitable donations), deductions, or other sources of income. It's designed to give you a good ballpark figure for planning purposes. For an exact calculation, you should use certified tax software or consult a tax professional.
            </FaqItem>
        </div>
      </div>
    </div>
  );
};

export default HomeSeoContent;
