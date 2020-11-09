import { Grid, Heading, Box, Text } from '@chakra-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
      <Heading as="h1" size="2xl" mb="10">
        Baking delicious 🍞 using BreadTookit
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
              Calculator
            </Heading>
            <Text>
              Calculate your dough hydratation and the amount of ingredients
            </Text>
          </Box>
        </Link>
      </Grid>
    </>
  );
};

export default Home;
