import React from 'react';
import {
  Heading,
  Text,
  Container,
  Grid,
  useColorMode,
  Box,
} from '@chakra-ui/react';
import Card from '@/components/common/Card';
import { useRouter } from 'next/router';
import en from '@/locales/en';
import hu from '@/locales/hu';
import CalculatorIcon from '@/components/icons/CalculatorIcon';
import RecipeIcon from '@/components/icons/RecipeIcon';

const Home = () => {
  const { locale } = useRouter();
  const t = locale === 'en' ? en : hu;
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
          {t.home.title}
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
          {t.home.titleSuffix}
        </Heading>
        <Text
          color={colorMode === 'light' ? 'brand.400' : 'brand.100'}
          textShadow={
            colorMode === 'light' ? '1px 1px 3px white' : '1px 0px 3px black'
          }
        >
          {t.home.description}
        </Text>
      </Box>
      <Grid
        my={20}
        templateColumns={['1fr', 'repeat(2, 1fr)', 'repeat(3, 1fr)']}
        gap={6}
      >
        <Card
          path="/calculator"
          title={t.home.calculatorTitle}
          description={t.home.calculatorDescription}
          icon={<CalculatorIcon height="5rem" width="100%" />}
        />
        <Card
          path="/recipes"
          title={t.home.recipesTitle}
          description={t.home.recipesDescription}
          icon={<RecipeIcon height="5rem" width="100%" />}
        />
      </Grid>
    </Container>
  );
};

export default Home;
