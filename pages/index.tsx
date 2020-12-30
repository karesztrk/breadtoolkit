import React from 'react';
import {
  Heading,
  Text,
  Container,
  Grid,
  useColorMode,
  Box,
} from '@chakra-ui/react';
import GridItem from '@/components/common/GridItem';
import CalculatorCard from '@/components/common/CalculatorCard';
import { useI18n } from 'next-localization';

const Home = () => {
  const i18n = useI18n();
  const { t } = i18n;
  const { colorMode } = useColorMode();

  return (
    <Container maxW="7xl" my="20">
      <Box minHeight="9.5rem">
        <Heading
          as="h1"
          fontFamily="hero"
          fontSize={['5rem', '7rem', '9rem']}
          textTransform="uppercase"
          color={colorMode === 'light' ? 'brand.300' : 'brand.100'}
          opacity={0.2}
          lineHeight="5rem"
          whiteSpace="nowrap"
          textShadow={
            colorMode === 'light' ? '1px 1px 2px white' : '1px 1px 2px black'
          }
        >
          {t('home.title')}
        </Heading>
        <Heading
          as="h2"
          size="xl"
          fontFamily="hero"
          color={colorMode === 'light' ? 'brand.300' : 'brand.100'}
          ml={['0', '4rem']}
          mb={2}
          textShadow={
            colorMode === 'light' ? '1px 1px 2px white' : '1px 1px 2px black'
          }
        >
          {t('home.title-suffix')}
        </Heading>
        <Text
          color={colorMode === 'light' ? 'brand.400' : 'brand.100'}
          textShadow={
            colorMode === 'light' ? '1px 1px 3px white' : '1px 0px 3px black'
          }
        >
          {t('home.description')}
        </Text>
      </Box>
      <Grid
        my={20}
        templateColumns={['1fr', 'repeat(2, 1fr)', 'repeat(3, 1fr)']}
        gap={6}
      >
        <CalculatorCard />
      </Grid>
    </Container>
  );
};

export default Home;
