import '../styles/globals.css';
import { ChakraProvider } from '@chakra-ui/core';
import theme from '@/theme/extendedTheme';
import { FC, useEffect } from 'react';
import type { AppProps } from 'next/app';
import Layout from '@/components/layout/Layout';
import Head from 'next/head';
import { I18nProvider } from 'next-localization';
import { PageProp } from '@/types/page';
import { useRouter } from 'next/dist/client/router';

const App: FC<AppProps<PageProp>> = ({ Component, pageProps }) => {
  const router = useRouter();
  const { lngDict } = pageProps;
  const locale = (router && router.locale) || '';
  return (
    <ChakraProvider theme={theme}>
      <Head>
        <title>Bread Toolkit</title>
      </Head>
      <I18nProvider lngDict={lngDict} locale={locale}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </I18nProvider>
    </ChakraProvider>
  );
};

export default App;
