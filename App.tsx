
import React, { Suspense } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { TaxProvider } from './context/TaxContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import ProvincialCalculatorPage from './pages/ProvincialCalculatorPage';
import PlaceholderPage from './pages/PlaceholderPage';
import NetSalaryPage from './pages/NetSalaryPage';
import BlogListPage from './pages/BlogListPage';
import BlogPostPage from './pages/BlogPostPage';
import PaychequeCalculatorPage from './pages/PaychequeCalculatorPage';
import MortgageCalculatorPage from './pages/MortgageCalculatorPage';
import { PROVINCES } from './utils/taxConstants';

const App: React.FC = () => {
  return (
    <TaxProvider>
      <HashRouter>
        <Layout>
          <Suspense fallback={<div className="flex items-center justify-center h-64"><p className="text-gray-500 animate-pulse text-lg">Loading Calculator...</p></div>}>
            <Routes>
              <Route path="/" element={<NetSalaryPage />} />
              <Route path="/tax-refund-estimator" element={<Home />} />
              {Object.keys(PROVINCES).map(provinceCode => {
                const province = PROVINCES[provinceCode as keyof typeof PROVINCES];
                return (
                  <Route
                    key={provinceCode}
                    path={`/${province.slug}-tax-calculator`}
                    element={<ProvincialCalculatorPage provinceCode={provinceCode as keyof typeof PROVINCES} />}
                  />
                );
              })}
              <Route path="/blog" element={<BlogListPage />} />
              <Route path="/blog/:slug" element={<BlogPostPage />} />
              <Route path="/paycheque-calculator" element={<PaychequeCalculatorPage />} />
              <Route path="/mortgage-calculator" element={<MortgageCalculatorPage />} />
              <Route path="/cpp-ei-deductions" element={<PlaceholderPage title="CPP & EI Deductions" />} />
            </Routes>
          </Suspense>
        </Layout>
      </HashRouter>
    </TaxProvider>
  );
};

export default App;
