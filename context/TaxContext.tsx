
import React, { createContext, useReducer, useContext, Dispatch } from 'react';
import type { TaxState, TaxAction, CalculationResult, CalculationInput, ProvinceKey } from '../types';
import { calculateTaxes } from '../utils/taxEngine';

const initialState: TaxState = {
  grossIncome: 75000,
  payFrequency: 'annually',
  rrspContribution: 5000,
  province: 'ON',
  results: null,
  loading: false,
};

const TaxContext = createContext<{ state: TaxState; dispatch: Dispatch<TaxAction> } | undefined>(undefined);

const taxReducer = (state: TaxState, action: TaxAction): TaxState => {
  switch (action.type) {
    case 'SET_INPUT':
      return { ...state, ...action.payload };
    case 'CALCULATE_START':
      return { ...state, loading: true };
    case 'CALCULATE_SUCCESS':
      return { ...state, loading: false, results: action.payload };
    case 'CALCULATE_ERROR':
        return { ...state, loading: false, results: null };
    default:
      return state;
  }
};

export const TaxProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(taxReducer, initialState);

  return (
    <TaxContext.Provider value={{ state, dispatch }}>
      {children}
    </TaxContext.Provider>
  );
};

export const useTaxContext = () => {
  const context = useContext(TaxContext);
  if (context === undefined) {
    throw new Error('useTaxContext must be used within a TaxProvider');
  }
  return context;
};

export const useTaxCalculator = () => {
    const { state, dispatch } = useTaxContext();

    const runCalculation = () => {
        dispatch({ type: 'CALCULATE_START' });
        try {
            const results = calculateTaxes({
                grossIncome: state.grossIncome,
                payFrequency: state.payFrequency,
                rrspContribution: state.rrspContribution,
                province: state.province,
            });
            dispatch({ type: 'CALCULATE_SUCCESS', payload: results });
        } catch (error) {
            console.error("Calculation failed:", error);
            dispatch({ type: 'CALCULATE_ERROR' });
        }
    };
    
    return { ...state, dispatch, runCalculation };
}
