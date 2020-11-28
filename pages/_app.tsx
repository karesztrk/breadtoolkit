import '../styles/globals.css';
import { ChakraProvider } from '@chakra-ui/core';
import theme from '@/theme/extendedTheme';
import '@/assets/i18n';
import { FC } from 'react';
import type { AppProps } from 'next/app';
import Layout from '@/components/layout/Layout';

const App: FC<{ Component: any; pageProps: AppProps }> = ({
  Component,
  pageProps,
}) => {
  // TODO Meta
  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
};

export default App;
