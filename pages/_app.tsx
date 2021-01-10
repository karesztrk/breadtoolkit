import '../styles/globals.css';
import { Box, ChakraProvider, Flex } from '@chakra-ui/react';
import theme from '@/theme/extendedTheme';
import { FC } from 'react';
import type { AppProps } from 'next/app';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const App: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={theme}>
      <Flex minHeight="100vh" direction="column">
        <Header />
        <Box as="main" flexGrow={1} position="relative">
          <Component {...pageProps} />
        </Box>
        <Footer />
      </Flex>
    </ChakraProvider>
  );
};

export default App;
