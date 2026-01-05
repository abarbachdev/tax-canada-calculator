
import React, { useState, useCallback } from 'react';
import AnnualTaxCalculator from '../components/AnnualTaxCalculator';
import AnnualTaxResults from '../components/AnnualTaxResults';
import HomeSeoContent from '../components/HomeSeoContent';
import FederalTaxBrackets from '../components/FederalTaxBrackets';
import { calculateAnnualTaxReturn } from '../utils/taxEngine';
import type { AnnualCalculationResult, ProvinceKey } from '../types';

type FullResult = AnnualCalculationResult & {
    annualIncome: number;
    rrspContribution: number;
    taxPaid: number;
    finalBalance: number;
};

const Home: React.FC = () => {
    const [results, setResults] = useState<FullResult | null>(null);
    const [loading, setLoading] = useState(false);

    const handleCalculate = useCallback((inputs: { annualIncome: number, rrspContribution: number, taxPaid: number, province: ProvinceKey }) => {
        setLoading(true);

        // Instant visual reset for feedback
        setResults(null);

        // Small delay to ensure the 'Calculating...' state is visible and the CPU work doesn't block UI thread immediately
        setTimeout(() => {
            try {
                const calculationResult = calculateAnnualTaxReturn({
                    annualIncome: inputs.annualIncome,
                    rrspContribution: inputs.rrspContribution,
                    province: inputs.province,
                });

                const finalBalance = inputs.taxPaid - calculationResult.totalTax;

                setResults({
                    ...calculationResult,
                    annualIncome: inputs.annualIncome,
                    rrspContribution: inputs.rrspContribution,
                    taxPaid: inputs.taxPaid,
                    finalBalance,
                });
            } catch (err) {
                console.error("Calculation Error:", err);
            } finally {
                setLoading(false);
            }
        }, 150);
    }, []);

    return (
        <div>
            <AnnualTaxCalculator onCalculate={handleCalculate} />
            <AnnualTaxResults results={results} loading={loading} />
            <FederalTaxBrackets />
            <HomeSeoContent />
        </div>
    );
};

export default Home;
