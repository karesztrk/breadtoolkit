import { FC, useEffect, useState } from 'react';
import {
  Box,
  chakra,
  Container,
  Heading,
  Image,
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

interface Meta {
  itemList?: string[];
  details?: MetaDetails;
}

interface PageContainerProps {
  title: string;
  prefix?: string;
  description?: string;
  meta?: Meta;
}

const PageContainer: FC<PageContainerProps> = ({
  title,
  prefix,
  description,
  children,
  meta,
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
        subtitle={title}
        itemList={meta?.itemList}
        details={meta?.details}
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
        >
          <Image
            height="50vh"
            width="100%"
            srcSet={`/images/bg/${colorMode}/hd.webp 300w,
                /images/bg/${colorMode}/fhd.webp 600w,
                /images/bg/${colorMode}/4k.webp 1200w`}
            fit="cover"
            opacity={imageOpacity}
          />

          <TopWaves color={useColorModeValue('bg.light', 'bg.dark')} />
        </Box>
        <Container maxW="7xl" pt={[4, 20]} pb={8} minHeight="9.5rem">
          {prefix && (
            <Heading
              as="h2"
              fontSize={subheaderFontSize}
              fontFamily="hero"
              color={useColorModeValue('brand.300', 'brand.100')}
              isTruncated
              textShadow={textShadow}
              title={prefix}
              maxWidth="10em"
              whiteSpace="break-spaces"
              lineHeight={0.95}
              height="2.1em"
              mt={4}
            >
              {prefix}
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
