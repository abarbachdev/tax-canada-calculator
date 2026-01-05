
import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-gray-800 text-white py-8 mt-12">
      <div className="container mx-auto px-4 text-center">
        <p className="text-lg font-semibold mb-2">Net Salary Calculator Canada</p>
        <p className="text-sm text-gray-400">
          &copy; {currentYear} All Rights Reserved.
        </p>
        <p className="text-xs text-gray-500 mt-4 max-w-md mx-auto">
          This calculator is for informational purposes only and should not be considered financial or tax advice. Always consult with a professional for your specific situation.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
