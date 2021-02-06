import { FC, useEffect, useState } from 'react';
import {
  Box,
  chakra,
  Container,
  Heading,
  Text,
  theme,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import TopWaves from '../common/TopWaves';
import Meta, { MetaDetails } from './Meta';
import { motion } from 'framer-motion';
import BackgroundBreadIcon from '../icons/BackgroundBreadIcon';
import Bowser from 'bowser';
import Image from 'next/image';

const MotionContainer = chakra(motion.div, theme.components.Container);

const pageMotions = {
  exit: {
    opacity: 0,
    transition: {
      when: 'beforeChildren',
    },
  },
  rest: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
};

interface StructuredData {
  itemList?: string[];
  details?: MetaDetails;
}

interface Meta {
  title?: string;
  description?: string;
  keywords?: string;
}

interface PageContainerProps {
  title: string;
  subtitle?: string;
  description?: string;
  meta?: Meta;
  sd?: StructuredData;
}

const PageContainer: FC<PageContainerProps> = ({
  title,
  subtitle,
  description,
  meta,
  sd,
  children,
}) => {
  const { colorMode } = useColorMode();
  const textShadow = useColorModeValue(
    '0px 1px 2px white',
    '0px 1px 2px black',
  );
  const [modernBrowser, setModernBrowser] = useState(false);
  const imageOpacity = colorMode === 'light' ? [0.8, 1] : [0.6, 0.8];
  const subheaderFontSize = modernBrowser
    ? 'clamp(1.5rem, 5vw, 3rem)'
    : ['1.5rem', '2rem', '3rem'];
  const mainheaderFontSize = modernBrowser
    ? 'clamp(4.5rem, 10vw, 8rem)'
    : ['4.5rem', '5rem', '6rem', '8rem'];
  useEffect(() => {
    if (window !== undefined) {
      const browser = Bowser.getParser(window.navigator.userAgent);
      setModernBrowser(
        !!browser.satisfies({
          chrome: '>=79',
          firefox: '>=75',
          opera: '>=66',
          macos: {
            safari: '>=13',
          },
        }),
      );
    }
  }, []);
  return (
    <>
      <Meta
        title={meta?.title || title}
        keywords={meta?.keywords}
        description={meta?.description}
        itemList={sd?.itemList}
        details={sd?.details}
      />
      <Box position="relative">
        <Box
          position="absolute"
          height="50vh"
          overflow="hidden"
          zIndex={-1}
          top="0"
          left="0"
          right="0"
          bottom="0"
          opacity={imageOpacity}
          background={
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath fill-rule='evenodd' d='M0 0h40v40H0V0zm40 40h40v40H40V40zm0-40h2l-2 2V0zm0 4l4-4h2l-6 6V4zm0 4l8-8h2L40 10V8zm0 4L52 0h2L40 14v-2zm0 4L56 0h2L40 18v-2zm0 4L60 0h2L40 22v-2zm0 4L64 0h2L40 26v-2zm0 4L68 0h2L40 30v-2zm0 4L72 0h2L40 34v-2zm0 4L76 0h2L40 38v-2zm0 4L80 0v2L42 40h-2zm4 0L80 4v2L46 40h-2zm4 0L80 8v2L50 40h-2zm4 0l28-28v2L54 40h-2zm4 0l24-24v2L58 40h-2zm4 0l20-20v2L62 40h-2zm4 0l16-16v2L66 40h-2zm4 0l12-12v2L70 40h-2zm4 0l8-8v2l-6 6h-2zm4 0l4-4v2l-2 2h-2z'/%3E%3C/g%3E%3C/svg%3E\");"
          }
        >
          <Image
            alt="Bread Toolkit"
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            priority
            src={`/images/bg/${colorMode}/fhd.jpg`}
            loader={({ src, width }) => `${src}?nf_resize=fit&w=${width}`}
          />

          <TopWaves color={useColorModeValue('bg.light', 'bg.dark')} />
        </Box>
        <Container maxW="7xl" pt={[4, 20]} pb={8} minHeight="9.5rem">
          {subtitle && (
            <Heading
              as="h2"
              fontSize={subheaderFontSize}
              fontFamily="hero"
              color={useColorModeValue('brand.300', 'brand.100')}
              isTruncated
              textShadow={textShadow}
              title={subtitle}
              maxWidth="10em"
              whiteSpace="break-spaces"
              lineHeight={0.95}
              height="2.1em"
              mt={4}
            >
              {subtitle}
            </Heading>
          )}
          <Heading
            as="h1"
            fontFamily="hero"
            fontSize={mainheaderFontSize}
            textTransform="uppercase"
            color={useColorModeValue('brand.200', 'white')}
            opacity={0.9}
            textShadow={textShadow}
            title={title}
            mb="1.5rem"
            noOfLines={2}
            lineHeight={1.3}
          >
            {title}
          </Heading>

          {description && (
            <Text
              color={useColorModeValue('brand.400', 'brand.100')}
              fontSize={['sm', 'md', 'lg']}
              textShadow={textShadow}
              maxWidth={['100%', '60%']}
              lineHeight={1.8}
              textAlign="justify"
            >
              {description}
            </Text>
          )}
        </Container>
      </Box>

      <MotionContainer
        exit="exit"
        initial="rest"
        animate="animate"
        variants={pageMotions}
        maxW="7xl"
        mb={20}
      >
        {children}

        <BackgroundBreadIcon
          position="absolute"
          bottom={0}
          right="-10%"
          zIndex={-1}
          width="auto"
          height="35%"
          opacity={0.9}
        />
      </MotionContainer>
    </>
  );
};

export default PageContainer;
