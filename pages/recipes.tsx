import React, { FC, useState } from 'react';
import { Center, Grid } from '@chakra-ui/react';
import Card from '@/components/common/Card';
import { frontMatter as pages } from './recipes/*.md?(x)';
import PageContainer from '@/components/layout/PageContainer';
import { useRouter } from 'next/router';
import en from '@/locales/en';
import hu from '@/locales/hu';
import SearchInput from '@/components/common/SearchInput';

const Recipes: FC = () => {
  const { locale } = useRouter();
  const [searchterm, setSearchTerm] = useState<string>();
  const t = locale === 'en' ? en : hu;
  const sortedPages = pages.sort((left, right) =>
    left.date > right.date ? -1 : 1,
  );
  const metaList = sortedPages.map((page) => page.slug);
  const itemList = sortedPages.filter(
    (page) => !searchterm || page.title.toLowerCase().includes(searchterm),
  );
  return (
    <PageContainer title={t.recipes.title} meta={{ itemList: metaList }}>
      <Center>
        <SearchInput
          placeholder={t.recipes.searchPlaceHolder}
          onChange={setSearchTerm}
        />
      </Center>
      <Grid
        id="recipes"
        my={[4, 12, 20]}
        templateColumns={[
          '1fr',
          'repeat(2, 1fr)',
          'repeat(2, 30%)',
          'repeat(3, 25%)',
        ]}
        gap={6}
        justifyContent="center"
      >
        {itemList.map((page) => (
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
