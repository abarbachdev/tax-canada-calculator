
import type { CalculationInput, CalculationResult, TaxBracket, ProvinceKey, AnnualCalculationInput, AnnualCalculationResult } from '../types';
import { TAX_CONSTANTS_2025 } from './taxConstants';

const calculateMarginalTax = (income: number, brackets: TaxBracket[]): number => {
  let tax = 0;
  let remainingIncome = income;

  for (let i = 0; i < brackets.length; i++) {
    const bracket = brackets[i];
    const prevMax = i > 0 ? brackets[i - 1].max! : 0;
    
    if (remainingIncome <= 0) break;

    const taxableInBracket = bracket.max
      ? Math.min(remainingIncome, bracket.max - prevMax)
      : remainingIncome;

    tax += taxableInBracket * bracket.rate;
    remainingIncome -= taxableInBracket;
  }
  return tax;
};


const calculateFederalTax = (taxableIncome: number): number => {
  if (taxableIncome <= 0) return 0;
  const { brackets, basicPersonalAmount } = TAX_CONSTANTS_2025.federal;
  const incomeAfterBPA = Math.max(0, taxableIncome - basicPersonalAmount);
  return calculateMarginalTax(incomeAfterBPA, brackets);
};

const calculateProvincialTax = (taxableIncome: number, province: ProvinceKey): number => {
    if (taxableIncome <= 0) return 0;
    const { brackets } = TAX_CONSTANTS_2025.provinces[province];
    // Note: Provincial personal amounts are simplified for this example.
    // A real implementation would have specific amounts per province.
    return calculateMarginalTax(taxableIncome, brackets);
};

const calculateCPP = (grossIncome: number): number => {
  const { cpp } = TAX_CONSTANTS_2025;
  const pensionableIncome = Math.max(0, grossIncome - cpp.exemption);
  return Math.min(pensionableIncome * cpp.rate, cpp.max);
};

const calculateEI = (grossIncome: number): number => {
  const { ei } = TAX_CONSTANTS_2025;
  return Math.min(grossIncome * ei.rate, ei.max);
};

const calculateQPP = (grossIncome: number): number => {
  const { qpp } = TAX_CONSTANTS_2025;
  const pensionableIncome = Math.max(0, grossIncome - qpp.exemption);
  return Math.min(pensionableIncome * qpp.rate, qpp.max);
};

const calculateQPIP = (grossIncome: number): number => {
  const { qpip } = TAX_CONSTANTS_2025;
  return Math.min(grossIncome * qpip.employee.rate, qpip.employee.max);
};

export const calculateTaxes = (input: CalculationInput): CalculationResult => {
    const { grossIncome, rrspContribution, province, payFrequency } = input;

    let grossAnnual: number;
    switch(payFrequency) {
        case 'hourly':
            grossAnnual = grossIncome * 40 * 52; // Assuming 40 hour week
            break;
        case 'bi-weekly':
            grossAnnual = grossIncome * 26;
            break;
        case 'monthly':
            grossAnnual = grossIncome * 12;
            break;
        case 'annually':
        default:
            grossAnnual = grossIncome;
            break;
    }
    
    const taxableIncome = Math.max(0, grossAnnual - rrspContribution);
    
    const federalTax = calculateFederalTax(taxableIncome);
    const provincialTax = calculateProvincialTax(taxableIncome, province);
    
    let cppContribution = 0;
    let eiContribution = 0;

    if (province === 'QC') {
        cppContribution = calculateQPP(grossAnnual);
        eiContribution = calculateQPIP(grossAnnual);
    } else {
        cppContribution = calculateCPP(grossAnnual);
        eiContribution = calculateEI(grossAnnual);
    }
    
    const totalTax = federalTax + provincialTax;
    const totalDeductions = totalTax + cppContribution + eiContribution;
    const netAnnual = grossAnnual - totalDeductions;

    // RRSP Savings is the tax reduction from the contribution
    const incomeWithoutRRSP = grossAnnual;
    const taxWithoutRRSP = calculateFederalTax(incomeWithoutRRSP) + calculateProvincialTax(incomeWithoutRRSP, province);
    const rrspSavings = taxWithoutRRSP - totalTax;

    return {
        grossAnnual,
        netAnnual,
        totalTax,
        federalTax,
        provincialTax,
        cppContribution,
        eiContribution,
        rrspSavings: Math.max(0, rrspSavings),
    };
};

export const calculateAnnualTaxReturn = (input: AnnualCalculationInput): AnnualCalculationResult => {
    const { annualIncome, rrspContribution, province } = input;
    
    const taxableIncome = Math.max(0, annualIncome - rrspContribution);
    
    const federalTax = calculateFederalTax(taxableIncome);
    const provincialTax = calculateProvincialTax(taxableIncome, province);
    
    const totalTax = federalTax + provincialTax;

    return {
        taxableIncome,
        federalTax,
        provincialTax,
        totalTax,
    };
};
