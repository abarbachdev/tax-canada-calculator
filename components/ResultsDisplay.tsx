
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { useTaxContext } from '../context/TaxContext';
import { ArrowDown, ArrowUp, Banknote, Landmark, ShieldCheck, FileText, PiggyBank, Star } from 'lucide-react';

const ResultsDisplay: React.FC = () => {
    const { results, loading, payFrequency } = useTaxContext().state;

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' }).format(amount);
    };

    if (loading) {
        return <div className="text-center p-8"><p className="animate-pulse text-gray-500 font-medium">Calculating your take-home pay...</p></div>;
    }

    if (!results) {
        return (
            <div className="text-center p-8 mt-6 bg-white rounded-2xl shadow-lg border border-gray-200 border-dashed">
                <p className="text-gray-400">Enter your details and click "Calculate Net Pay" to see your breakdown.</p>
            </div>
        );
    }
    
    const getFrequencyDivisor = () => {
        switch(payFrequency) {
            case 'monthly': return 12;
            case 'bi-weekly': return 26;
            case 'hourly': return 2080;
            case 'annually':
            default: return 1;
        }
    };
    
    const divisor = getFrequencyDivisor();
    const payFrequencyLabel = payFrequency.charAt(0).toUpperCase() + payFrequency.slice(1);

    const chartData = [
        { name: 'Net Pay', value: results.netAnnual, color: '#10B981' }, 
        { name: 'Federal Tax', value: results.federalTax, color: '#3B82F6' },
        { name: 'Provincial Tax', value: results.provincialTax, color: '#6366F1' },
        { name: 'CPP/QPP', value: results.cppContribution, color: '#F59E0B' },
        { name: 'EI/QPIP', value: results.eiContribution, color: '#F97316' },
    ];

    const BreakdownRow = ({ icon, label, annualValue }: { icon: React.ReactElement; label: string; annualValue: number }) => (
        <div className="flex justify-between items-center py-4 border-b border-gray-100 last:border-b-0">
            <span className="flex items-center text-sm font-semibold text-gray-600 uppercase tracking-tight">
                {icon}
                {label}
            </span>
            <div className="text-right">
                <p className="font-bold text-gray-900 text-lg">{formatCurrency(annualValue / divisor)}</p>
                <p className="text-xs text-gray-400 font-medium">{formatCurrency(annualValue)} / year</p>
            </div>
        </div>
    );

    return (
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-5 gap-6 md:gap-8">
            {/* Left Side - Breakdown */}
            <div className="lg:col-span-3 bg-white p-6 md:p-10 rounded-3xl shadow-xl border border-gray-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5">
                    <Banknote size={120} />
                </div>
                <h2 className="text-2xl font-black text-gray-900 mb-8 flex items-center gap-2">
                    <div className="w-2 h-8 bg-yellow-400 rounded-full"></div>
                    {payFrequencyLabel} Pay Summary
                </h2>
                <BreakdownRow icon={<ArrowUp className="w-5 h-5 mr-3 text-green-500" />} label="Gross Income" annualValue={results.grossAnnual} />
                <BreakdownRow icon={<ArrowDown className="w-5 h-5 mr-3 text-red-400" />} label="Federal Tax" annualValue={results.federalTax} />
                <BreakdownRow icon={<ArrowDown className="w-5 h-5 mr-3 text-red-400" />} label="Provincial Tax" annualValue={results.provincialTax} />
                <BreakdownRow icon={<ArrowDown className="w-5 h-5 mr-3 text-amber-500" />} label="CPP/QPP" annualValue={results.cppContribution} />
                <BreakdownRow icon={<ArrowDown className="w-5 h-5 mr-3 text-orange-400" />} label="EI/QPIP" annualValue={results.eiContribution} />
                
                <div className="mt-10 pt-6 border-t-4 border-yellow-400 border-dotted">
                    <div className="flex justify-between items-center p-6 bg-gray-900 rounded-2xl shadow-inner group">
                        <span className="flex items-center text-lg font-black text-white uppercase tracking-wider">
                            <Banknote className="w-8 h-8 mr-4 text-yellow-400 group-hover:scale-110 transition-transform" />
                            Net Income
                        </span>
                        <div className="text-right">
                             <p className="text-3xl font-black text-white">{formatCurrency(results.netAnnual / divisor)}</p>
                             <p className="text-xs font-bold text-yellow-400 uppercase">{formatCurrency(results.netAnnual)} / year</p>
                        </div>
                    </div>
                </div>

                {results.rrspSavings > 0 && (
                    <div className="mt-8 text-center bg-yellow-50 border border-yellow-200 p-5 rounded-2xl relative overflow-hidden group">
                        <div className="absolute -left-2 -top-2 text-yellow-200 opacity-20 group-hover:scale-125 transition-transform duration-1000">
                          <Star size={60} fill="currentColor" />
                        </div>
                        <p className="flex items-center justify-center font-black text-yellow-800 text-sm md:text-base relative z-10">
                            <PiggyBank className="w-6 h-6 mr-3 text-yellow-600 animate-bounce" />
                            RRSP SAVINGS: {formatCurrency(results.rrspSavings)} TAX REBATE!
                        </p>
                    </div>
                )}
            </div>

            {/* Right Side - Chart */}
            <div className="lg:col-span-2 bg-white p-6 md:p-10 rounded-3xl shadow-xl border border-gray-100 flex flex-col justify-center items-center">
                <h2 className="text-xl font-black text-gray-900 mb-8 text-center uppercase tracking-widest">Visual Breakdown</h2>
                <div className="w-full h-80 relative">
                    <ResponsiveContainer>
                        <PieChart>
                            <Pie 
                                data={chartData} 
                                dataKey="value" 
                                nameKey="name" 
                                cx="50%" 
                                cy="50%" 
                                innerRadius={70}
                                outerRadius={100} 
                                paddingAngle={5}
                                stroke="none"
                            >
                                {chartData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                            </Pie>
                            <Tooltip 
                                contentStyle={{ borderRadius: '15px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                formatter={(value: number) => formatCurrency(value)} 
                            />
                            <Legend iconType="circle" />
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                      <p className="text-xs font-black text-gray-400 uppercase">Take Home</p>
                      <p className="text-lg font-black text-emerald-600">{((results.netAnnual / results.grossAnnual) * 100).toFixed(0)}%</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResultsDisplay;
