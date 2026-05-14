import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../../contexts/LanguageContext';

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  twitterHandle?: string;
}

export const SEO = ({
  title,
  description,
  canonical,
  ogImage = '/logo.png',
  ogType = 'website',
  twitterHandle = '@ecoturpb',
}: SEOProps) => {
  const { language } = useLanguage();
  
  const siteName = 'EcoTurPB';
  const fullTitle = title ? `${title} | ${siteName}` : siteName;
  const defaultDescription = 'Aproveite a Paraíba do jeito certo com cultura e consciência. Descubra hospedagens, passeios e restaurantes sustentáveis.';
  const metaDescription = description || defaultDescription;
  const url = window.location.href;

  return (
    <Helmet>
      {/* Standard metadata */}
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      <link rel="canonical" href={canonical || url} />
      <html lang={language} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:site" content={twitterHandle} />
    </Helmet>
  );
};
