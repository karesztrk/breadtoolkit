import { Heading, Text, Container } from '@chakra-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';

const Home = () => {
  const [t] = useTranslation();
  return (
    <Container maxW="xl" my="20">
      <Heading
        as="h1"
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
        textTransform="uppercase"
        color="brand.300"
        ml={['1rem', '4rem']}
      >
        {t('home.title.suffix')}
      </Heading>
      <Text color="brand.400">{t('home.description')}</Text>

      {/* <Grid templateColumns="repeat(2, 1fr)" gap={6}>
        <Link to="/calculator">
          <Box
            borderWidth="1px"
            rounded="md"
            p="3"
            boxShadow="sm"
            borderColor="gray.200"
            transition="all 0.15s ease"
            _hover={{
              transform: 'scale(1.1)',
              boxShadow: 'md',
            }}
          >
            <Heading as="h3" size="lg" mb="3">
              {t('home.calculator.title')}
            </Heading>
            <Text>{t('home.calculator.description')}</Text>
          </Box>
        </Link>
      </Grid> */}
    </Container>
  );
};

export default Home;
