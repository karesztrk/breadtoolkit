import '../styles/globals.css';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '@/theme/extendedTheme';
import { FC } from 'react';
import type { AppProps } from 'next/app';
import Layout from '@/components/layout/Layout';
import { PageProp } from '@/types/page';

const App: FC<AppProps<PageProp>> = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
};

export default App;
