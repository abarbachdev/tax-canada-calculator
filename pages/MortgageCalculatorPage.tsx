
import React from 'react';
import MortgageCalculator from '../components/MortgageCalculator';
import SeoUpdater from '../components/SeoUpdater';
import { Home, HelpCircle } from 'lucide-react';

const MortgageCalculatorPage: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <SeoUpdater 
        title="Canada Mortgage Calculator 2025" 
        description="Estimate your monthly mortgage payments in Canada. Calculate based on home price, down payment, interest rates, and amortization."
        path="/mortgage-calculator"
      />
      
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900 flex items-center justify-center gap-3">
          <Home className="text-blue-600 w-10 h-10" />
          Canada Mortgage Calculator
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Plan your home purchase with our accurate mortgage payment estimator.
        </p>
      </div>

      <MortgageCalculator />

      <div className="mt-16 bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">How Mortgage Payments are Calculated</h2>
        <div className="prose max-w-none text-gray-600 space-y-4">
          <p>
            In Canada, mortgage interest is typically compounded semi-annually, not monthly. Our calculator uses the standard Canadian mortgage formula to give you the most accurate estimate for your monthly or bi-weekly payments.
          </p>
          <h3 className="text-xl font-semibold text-gray-800">Key Factors:</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Down Payment:</strong> In Canada, the minimum down payment is 5% for the first $500,000 and 10% for the portion above that. If your down payment is less than 20%, you will need mortgage default insurance (CMHC insurance).</li>
            <li><strong>Amortization:</strong> This is the total length of time it will take to pay off your mortgage. The maximum amortization is usually 25 years for down payments under 20%.</li>
            <li><strong>Interest Rate:</strong> Even a small difference in your rate can save you thousands of dollars over the life of your mortgage.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MortgageCalculatorPage;
