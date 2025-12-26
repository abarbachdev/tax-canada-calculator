
import React from 'react';
import type { AnnualCalculationResult } from '../types';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface AnnualTaxResultsProps {
  results: (AnnualCalculationResult & {
    annualIncome: number;
    rrspContribution: number;
    taxPaid: number;
    finalBalance: number;
  }) | null;
  loading: boolean;
}

const AnnualTaxResults: React.FC<AnnualTaxResultsProps> = ({ results, loading }) => {

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' }).format(amount);
    };

    if (loading) {
        return <div className="text-center p-8 mt-6"><p>Calculating...</p></div>;
    }

    if (!results) {
        return (
            <div className="text-center p-8 mt-6 bg-white rounded-2xl shadow-lg border border-gray-200">
                <p className="text-gray-600">Enter your annual income details to estimate your tax refund or balance owing.</p>
            </div>
        );
    }
    
    const isRefund = results.finalBalance >= 0;

    const BreakdownRow = ({ label, value, bold = false, isTotal = false }: { label: string; value: string; bold?: boolean, isTotal?: boolean }) => (
        <div className={`flex justify-between items-center py-3 ${isTotal ? 'border-t-2 border-dashed mt-2 pt-3' : 'border-b border-gray-200'} last:border-b-0 ${bold ? 'font-bold text-gray-900' : 'text-gray-600'}`}>
            <span>{label}</span>
            <span className={bold ? 'text-lg' : ''}>{value}</span>
        </div>
    );

    return (
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-5 gap-8">
             <div className="lg:col-span-3 bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Tax Return Summary</h2>
                <BreakdownRow label="Total Annual Income" value={formatCurrency(results.annualIncome)} />
                <BreakdownRow label="RRSP Deduction" value={`- ${formatCurrency(results.rrspContribution)}`} />
                <BreakdownRow label="Taxable Income" value={formatCurrency(results.taxableIncome)} bold={true} />
                
                <div className="my-2" />
                
                <BreakdownRow label="Federal Tax" value={formatCurrency(results.federalTax)} />
                <BreakdownRow label="Provincial Tax" value={formatCurrency(results.provincialTax)} />
                <BreakdownRow label="Total Income Tax Liability" value={formatCurrency(results.totalTax)} bold={true} isTotal={true}/>
                
                <div className="my-2" />
                
                <BreakdownRow label="Income Tax Already Paid (T4)" value={`- ${formatCurrency(results.taxPaid)}`} />
             </div>

             <div className="lg:col-span-2 flex flex-col justify-center items-center bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-gray-200">
                {isRefund ? (
                    <div className="text-center text-green-600">
                        <TrendingUp className="w-20 h-20 mx-auto" />
                        <h3 className="text-2xl font-bold mt-4">Estimated Tax Refund</h3>
                        <p className="text-5xl font-extrabold mt-2">{formatCurrency(results.finalBalance)}</p>
                    </div>
                ) : (
                    <div className="text-center text-red-600">
                        <TrendingDown className="w-20 h-20 mx-auto" />
                        <h3 className="text-2xl font-bold mt-4">Estimated Balance Owing</h3>
                        <p className="text-5xl font-extrabold mt-2">{formatCurrency(Math.abs(results.finalBalance))}</p>
                    </div>
                )}
             </div>
        </div>
    );
};

export default AnnualTaxResults;
