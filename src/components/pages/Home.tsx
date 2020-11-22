import { Heading, Text, Container, Grid, useColorMode } from '@chakra-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import GridItem from '@app/components/common/ToolCard';
import CalculatorCard from '../common/CalculatorCard';

const Home = () => {
  const [t] = useTranslation();
  const { colorMode } = useColorMode();
  return (
    <Container maxW="xl" my="20">
      <Heading
        as="h1"
        fontFamily="hero"
        fontSize={['5rem', '7rem', '9rem']}
        textTransform="uppercase"
        color={colorMode === 'light' ? 'brand.300' : 'brand.100'}
        opacity={0.2}
        lineHeight="5rem"
      >
        {t('home.title')}
      </Heading>
      <Heading
        as="h2"
        size="xl"
        fontFamily="hero"
        textTransform="uppercase"
        color={colorMode === 'light' ? 'brand.300' : 'brand.100'}
        ml={['1rem', '4rem']}
        mb={2}
        textShadow={colorMode === 'light' ? '1px 1px 3px white' : ''}
      >
        {t('home.title.suffix')}
      </Heading>
      <Text color={colorMode === 'light' ? 'brand.400' : 'brand.100'}>
        {t('home.description')}
      </Text>

      <Grid
        my={20}
        templateColumns={['1fr', 'repeat(2, 1fr)', 'repeat(3, 1fr)']}
        gap={6}
      >
        <GridItem to="/calculator">
          <CalculatorCard />
        </GridItem>
      </Grid>
    </Container>
  );
};

export default Home;