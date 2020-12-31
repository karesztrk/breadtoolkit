import { Box, Flex, useColorMode } from '@chakra-ui/react';
import Divider from '@/components/common/Divider';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { FC, ReactNode } from 'react';
import Meta from './Meta';
import en from '@/locales/en';
import hu from '@/locales/hu';
import { useRouter } from 'next/router';
import Image from 'next/image';

const Layout: FC<{ children: ReactNode[] | ReactNode }> = ({ children }) => {
  const { locale } = useRouter();
  const t = locale === 'en' ? en : hu;
  const { colorMode } = useColorMode();
  const src = `/images/bg/${colorMode}/4k.webp`;
  return (
    <>
      <Meta description={t.meta.description} keywords={t.meta.keywords} />
      <Flex minHeight="100vh" direction="column">
        <Box height="100%" width="100%" zIndex={-1}>
          <Image
            src={src}
            alt="Background image"
            layout="fill"
            objectFit="cover"
          />
        </Box>

        <Header />
        <Box as="main" flexGrow={1} position="relative">
          {children}
        </Box>
        <Divider color={colorMode === 'light' ? 'white' : '#3B3437'} />
        <Footer />
      </Flex>
    </>
  );
};

export default Layout;
