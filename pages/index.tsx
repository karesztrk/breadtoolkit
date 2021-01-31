import React from 'react';
import { Container, Grid } from '@chakra-ui/react';
import Card from '@/components/common/Card';
import { useRouter } from 'next/router';
import en from '@/locales/en';
import hu from '@/locales/hu';
import CalculatorIcon from '@/components/icons/CalculatorIcon';
import RecipeIcon from '@/components/icons/RecipeIcon';
import PageContainer from '@/components/layout/PageContainer';

const Home = () => {
  const { locale } = useRouter();
  const t = locale === 'en' ? en : hu;
  return (
    <>
      <PageContainer
        title={t.home.title}
        subtitle={t.home.titlePrefix}
        description={t.home.description}
        meta={{
          title: t.site.title,
          description: t.meta.description,
          keywords: t.meta.keywords,
        }}
      >
        <Container maxW="7xl">
          <Grid
            mb={20}
            templateColumns={[
              '1fr',
              'repeat(2, 40%)',
              'repeat(2, 35%)',
              'repeat(2, 30%)',
            ]}
            gap={6}
            justifyContent="center"
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
      </PageContainer>
    </>
  );
};

export default Home;
