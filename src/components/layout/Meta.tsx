import React from 'react';
import { Helmet } from 'react-helmet';

const Meta = ({
  title = 'Bread Toolkit',
  description = 'Online tools to help your baking journey',
  keywords = 'bread, loaf, sourdough, toolbox, calculator, baking, hydratation',
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </Helmet>
  );
};

export default Meta;
