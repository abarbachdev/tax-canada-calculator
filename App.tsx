
import React from 'react';
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
import { PROVINCES } from './utils/taxConstants';

const App: React.FC = () => {
  return (
    <TaxProvider>
      <HashRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
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
            <Route path="/net-salary" element={<NetSalaryPage />} />
            <Route path="/blog" element={<BlogListPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
            <Route path="/paycheque-calculator" element={<PaychequeCalculatorPage />} />
            <Route path="/rrsp-savings" element={<PlaceholderPage title="RRSP Savings Calculator" />} />
            <Route path="/cpp-ei-deductions" element={<PlaceholderPage title="CPP & EI Deductions" />} />
          </Routes>
        </Layout>
      </HashRouter>
    </TaxProvider>
  );
};

export default App;