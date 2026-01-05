
import React from 'react';
import { useTaxContext } from '../context/TaxContext';
import { ArrowUp, ArrowDown, Banknote, MinusCircle, PlusCircle } from 'lucide-react';

const PaychequeResultsDisplay: React.FC = () => {
    const { results, loading, payFrequency } = useTaxContext().state;

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' }).format(amount);
    };

    if (loading) {
        return <div className="text-center p-8 mt-6"><p>Calculating...</p></div>;
    }

    if (!results) {
        return (
            <div className="text-center p-8 mt-6 bg-white rounded-2xl shadow-lg border border-gray-200">
                <p className="text-gray-600">Enter your details and click "Calculate" to see your paycheque breakdown.</p>
            </div>
        );
    }
    
    const getFrequencyDivisor = () => {
        switch(payFrequency) {
            case 'monthly': return 12;
            case 'bi-weekly': return 26;
            case 'hourly': return 2080; // 40 * 52, note: hourly results are less common for a 'paycheque' view but supported
            case 'annually':
            default: return 1;
        }
    };
    
    const divisor = getFrequencyDivisor();
    const payFrequencyLabel = payFrequency.charAt(0).toUpperCase() + payFrequency.slice(1);

    const totalDeductions = results.federalTax + results.provincialTax + results.cppContribution + results.eiContribution;

    const BreakdownRow = ({ icon, label, value, bold = false, isTotal = false, colorClass = 'text-gray-800' }: { icon?: React.ReactElement; label: string; value: number; bold?: boolean, isTotal?: boolean, colorClass?: string }) => (
        <div className={`flex justify-between items-center py-3 ${isTotal ? 'border-t-2 border-dashed mt-2 pt-3' : 'border-b border-gray-200'} last:border-b-0 ${bold ? 'font-semibold' : ''} ${colorClass}`}>
            <span className="flex items-center">
                {icon}
                {label}
            </span>
            <span className={bold ? 'text-lg' : ''}>{formatCurrency(value)}</span>
        </div>
    );

    return (
        <div className="mt-8 bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-gray-200 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Your {payFrequencyLabel} Paycheque Summary</h2>
            
            <div className="space-y-1">
                <BreakdownRow 
                    icon={<PlusCircle className="w-5 h-5 mr-3 text-green-500" />} 
                    label="Gross Pay" 
                    value={results.grossAnnual / divisor} 
                    colorClass="text-green-700"
                    bold
                />
                <BreakdownRow 
                    icon={<MinusCircle className="w-5 h-5 mr-3 text-red-500" />} 
                    label="Federal Tax" 
                    value={results.federalTax / divisor} 
                    colorClass="text-red-600"
                />
                <BreakdownRow 
                    icon={<MinusCircle className="w-5 h-5 mr-3 text-red-500" />} 
                    label="Provincial Tax" 
                    value={results.provincialTax / divisor}
                    colorClass="text-red-600"
                />
                 <BreakdownRow 
                    icon={<MinusCircle className="w-5 h-5 mr-3 text-orange-500" />} 
                    label="CPP/QPP" 
                    value={results.cppContribution / divisor}
                    colorClass="text-orange-600"
                />
                <BreakdownRow 
                    icon={<MinusCircle className="w-5 h-5 mr-3 text-amber-500" />} 
                    label="EI/QPIP" 
                    value={results.eiContribution / divisor}
                    colorClass="text-amber-600"
                />
                
                <BreakdownRow 
                    label="Total Deductions" 
                    value={totalDeductions / divisor} 
                    bold 
                    isTotal
                />
            </div>
            
            <div className="mt-6 pt-4 border-t-2 border-solid border-gray-300">
                <div className="flex justify-between items-center py-2 bg-emerald-50 rounded-lg px-4">
                    <span className="flex items-center text-lg font-bold text-emerald-700">
                        <Banknote className="w-6 h-6 mr-3" />
                        Net Pay (Take-Home)
                    </span>
                    <p className="text-xl font-extrabold text-emerald-800">{formatCurrency(results.netAnnual / divisor)}</p>
                </div>
            </div>
        </div>
    );
};

export default PaychequeResultsDisplay;
