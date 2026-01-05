
import React, { useState, useEffect } from 'react';
import { DollarSign, Percent, Calendar, Calculator, TrendingUp, Info, Home } from 'lucide-react';

const MortgageCalculator: React.FC = () => {
  const [homePrice, setHomePrice] = useState(500000);
  const [downPayment, setDownPayment] = useState(100000);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [interestRate, setInterestRate] = useState(4.5);
  const [amortization, setAmortization] = useState(25);
  const [paymentFrequency, setPaymentFrequency] = useState('monthly');
  
  const [results, setResults] = useState<{
    periodicPayment: number;
    totalPrincipal: number;
    totalInterest: number;
    totalCost: number;
  } | null>(null);

  const calculateMortgage = () => {
    const principal = homePrice - downPayment;
    const annualRate = interestRate / 100;
    const paymentsPerYear = paymentFrequency === 'monthly' ? 12 : 26;
    const periodicRate = Math.pow(1 + annualRate / 2, 2 / paymentsPerYear) - 1;
    const totalPayments = amortization * paymentsPerYear;
    const periodicPayment = (principal * periodicRate) / (1 - Math.pow(1 + periodicRate, -totalPayments));
    const totalCost = periodicPayment * totalPayments;
    const totalInterest = totalCost - principal;

    setResults({ periodicPayment, totalPrincipal: principal, totalInterest, totalCost });
  };

  useEffect(() => {
    calculateMortgage();
  }, []);

  const handlePriceChange = (val: number) => {
    setHomePrice(val);
    const newDown = (val * downPaymentPercent) / 100;
    setDownPayment(newDown);
  };

  const handleDownPaymentChange = (val: number) => {
    setDownPayment(val);
    setDownPaymentPercent((val / homePrice) * 100);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' }).format(amount);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
      {/* Inputs Section */}
      <div className="lg:col-span-1 bg-white p-6 md:p-8 rounded-3xl shadow-xl border border-gray-100 space-y-6">
        <h3 className="text-xl font-black text-gray-900 border-b border-gray-100 pb-4 flex items-center gap-3">
          <div className="p-2 bg-yellow-400 rounded-lg">
            <Home className="w-5 h-5 text-gray-900" />
          </div>
          Inputs
        </h3>
        
        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Home Price</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">$</span>
            <input 
              type="number" 
              value={homePrice}
              onChange={(e) => handlePriceChange(Number(e.target.value))}
              className="w-full pl-8 pr-4 py-3 border border-gray-100 rounded-xl focus:ring-2 focus:ring-yellow-400 outline-none bg-gray-50 font-bold"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Down Pay ($)</label>
            <input 
              type="number" 
              value={downPayment}
              onChange={(e) => handleDownPaymentChange(Number(e.target.value))}
              className="w-full px-4 py-3 border border-gray-100 rounded-xl focus:ring-2 focus:ring-yellow-400 outline-none bg-gray-50 font-bold text-sm"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Down Pay (%)</label>
            <div className="relative">
              <input 
                type="number" 
                value={downPaymentPercent.toFixed(1)}
                onChange={(e) => {
                  const pct = Number(e.target.value);
                  setDownPaymentPercent(pct);
                  setDownPayment((homePrice * pct) / 100);
                }}
                className="w-full pl-4 pr-8 py-3 border border-gray-100 rounded-xl focus:ring-2 focus:ring-yellow-400 outline-none bg-gray-50 font-bold text-sm"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">%</span>
            </div>
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Interest Rate</label>
          <div className="relative">
            <input 
              type="number" 
              step="0.1"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full pl-4 pr-8 py-3 border border-gray-100 rounded-xl focus:ring-2 focus:ring-yellow-400 outline-none bg-gray-50 font-bold"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">%</span>
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Amortization</label>
          <select 
            value={amortization}
            onChange={(e) => setAmortization(Number(e.target.value))}
            className="w-full px-4 py-3 border border-gray-100 rounded-xl focus:ring-2 focus:ring-yellow-400 outline-none bg-gray-50 font-bold"
          >
            {[5, 10, 15, 20, 25, 30].map(yr => <option key={yr} value={yr}>{yr} Years</option>)}
          </select>
        </div>

        <button 
          onClick={calculateMortgage}
          className="w-full bg-yellow-400 text-gray-900 font-black py-4 rounded-xl hover:bg-yellow-500 transition transform active:scale-95 shadow-lg uppercase text-sm tracking-widest"
        >
          Calculate Payment
        </button>
      </div>

      {/* Results Section */}
      <div className="lg:col-span-2 space-y-6 md:space-y-8">
        {results ? (
          <div className="bg-white p-6 md:p-10 rounded-3xl shadow-xl border border-gray-50 relative overflow-hidden">
            <div className="absolute -right-4 -top-4 w-32 h-32 bg-yellow-100 rounded-full opacity-20"></div>
            <div className="text-center mb-10">
              <p className="text-gray-400 font-black uppercase tracking-widest text-xs">Estimated Monthly Payment</p>
              <h2 className="text-5xl md:text-7xl font-black text-gray-900 mt-2 tracking-tighter">
                {formatCurrency(results.periodicPayment)}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-8 border-t border-gray-100">
              <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100">
                <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest mb-1">Total Principal</p>
                <p className="text-xl font-black text-gray-900">{formatCurrency(results.totalPrincipal)}</p>
              </div>
              <div className="p-5 bg-amber-50 rounded-2xl border border-amber-100">
                <p className="text-[10px] text-amber-500 uppercase font-black tracking-widest mb-1">Total Interest</p>
                <p className="text-xl font-black text-amber-600">{formatCurrency(results.totalInterest)}</p>
              </div>
              <div className="p-5 bg-gray-900 rounded-2xl">
                <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest mb-1">Total Loan Cost</p>
                <p className="text-xl font-black text-white">{formatCurrency(results.totalCost)}</p>
              </div>
            </div>

            <div className="mt-10 bg-blue-50 p-6 rounded-2xl flex items-start gap-4">
              <div className="p-2 bg-blue-100 rounded-lg shrink-0">
                <Info className="w-5 h-5 text-blue-600" />
              </div>
              <p className="text-xs md:text-sm text-blue-800 leading-relaxed font-medium">
                Tip: If your down payment is less than <span className="font-black">20%</span>, you'll need CMHC insurance. 
                This can add 2.8% to 4.0% to your loan amount. Our calculation covers principal and interest only.
              </p>
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center bg-gray-100 rounded-3xl border-2 border-dashed border-gray-200">
            <p className="text-gray-400 font-bold">Calculate to see your results</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MortgageCalculator;
