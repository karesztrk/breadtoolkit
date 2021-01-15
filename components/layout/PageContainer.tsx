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
  subtitle?: string;
  description?: string;
}

const PageContainer: FC<PageContainerProps> = ({
  title,
  subtitle,
  description,
  children,
}) => {
  const { colorMode } = useColorMode();
  const textShadow = useColorModeValue(
    '0px 1px 2px white',
    '0px 1px 2px black',
  );
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
          />

          <TopWaves color={useColorModeValue('white', '#1a202c')} />
        </Box>
        <Container maxW="7xl" pt={20} pb={[12]} minHeight="9.5rem">
          <Heading
            as="h1"
            fontFamily="hero"
            fontSize={['3rem', '5rem', '6rem', '7rem']}
            textTransform="uppercase"
            color={useColorModeValue('brand.300', 'brand.100')}
            opacity={0.9}
            noOfLines={2}
            textShadow={textShadow}
            title={title}
          >
            {title}
          </Heading>
          {subtitle && (
            <Heading
              as="h2"
              fontSize={['1.5rem', '2rem', '3rem']}
              fontFamily="hero"
              color={useColorModeValue('brand.300', 'brand.100')}
              mb={2}
              opacity={0.8}
              isTruncated
              textShadow={textShadow}
              title={subtitle}
            >
              {subtitle}
            </Heading>
          )}
          {description && (
            <Text
              color={useColorModeValue('brand.400', 'brand.100')}
              textShadow={textShadow}
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
      </MotionContainer>
    </>
  );
};

export default PageContainer;
