import React, { FC } from 'react';
import Head from 'next/head';
import en from '@/locales/en';
import hu from '@/locales/hu';
import { useRouter } from 'next/router';

interface MetaProps {
  title?: string;
  subtitle?: string;
  description?: string;
  keywords?: string;
}

const Meta: FC<MetaProps> = ({
  title = 'Bread Toolkit',
  subtitle,
  description,
  keywords,
}) => {
  const { locale } = useRouter();
  const t = locale === 'en' ? en : hu;
  const desc = description || t.meta.description;
  const kywrds = keywords || t.meta.keywords;
  const headTitle = subtitle ? `${title} - ${subtitle}` : title;
  return (
    <Head>
      <title>{headTitle}</title>
      <link
        rel="preload"
        href="/fonts/inter-var-latin.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
      <meta name="description" content={desc} />
      <meta name="keywords" content={kywrds} />
      <link rel="manifest" href="/manifest.json" />
      <meta name="apple-mobile-web-app-title" content={title} />
      <meta name="application-name" content={title} />

      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content={title} />
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="msapplication-square70x70logo" content="/logo192.png" />
      <meta name="msapplication-square150x150logo" content="/logo192.png" />
      <meta name="msapplication-square310x310logo" content="/logo512.png" />
      <meta name="msapplication-TileColor" content="#3B3437" />
      <meta name="msapplication-tap-highlight" content="no" />
      <meta name="theme-color" content="#3B3437" />

      <link rel="apple-touch-icon" sizes="192x192" href="/logo192.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/logo16.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/logo32.png" />
      <link rel="icon" type="image/png" sizes="192x192" href="/logo192.png" />
      <link rel="icon" type="image/png" sizes="512x512" href="/logo512.png" />
      <link rel="manifest" href="/static/manifest.json" />

      <link rel="shortcut icon" href="/favicon.ico" />

      <meta name="twitter:card" content={title} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={title} />
    </Head>
  );
};

export default Meta;
