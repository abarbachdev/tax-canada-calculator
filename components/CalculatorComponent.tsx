
import React, { useEffect, useCallback } from 'react';
import { useTaxCalculator } from '../context/TaxContext';
import { PROVINCES } from '../utils/taxConstants';
import type { ProvinceKey, PayFrequency } from '../types';
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

    // Initial calculation on load
    useEffect(() => {
        runCalculation();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [province]);

  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-gray-200">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Gross Income */}
        <div className="space-y-2">
          <label htmlFor="grossIncome" className="flex items-center text-sm font-medium text-gray-700">
            <HandCoins className="w-4 h-4 mr-2 text-blue-500" />
            Gross Income
          </label>
          <input
            type="number"
            id="grossIncome"
            name="grossIncome"
            value={grossIncome}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition"
            placeholder="e.g., 75000"
          />
        </div>

        {/* Pay Frequency */}
        <div className="space-y-2">
            <label htmlFor="payFrequency" className="flex items-center text-sm font-medium text-gray-700">
                <Calculator className="w-4 h-4 mr-2 text-blue-500" />
                Pay Frequency
            </label>
            <select
                id="payFrequency"
                name="payFrequency"
                value={payFrequency}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition bg-white"
            >
                <option value="annually">Annually</option>
                <option value="monthly">Monthly</option>
                <option value="bi-weekly">Bi-Weekly</option>
                <option value="hourly">Hourly</option>
            </select>
        </div>

        {/* RRSP Contribution */}
        <div className="space-y-2">
          <label htmlFor="rrspContribution" className="flex items-center text-sm font-medium text-gray-700">
            <Landmark className="w-4 h-4 mr-2 text-blue-500" />
            RRSP Contribution (Annual)
          </label>
          <input
            type="number"
            id="rrspContribution"
            name="rrspContribution"
            value={rrspContribution}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition"
            placeholder="e.g., 5000"
          />
        </div>

        {/* Province */}
        <div className="space-y-2">
            <label htmlFor="province" className="flex items-center text-sm font-medium text-gray-700">
                <Building className="w-4 h-4 mr-2 text-blue-500" />
                Province
            </label>
            <select
                id="province"
                name="province"
                value={province}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition bg-white"
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
          className="bg-blue-600 text-white font-bold py-3 px-10 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 transform hover:scale-105"
        >
          Calculate
        </button>
      </div>
    </div>
  );
};

export default CalculatorComponent;

