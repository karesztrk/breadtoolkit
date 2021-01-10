import { FC } from 'react';
import {
  Box,
  Container,
  Fade,
  Heading,
  Image,
  Text,
  useColorMode,
} from '@chakra-ui/react';
import TopWaves from '../common/TopWaves';
import Meta from './Meta';

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
  return (
    <>
      <Meta subtitle={title} />
      <Box
        position="absolute"
        maxHeight="50vh"
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
        <Container
          maxW="7xl"
          my={[8, 20]}
          minHeight="9.5rem"
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
        >
          <Heading
            as="h1"
            fontFamily="hero"
            fontSize={['4rem', '5rem', '6rem', '7rem']}
            textTransform="uppercase"
            color={colorMode === 'light' ? 'brand.300' : 'brand.100'}
            opacity={0.9}
            isTruncated
            textShadow={
              colorMode === 'light' ? '1px 1px 2px white' : '1px 1px 2px black'
            }
          >
            {title}
          </Heading>
          {subtitle && (
            <Heading
              as="h2"
              fontSize={['2rem', '2rem', '3rem']}
              fontFamily="hero"
              color={colorMode === 'light' ? 'brand.300' : 'brand.100'}
              mb={2}
              opacity={0.8}
              isTruncated
              textShadow={
                colorMode === 'light'
                  ? '1px 1px 2px white'
                  : '1px 1px 2px black'
              }
            >
              {subtitle}
            </Heading>
          )}
          {description && (
            <Text
              color={colorMode === 'light' ? 'brand.400' : 'brand.100'}
              textShadow={
                colorMode === 'light'
                  ? '1px 1px 3px white'
                  : '1px 0px 3px black'
              }
            >
              {description}
            </Text>
          )}
        </Container>
        <TopWaves color={colorMode === 'light' ? 'white' : '#1a202c'} />
      </Box>
      <Fade in>
        <Container maxW="7xl" mt={[64, 72, 80, 96]} mb={20}>
          {children}
        </Container>
      </Fade>
    </>
  );
};

export default PageContainer;
