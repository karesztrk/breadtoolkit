import React from 'react';
import { GetStaticProps } from 'next';
import { Heading, Text, Container, Grid, useColorMode } from '@chakra-ui/core';
import GridItem from '@/components/common/ToolCard';
import CalculatorCard from '@/components/common/CalculatorCard';
import { useI18n } from 'next-localization';
import { PageProp } from '@/types/page';
import Meta from '@/components/layout/Meta';

const Home = () => {
  const i18n = useI18n();
  const { t } = i18n;
  const { colorMode } = useColorMode();

  return (
    <>
      <Meta
        title=""
        description={t('meta.description')}
        keywords={t('meta.keywords')}
      />
      <Container maxW="xl" my="20">
        <Heading
          as="h1"
          fontFamily="hero"
          fontSize={['5rem', '7rem', '9rem']}
          textTransform="uppercase"
          color={colorMode === 'light' ? 'brand.300' : 'brand.100'}
          opacity={0.2}
          lineHeight="5rem"
          whiteSpace="nowrap"
        >
          {t('home.title')}
        </Heading>
        <Heading
          as="h2"
          size="xl"
          fontFamily="hero"
          textTransform="uppercase"
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
    </>
  );
};

// export const getStaticProps: GetStaticProps<PageProp> = async ({ locale }) => {
//   const { default: lngDict = {} } = await import(`../locales/${locale}.json`);
//   console.log(lngDict);
//   return {
//     props: { lngDict },
//   };
// };

export default Home;
