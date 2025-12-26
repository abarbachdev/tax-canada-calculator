
import React from 'react';
import { TAX_CONSTANTS_2025 } from '../utils/taxConstants';
import { BarChart3 } from 'lucide-react';

const FederalTaxBrackets: React.FC = () => {
    const federalBrackets = TAX_CONSTANTS_2025.federal.brackets;

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(amount);
    };

    const getIncomeRangeText = (bracket: typeof federalBrackets[0], index: number) => {
        const prevBracketMax = index > 0 ? federalBrackets[index - 1].max : null;
        if (index === 0) {
            return `Up to ${formatCurrency(bracket.max!)}`;
        }
        if (bracket.max) {
            return `Over ${formatCurrency(prevBracketMax!)} up to ${formatCurrency(bracket.max)}`;
        }
        return `Over ${formatCurrency(prevBracketMax!)}`;
    };

    return (
        <div className="mt-8 bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <BarChart3 className="w-6 h-6 mr-3 text-blue-500" />
                Federal Income Tax Brackets (2025)
            </h2>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-gray-100 rounded-t-lg">
                        <tr>
                            <th className="p-4 font-semibold text-gray-700 rounded-tl-lg">Taxable Income</th>
                            <th className="p-4 font-semibold text-gray-700 rounded-tr-lg">Federal Tax Rate</th>
                        </tr>
                    </thead>
                    <tbody>
                        {federalBrackets.map((bracket, index) => (
                            <tr key={index} className="border-b border-gray-200 last:border-b-0">
                                <td className="p-4 text-gray-600">
                                    {getIncomeRangeText(bracket, index)}
                                </td>
                                <td className="p-4 font-medium text-gray-800">
                                    {(bracket.rate * 100).toFixed(1)}%
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <p className="text-xs text-gray-500 mt-4">
                Note: These rates apply to your taxable income. This table does not include provincial tax brackets.
            </p>
        </div>
    );
};

export default FederalTaxBrackets;
