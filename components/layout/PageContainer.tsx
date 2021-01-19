import { FC } from 'react';
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
import Meta from './Meta';
import { motion } from 'framer-motion';
import BackgroundBreadIcon from '../icons/BackgroundBreadIcon';

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

interface PageContainerProps {
  title: string;
  prefix?: string;
  description?: string;
}

const PageContainer: FC<PageContainerProps> = ({
  title,
  prefix,
  description,
  children,
}) => {
  const { colorMode } = useColorMode();
  const textShadow = useColorModeValue(
    '0px 1px 2px white',
    '0px 1px 2px black',
  );
  const imageOpacity = colorMode === 'light' ? [0.8, 1] : [0.6, 0.8];
  return (
    <>
      <Meta subtitle={title} />
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

          <TopWaves color={useColorModeValue('white', '#1a202c')} />
        </Box>
        <Container maxW="7xl" pt={20} pb={8} minHeight="9.5rem">
          {prefix && (
            <Heading
              as="h2"
              fontSize="clamp(1.5rem, 5vw, 3rem)"
              fontFamily="hero"
              color={useColorModeValue('brand.300', 'brand.100')}
              isTruncated
              textShadow={textShadow}
              title={prefix}
              maxWidth="10em"
              whiteSpace="break-spaces"
              lineHeight={0.95}
              height="2.1em"
            >
              {prefix}
            </Heading>
          )}
          <Heading
            as="h1"
            fontFamily="hero"
            fontSize="clamp(4.5rem, 10vw, 8rem)"
            textTransform="uppercase"
            color={useColorModeValue('brand.200', 'white')}
            opacity={0.9}
            noOfLines={2}
            textShadow={textShadow}
            title={title}
            mb="1.5rem"
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
