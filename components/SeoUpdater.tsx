
import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SeoUpdaterProps {
  title: string;
  description: string;
}

const SeoUpdater: React.FC<SeoUpdaterProps> = ({ title, description }) => {
  return (
    <Helmet>
      <title>{`${title} | Canada Tax Calculator`}</title>
      <meta name="description" content={description} />
    </Helmet>
  );
};

export default SeoUpdater;
