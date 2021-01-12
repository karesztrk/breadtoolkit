import '../styles/globals.css';
import { Box, ChakraProvider, Flex } from '@chakra-ui/react';
import theme from '@/theme/extendedTheme';
import { FC } from 'react';
import type { AppProps } from 'next/app';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { AnimatePresence } from 'framer-motion';

const App: FC<AppProps> = ({ Component, pageProps, router }) => {
  return (
    <ChakraProvider theme={theme}>
      <Flex minHeight="100vh" direction="column">
        <Header />
        <Box as="main" flexGrow={1} position="relative">
          <AnimatePresence exitBeforeEnter>
            <Component key={router.route} {...pageProps} />
          </AnimatePresence>
        </Box>
        <Footer />
      </Flex>
    </ChakraProvider>
  );
};

export default App;
