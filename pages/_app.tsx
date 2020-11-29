import '../styles/globals.css';
import { ChakraProvider } from '@chakra-ui/core';
import theme from '@/theme/extendedTheme';
import '@/assets/i18n';
import { FC } from 'react';
import type { AppProps } from 'next/app';
import Layout from '@/components/layout/Layout';
import Head from 'next/head';

const App: FC<{ Component: any; pageProps: AppProps }> = ({
  Component,
  pageProps,
}) => {
  return (
    <ChakraProvider theme={theme}>
      <Head>
        <title>Bread Toolkit</title>
        <meta
          name="description"
          content="Online tools to help your baking journey"
        />
        <meta
          name="keywords"
          content="bread,loaf,sourdough,toolbox,calculator,baking,hydratation,kenyér,sütés,kovász,focaccia,pita,baguette,ciabatta,artisan,starter,tartine,kovászos kenyér készítés,bread starters"
        />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
};

export default App;
