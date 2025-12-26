
import React from 'react';
import { Link } from 'react-router-dom';
import { Landmark } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2 text-2xl font-bold text-gray-800">
          <Landmark className="text-blue-600" size={28} />
          <span>Canada Tax Calculator</span>
        </Link>
        <div className="hidden md:flex items-center space-x-6 text-gray-600">
          <Link to="/net-salary" className="hover:text-blue-600 transition">Net Salary</Link>
          <Link to="/blog" className="hover:text-blue-600 transition">Blog</Link>
          <Link to="/paycheque-calculator" className="hover:text-blue-600 transition">Paycheque</Link>
          <Link to="/rrsp-savings" className="hover:text-blue-600 transition">RRSP Savings</Link>
          <Link to="/cpp-ei-deductions" className="hover:text-blue-600 transition">CPP/EI</Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
