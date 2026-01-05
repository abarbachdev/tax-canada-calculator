
import React, { useEffect } from 'react';
import { useTaxCalculator } from '../context/TaxContext';
import { PROVINCES } from '../utils/taxConstants';
import type { ProvinceKey } from '../types';
import { Calculator, Landmark, HandCoins, Building } from 'lucide-react';

interface CalculatorComponentProps {
    defaultProvince?: ProvinceKey;
}

const CalculatorComponent: React.FC<CalculatorComponentProps> = ({ defaultProvince }) => {
    const { grossIncome, payFrequency, rrspContribution, province, dispatch, runCalculation } = useTaxCalculator();

    useEffect(() => {
        if (defaultProvince && defaultProvince !== province) {
            dispatch({ type: 'SET_INPUT', payload: { province: defaultProvince } });
        }
    }, [defaultProvince, province, dispatch]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        const numericValue = ['grossIncome', 'rrspContribution'].includes(name) ? parseFloat(value) || 0 : value;
        dispatch({ type: 'SET_INPUT', payload: { [name]: numericValue } });
    };

    const handleCalculateClick = () => {
        runCalculation();
    };

    useEffect(() => {
        runCalculation();
    }, [province]);

  return (
    <div className="bg-white p-5 md:p-8 rounded-2xl shadow-lg border border-gray-200">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        
        {/* Gross Income */}
        <div className="space-y-1 md:space-y-2">
          <label htmlFor="grossIncome" className="flex items-center text-xs md:text-sm font-bold text-gray-700 uppercase tracking-wide">
            <HandCoins className="w-4 h-4 mr-2 text-blue-500" />
            Gross Income
          </label>
          <input
            type="number"
            id="grossIncome"
            name="grossIncome"
            value={grossIncome}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-gray-50 font-semibold"
            placeholder="e.g., 75000"
          />
        </div>

        {/* Pay Frequency */}
        <div className="space-y-1 md:space-y-2">
            <label htmlFor="payFrequency" className="flex items-center text-xs md:text-sm font-bold text-gray-700 uppercase tracking-wide">
                <Calculator className="w-4 h-4 mr-2 text-blue-500" />
                Pay Frequency
            </label>
            <select
                id="payFrequency"
                name="payFrequency"
                value={payFrequency}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 transition bg-gray-50 font-semibold"
            >
                <option value="annually">Annually</option>
                <option value="monthly">Monthly</option>
                <option value="bi-weekly">Bi-Weekly</option>
                <option value="hourly">Hourly</option>
            </select>
        </div>

        {/* RRSP Contribution */}
        <div className="space-y-1 md:space-y-2">
          <label htmlFor="rrspContribution" className="flex items-center text-xs md:text-sm font-bold text-gray-700 uppercase tracking-wide">
            <Landmark className="w-4 h-4 mr-2 text-blue-500" />
            RRSP (Annual)
          </label>
          <input
            type="number"
            id="rrspContribution"
            name="rrspContribution"
            value={rrspContribution}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 transition bg-gray-50 font-semibold"
            placeholder="e.g., 5000"
          />
        </div>

        {/* Province */}
        <div className="space-y-1 md:space-y-2">
            <label htmlFor="province" className="flex items-center text-xs md:text-sm font-bold text-gray-700 uppercase tracking-wide">
                <Building className="w-4 h-4 mr-2 text-blue-500" />
                Province
            </label>
            <select
                id="province"
                name="province"
                value={province}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 transition bg-gray-50 font-semibold"
            >
                {Object.entries(PROVINCES).map(([code, { name }]) => (
                    <option key={code} value={code}>{name}</option>
                ))}
            </select>
        </div>
      </div>
      
      <div className="mt-8 text-center">
        <button
          onClick={handleCalculateClick}
          className="w-full sm:w-auto bg-yellow-400 text-gray-900 font-black py-4 px-12 rounded-xl hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-200 transition-all duration-300 transform hover:scale-105 shadow-lg active:scale-95 uppercase tracking-wider text-sm"
        >
          Calculate Net Pay
        </button>
      </div>
    </div>
  );
};

export default CalculatorComponent;
