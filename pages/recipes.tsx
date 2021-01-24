import React, { FC } from 'react';
import { Grid } from '@chakra-ui/react';
import Card from '@/components/common/Card';
import { frontMatter as pages } from './recipes/*.md?(x)';
import PageContainer from '@/components/layout/PageContainer';
import { useRouter } from 'next/router';
import en from '@/locales/en';
import hu from '@/locales/hu';

const Recipes: FC = () => {
  const { locale } = useRouter();
  const t = locale === 'en' ? en : hu;
  const sortedPages = pages.sort((left, right) =>
    left.date > right.date ? -1 : 1,
  );
  const itemList = sortedPages.map((page) => page.slug);
  return (
    <PageContainer title={t.recipes.title} meta={{ itemList }}>
      <Grid
        my={20}
        templateColumns={[
          '1fr',
          'repeat(2, 1fr)',
          'repeat(2, 30%)',
          'repeat(3, 25%)',
        ]}
        gap={6}
        justifyContent="center"
      >
        {sortedPages.map((page) => (
          <Card
            key={page.slug}
            path={page.slug}
            title={page.title}
            image={`${page.coverImage}?nf_resize=fit&w=480`}
            height={200}
          />
        ))}
      </Grid>
    </PageContainer>
  );
};

export default Recipes;
