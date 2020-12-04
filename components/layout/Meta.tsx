import React, { FC } from 'react';
import Head from 'next/head';

interface MetaProps {
  title?: string;
  subtitle?: string;
  description: string;
  keywords: string;
}

const Meta: FC<MetaProps> = ({
  title = 'Bread Toolkit',
  subtitle,
  description,
  keywords,
}) => {
  const headTitle = subtitle ? `${title} - ${subtitle}` : title;
  return (
    <Head>
      <title>{headTitle}</title>
      {description && <meta name="description" content={description} />}
      {keywords && <meta name="keywords" content={keywords} />}
    </Head>
  );
};

export default Meta;
