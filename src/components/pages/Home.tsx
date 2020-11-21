import { Heading, Text, Container, Grid } from '@chakra-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import GridItem from '@app/components/common/ToolCard';
import CalculatorCard from '../common/CalculatorCard';

const Home = () => {
  const [t] = useTranslation();
  return (
    <Container maxW="xl" my="20">
      <Heading
        as="h1"
        fontFamily="hero"
        fontSize={['5rem', '7rem', '9rem']}
        textTransform="uppercase"
        color="brand.300"
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
        color="brand.300"
        ml={['1rem', '4rem']}
        mb={2}
        textShadow="1px 1px 3px white"
      >
        {t('home.title.suffix')}
      </Heading>
      <Text color="brand.400">{t('home.description')}</Text>

      <Grid
        my={20}
        templateColumns={['1fr', 'repeat(2, 1fr)', 'repeat(3, 1fr)']}
        gap={6}
      >
        <GridItem>
          <CalculatorCard />
        </GridItem>
      </Grid>
    </Container>
  );
};

export default Home;
