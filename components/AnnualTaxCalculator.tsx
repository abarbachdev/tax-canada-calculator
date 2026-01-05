
import React, { useState, useEffect } from 'react';
import { PROVINCES } from '../utils/taxConstants';
import type { ProvinceKey } from '../types';
import { HandCoins, PiggyBank, Receipt, Building } from 'lucide-react';
import { useTaxContext } from '../context/TaxContext';

interface AnnualTaxCalculatorProps {
    onCalculate: (inputs: { annualIncome: number; rrspContribution: number; taxPaid: number; province: ProvinceKey; }) => void;
}

const AnnualTaxCalculator: React.FC<AnnualTaxCalculatorProps> = ({ onCalculate }) => {
    const { state, dispatch } = useTaxContext();
    const [annualIncome, setAnnualIncome] = useState(75000);
    const [rrspContribution, setRrspContribution] = useState(5000);
    const [taxPaid, setTaxPaid] = useState(15000);
    const [province, setProvince] = useState<ProvinceKey>(state.province);

    useEffect(() => {
        setProvince(state.province);
    }, [state.province]);
    
    const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newProvince = e.target.value as ProvinceKey;
        setProvince(newProvince);
        dispatch({ type: 'SET_INPUT', payload: { province: newProvince }});
    }

    const handleCalculateClick = (e: React.MouseEvent) => {
        e.preventDefault();
        onCalculate({ annualIncome, rrspContribution, taxPaid, province });
    };

  return (
    <div className="bg-white p-5 md:p-8 rounded-2xl shadow-lg border border-gray-200">
      <h2 className="text-xl font-black text-gray-900 mb-6 text-center">Tax Refund Estimator</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        
        <div className="space-y-1">
          <label htmlFor="annualIncome" className="flex items-center text-xs font-bold text-gray-500 uppercase">
            <HandCoins className="w-4 h-4 mr-2 text-blue-500" />
            Total Income (T4)
          </label>
          <input
            type="number" id="annualIncome" name="annualIncome"
            value={annualIncome}
            onChange={(e) => setAnnualIncome(Number(e.target.value) || 0)}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 transition bg-gray-50 font-semibold"
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="rrspContribution" className="flex items-center text-xs font-bold text-gray-500 uppercase">
            <PiggyBank className="w-4 h-4 mr-2 text-blue-500" />
            RRSP Contribution
          </label>
          <input
            type="number" id="rrspContribution" name="rrspContribution"
            value={rrspContribution}
            onChange={(e) => setRrspContribution(Number(e.target.value) || 0)}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 transition bg-gray-50 font-semibold"
          />
        </div>
        
        <div className="space-y-1">
          <label htmlFor="taxPaid" className="flex items-center text-xs font-bold text-gray-500 uppercase">
            <Receipt className="w-4 h-4 mr-2 text-blue-500" />
            Income Tax Paid
          </label>
          <input
            type="number" id="taxPaid" name="taxPaid"
            value={taxPaid}
            onChange={(e) => setTaxPaid(Number(e.target.value) || 0)}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 transition bg-gray-50 font-semibold"
          />
        </div>

        <div className="space-y-1">
            <label htmlFor="province" className="flex items-center text-xs font-bold text-gray-500 uppercase">
                <Building className="w-4 h-4 mr-2 text-blue-500" />
                Province
            </label>
            <select
                id="province" name="province" value={province}
                onChange={handleProvinceChange}
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
          type="button"
          onClick={handleCalculateClick}
          className="w-full sm:w-auto bg-yellow-400 text-gray-900 font-black py-4 px-12 rounded-xl hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-200 transition-all duration-300 transform hover:scale-105 shadow-lg active:scale-95 uppercase tracking-wider text-sm"
        >
          Calculate Refund
        </button>
      </div>
    </div>
  );
};

export default AnnualTaxCalculator;
