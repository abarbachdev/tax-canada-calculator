
import React, { useState, useEffect, useCallback } from 'react';
import { PROVINCES } from '../utils/taxConstants';
import type { ProvinceKey } from '../types';
import { HandCoins, PiggyBank, Receipt, Building } from 'lucide-react';
import { useTaxContext } from '../context/TaxContext';

interface AnnualTaxCalculatorProps {
    onCalculate: (inputs: { annualIncome: number; rrspContribution: number; taxPaid: number; province: ProvinceKey; }) => void;
}

const AnnualTaxCalculator: React.FC<AnnualTaxCalculatorProps> = ({ onCalculate }) => {
    const { province: contextProvince, dispatch } = useTaxContext();
    const [annualIncome, setAnnualIncome] = useState(75000);
    const [rrspContribution, setRrspContribution] = useState(5000);
    const [taxPaid, setTaxPaid] = useState(15000);
    const [province, setProvince] = useState<ProvinceKey>(contextProvince);

    // Sync province with global context if it changes elsewhere
    useEffect(() => {
        setProvince(contextProvince);
    }, [contextProvince]);
    
    // Update global context when local province changes
    const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newProvince = e.target.value as ProvinceKey;
        setProvince(newProvince);
        dispatch({ type: 'SET_INPUT', payload: { province: newProvince }});
    }

    // Debounced calculation effect
    useEffect(() => {
        const handler = setTimeout(() => {
            onCalculate({ annualIncome, rrspContribution, taxPaid, province });
        }, 500); // 500ms delay to avoid re-calculating on every keystroke

        return () => {
            clearTimeout(handler);
        };
    }, [annualIncome, rrspContribution, taxPaid, province, onCalculate]);

  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-gray-200">
      <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">Estimate Your Tax Refund or Amount Owing</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <div className="space-y-2">
          <label htmlFor="annualIncome" className="flex items-center text-sm font-medium text-gray-700">
            <HandCoins className="w-4 h-4 mr-2 text-blue-500" />
            Total Annual Income (T4)
          </label>
          <input
            type="number" id="annualIncome" name="annualIncome"
            value={annualIncome}
            onChange={(e) => setAnnualIncome(parseFloat(e.target.value) || 0)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition"
            placeholder="e.g., 75000"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="rrspContribution" className="flex items-center text-sm font-medium text-gray-700">
            <PiggyBank className="w-4 h-4 mr-2 text-blue-500" />
            Annual RRSP Contribution
          </label>
          <input
            type="number" id="rrspContribution" name="rrspContribution"
            value={rrspContribution}
            onChange={(e) => setRrspContribution(parseFloat(e.target.value) || 0)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition"
            placeholder="e.g., 5000"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="taxPaid" className="flex items-center text-sm font-medium text-gray-700">
            <Receipt className="w-4 h-4 mr-2 text-blue-500" />
            Income Tax Paid (T4)
          </label>
          <input
            type="number" id="taxPaid" name="taxPaid"
            value={taxPaid}
            onChange={(e) => setTaxPaid(parseFloat(e.target.value) || 0)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition"
            placeholder="e.g., 15000"
          />
        </div>

        <div className="space-y-2">
            <label htmlFor="province" className="flex items-center text-sm font-medium text-gray-700">
                <Building className="w-4 h-4 mr-2 text-blue-500" />
                Province
            </label>
            <select
                id="province" name="province" value={province}
                onChange={handleProvinceChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition bg-white"
            >
                {Object.entries(PROVINCES).map(([code, { name }]) => (
                    <option key={code} value={code}>{name}</option>
                ))}
            </select>
        </div>
      </div>
    </div>
  );
};

export default AnnualTaxCalculator;
