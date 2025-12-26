
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { useTaxContext } from '../context/TaxContext';
import { ArrowDown, ArrowUp, Banknote, Landmark, ShieldCheck, FileText, PiggyBank } from 'lucide-react';

const ResultsDisplay: React.FC = () => {
    const { results, loading, payFrequency } = useTaxContext().state;

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' }).format(amount);
    };

    if (loading) {
        return <div className="text-center p-8"><p>Calculating...</p></div>;
    }

    if (!results) {
        return (
            <div className="text-center p-8 mt-6 bg-white rounded-2xl shadow-lg border border-gray-200">
                <p className="text-gray-600">Enter your details and click "Calculate" to see your tax breakdown.</p>
            </div>
        );
    }
    
    const getFrequencyDivisor = () => {
        switch(payFrequency) {
            case 'monthly': return 12;
            case 'bi-weekly': return 26;
            case 'hourly': return 2080; // 40 * 52
            case 'annually':
            default: return 1;
        }
    };
    
    const divisor = getFrequencyDivisor();
    const payFrequencyLabel = payFrequency.charAt(0).toUpperCase() + payFrequency.slice(1);

    const chartData = [
        { name: 'Net Pay', value: results.netAnnual, color: '#10B981' }, // Emerald-500
        { name: 'Federal Tax', value: results.federalTax, color: '#3B82F6' }, // Blue-500
        { name: 'Provincial Tax', value: results.provincialTax, color: '#6366F1' }, // Indigo-500
        { name: 'CPP/QPP', value: results.cppContribution, color: '#F97316' }, // Orange-500
        { name: 'EI/QPIP', value: results.eiContribution, color: '#F59E0B' }, // Amber-500
    ];

    const BreakdownRow = ({ icon, label, annualValue }: { icon: React.ReactElement; label: string; annualValue: number }) => (
        <div className="flex justify-between items-center py-3 border-b border-gray-200 last:border-b-0">
            <span className="flex items-center text-gray-600">
                {icon}
                {label}
            </span>
            <div className="text-right">
                <p className="font-semibold text-gray-800">{formatCurrency(annualValue / divisor)}</p>
                <p className="text-xs text-gray-500">{formatCurrency(annualValue)} / yr</p>
            </div>
        </div>
    );

    return (
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Left Side - Breakdown */}
            <div className="lg:col-span-3 bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Your {payFrequencyLabel} Pay Breakdown</h2>
                <BreakdownRow icon={<ArrowUp className="w-5 h-5 mr-3 text-green-500" />} label="Gross Income" annualValue={results.grossAnnual} />
                <BreakdownRow icon={<ArrowDown className="w-5 h-5 mr-3 text-red-500" />} label="Federal Tax" annualValue={results.federalTax} />
                <BreakdownRow icon={<ArrowDown className="w-5 h-5 mr-3 text-red-500" />} label="Provincial Tax" annualValue={results.provincialTax} />
                <BreakdownRow icon={<ArrowDown className="w-5 h-5 mr-3 text-orange-500" />} label="CPP/QPP" annualValue={results.cppContribution} />
                <BreakdownRow icon={<ArrowDown className="w-5 h-5 mr-3 text-amber-500" />} label="EI/QPIP" annualValue={results.eiContribution} />
                
                <div className="mt-6 pt-4 border-t-2 border-dashed border-gray-200">
                    <div className="flex justify-between items-center py-2 bg-emerald-50 rounded-lg px-4">
                        <span className="flex items-center text-lg font-bold text-emerald-700">
                            <Banknote className="w-6 h-6 mr-3" />
                            Net Income ({payFrequencyLabel})
                        </span>
                        <div className="text-right">
                             <p className="text-lg font-bold text-emerald-800">{formatCurrency(results.netAnnual / divisor)}</p>
                             <p className="text-sm text-emerald-600">{formatCurrency(results.netAnnual)} / yr</p>
                        </div>
                    </div>
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-3 rounded-lg text-center">
                            <p className="text-sm text-gray-600">Net Monthly</p>
                            <p className="font-semibold text-gray-900 text-lg">{formatCurrency(results.netAnnual / 12)}</p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg text-center">
                            <p className="text-sm text-gray-600">Net Bi-Weekly</p>
                            <p className="font-semibold text-gray-900 text-lg">{formatCurrency(results.netAnnual / 26)}</p>
                        </div>
                    </div>
                </div>

                {results.rrspSavings > 0 && (
                    <div className="mt-6 text-center bg-blue-50 p-4 rounded-lg">
                        <p className="flex items-center justify-center font-semibold text-blue-700">
                            <PiggyBank className="w-5 h-5 mr-2" />
                            Your RRSP contribution resulted in tax savings of {formatCurrency(results.rrspSavings)}!
                        </p>
                    </div>
                )}
            </div>

            {/* Right Side - Chart */}
            <div className="lg:col-span-2 bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-gray-200 flex flex-col justify-center items-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Income Distribution</h2>
                <div className="w-full h-80">
                    <ResponsiveContainer>
                        <PieChart>
                            <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} labelLine={false}>
                                {chartData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                            </Pie>
                            <Tooltip formatter={(value: number) => formatCurrency(value)} />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default ResultsDisplay;
