
import React from 'react';

interface SeoUpdaterProps {
  title: string;
  description: string;
  path?: string;
  type?: 'website' | 'article';
}

const SeoUpdater: React.FC<SeoUpdaterProps> = ({ title, description, path = '', type = 'website' }) => {
  const baseUrl = 'https://canadataxcalc.com'; // Replace with your actual domain
  const fullUrl = `${baseUrl}${path}`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": title,
    "description": description,
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "CAD"
    },
    "author": {
      "@type": "Organization",
      "name": "Canada Tax Calculator"
    }
  };

  return (
    <>
      <title>{`${title} | Canada Tax Calculator`}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={fullUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${baseUrl}/og-image.png`} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={fullUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={`${baseUrl}/og-image.png`} />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </>
  );
};

export default SeoUpdater;
