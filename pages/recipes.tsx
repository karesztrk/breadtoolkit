import React, { FC } from 'react';
import Meta from '@/components/layout/Meta';
import PageContainer from '@/components/layout/PageContainer';
import { Grid, Heading, useColorMode } from '@chakra-ui/react';
import Card from '@/components/common/Card';
import { frontMatter as pages } from './recipes/*.mdx';

const Recipes: FC = () => {
  const sortedPages = pages.sort((left, right) =>
    left.date > right.date ? -1 : 1,
  );
  const { colorMode } = useColorMode();
  return (
    <>
      <Meta subtitle="Receptek" />
      <PageContainer>
        <Heading
          as="h1"
          fontFamily="hero"
          fontSize={['3rem', '4rem', '5rem']}
          textTransform="uppercase"
          color={colorMode === 'light' ? 'brand.300' : 'brand.100'}
          opacity={colorMode === 'light' ? 0.3 : 0.8}
          my={10}
          lineHeight={1}
          whiteSpace="nowrap"
        >
          Receptek
        </Heading>
        <Grid
          my={20}
          templateColumns={['1fr', 'repeat(2, 1fr)', 'repeat(3, 1fr)']}
          gap={6}
        >
          {sortedPages.map((page) => (
            <Card
              key={page.slug}
              path={page.slug}
              title={page.title}
              image={page.coverImage}
              height={200}
            />
          ))}
        </Grid>
      </PageContainer>
    </>
  );
};

export default Recipes;
