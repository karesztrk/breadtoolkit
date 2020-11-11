import { Grid, Heading, Box, Text } from '@chakra-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Home = () => {
  const [t] = useTranslation();
  return (
    <>
      <Heading as="h1" size="2xl" mb="10">
        {t('home.header')}
      </Heading>
      <Grid templateColumns="repeat(2, 1fr)" gap={6}>
        <Link to="/calculator">
          <Box
            borderWidth="1px"
            rounded="md"
            p="3"
            boxShadow="sm"
            borderColor="gray.200"
          >
            <Heading as="h3" size="lg" mb="3">
              {t('home.calculator.title')}
            </Heading>
            <Text>{t('home.calculator.description')}</Text>
          </Box>
        </Link>
      </Grid>
    </>
  );
};

export default Home;
