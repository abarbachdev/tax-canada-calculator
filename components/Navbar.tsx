
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Landmark, Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="h-1 bg-yellow-400 w-full"></div>
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2 text-xl md:text-2xl font-black text-gray-900">
          <Landmark className="text-blue-600" size={24} />
          <span>Net Salary <span className="text-blue-600">Calc</span></span>
        </Link>
        
        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-6 text-sm font-semibold text-gray-600">
          <Link to="/tax-refund-estimator" className="hover:text-blue-600 transition">Tax Refund</Link>
          <Link to="/paycheque-calculator" className="hover:text-blue-600 transition">Paycheque</Link>
          <Link to="/mortgage-calculator" className="hover:text-blue-600 transition">Mortgage</Link>
          <Link to="/blog" className="hover:text-blue-600 transition">Blog</Link>
          <Link to="/cpp-ei-deductions" className="hover:text-blue-600 transition">CPP/EI</Link>
        </div>

        {/* Mobile Toggle */}
        <button onClick={toggleMenu} className="md:hidden p-2 text-gray-600 focus:outline-none">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 py-4 px-4 space-y-4 shadow-xl animate-in slide-in-from-top duration-200">
          <Link to="/tax-refund-estimator" onClick={toggleMenu} className="block text-gray-700 font-medium hover:text-blue-600">Tax Refund</Link>
          <Link to="/paycheque-calculator" onClick={toggleMenu} className="block text-gray-700 font-medium hover:text-blue-600">Paycheque</Link>
          <Link to="/mortgage-calculator" onClick={toggleMenu} className="block text-gray-700 font-medium hover:text-blue-600">Mortgage</Link>
          <Link to="/blog" onClick={toggleMenu} className="block text-gray-700 font-medium hover:text-blue-600">Blog</Link>
          <Link to="/cpp-ei-deductions" onClick={toggleMenu} className="block text-gray-700 font-medium hover:text-blue-600">CPP/EI</Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
