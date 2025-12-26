
import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-gray-800 text-white py-6 mt-12">
      <div className="container mx-auto px-4 text-center">
        <p>&copy; {currentYear} Canada Tax Calculator. All Rights Reserved.</p>
        <p className="text-sm text-gray-400 mt-2">
          This calculator is for informational purposes only and should not be considered financial advice.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
