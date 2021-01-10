import React, { FC } from 'react';
import { Grid } from '@chakra-ui/react';
import Card from '@/components/common/Card';
import { frontMatter as pages } from './recipes/*.md?(x)';
import PageContainer from '@/components/layout/PageContainer';

const Recipes: FC = () => {
  const sortedPages = pages.sort((left, right) =>
    left.date > right.date ? -1 : 1,
  );
  return (
    <PageContainer title="Receptek">
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
  );
};

export default Recipes;
