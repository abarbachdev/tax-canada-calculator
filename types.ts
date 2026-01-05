
export type ProvinceKey = 'AB' | 'BC' | 'MB' | 'NB' | 'NL' | 'NS' | 'ON' | 'PE' | 'QC' | 'SK';

export type PayFrequency = 'annually' | 'monthly' | 'bi-weekly' | 'hourly';

export interface TaxBracket {
  rate: number;
  min: number;
  max?: number;
}

export interface DeductionRates {
  rate: number;
  max: number;
}

export interface ProvinceTaxData {
  name: string;
  slug: string;
  brackets: TaxBracket[];
}

export interface TaxConstants {
  year: number;
  federal: {
    brackets: TaxBracket[];
    basicPersonalAmount: number;
  };
  provinces: Record<ProvinceKey, ProvinceTaxData>;
  cpp: DeductionRates & { exemption: number };
  ei: DeductionRates;
  qpp: DeductionRates & { exemption: number };
  qpip: {
    employee: DeductionRates;
    employer: DeductionRates;
  };
}

export interface CalculationInput {
  grossIncome: number;
  payFrequency: PayFrequency;
  rrspContribution: number;
  province: ProvinceKey;
}

export interface CalculationResult {
  grossAnnual: number;
  netAnnual: number;
  totalTax: number;
  federalTax: number;
  provincialTax: number;
  cppContribution: number;
  eiContribution: number;
  rrspSavings: number;
}

export interface TaxState extends CalculationInput {
  results: CalculationResult | null;
  loading: boolean;
}

export type TaxAction =
  | { type: 'SET_INPUT'; payload: Partial<CalculationInput> }
  | { type: 'CALCULATE_START' }
  | { type: 'CALCULATE_SUCCESS'; payload: CalculationResult }
  | { type: 'CALCULATE_ERROR' };

export interface AnnualCalculationInput {
  annualIncome: number;
  rrspContribution: number;
  province: ProvinceKey;
}

export interface AnnualCalculationResult {
  taxableIncome: number;
  federalTax: number;
  provincialTax: number;
  totalTax: number;
}
