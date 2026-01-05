
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

const PaychequeSeoContent: React.FC = () => {
  return (
    <div className="mt-12">
      <div className="mt-10">
        <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-blue-500 pb-2">
          Decoding Your Canadian Paycheque
        </h2>
        <p className="mt-4 text-gray-600">
          Ever wonder where your money goes between your gross pay and what actually lands in your bank account? This calculator is designed to demystify your paystub. We break down the key government deductions—Federal Tax, Provincial Tax, CPP/QPP, and EI/QPIP—so you can see exactly how your take-home pay is calculated for each pay period.
        </p>
      </div>

      <div className="mt-10 bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Paycheque FAQs
        </h2>
        <div className="divide-y divide-gray-200">
            <FaqItem question="Why is tax withheld from every paycheque?">
                Canada uses a system of "tax at source," which means your employer is required to deduct an estimated amount of income tax from your pay and remit it to the Canada Revenue Agency (CRA) on your behalf. This prevents you from having a large tax bill at the end of the year. The amount is an estimate based on your income and the TD1 forms you fill out.
            </FaqItem>
            <FaqItem question="What are CPP and EI for?">
                The <strong>Canada Pension Plan (CPP)</strong> is a national pension plan that provides you with income upon retirement, or in the case of disability. <strong>Employment Insurance (EI)</strong> provides temporary income support to unemployed workers while they look for employment or are unable to work due to specific life events like illness, pregnancy, or caring for a critically ill family member. These are mandatory contributions.
            </FaqItem>
            <FaqItem question="Can I reduce the amount of tax deducted from my paycheque?">
                Yes, in some situations. If you know you will have significant deductions or credits at the end of the year (e.g., large RRSP contributions, tuition fees, child care expenses), you can file Form T1213 with the CRA to request a reduction in tax withholdings. If approved, the CRA will authorize your employer to deduct less tax from your paycheque.
            </FaqItem>
        </div>
      </div>
    </div>
  );
};

export default PaychequeSeoContent;
