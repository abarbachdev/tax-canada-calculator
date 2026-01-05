
import React from 'react';
import { Construction } from 'lucide-react';

interface PlaceholderPageProps {
  title: string;
}

const PlaceholderPage: React.FC<PlaceholderPageProps> = ({ title }) => {
  return (
    <>
      <div className="flex flex-col items-center justify-center text-center h-96 bg-white rounded-2xl shadow-lg border border-gray-200">
        <Construction className="w-16 h-16 text-blue-500 mb-4" />
        <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
        <p className="mt-2 text-gray-600">This feature is coming soon!</p>
      </div>
    </>
  );
};

export default PlaceholderPage;