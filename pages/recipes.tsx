import { getAllPosts } from '@/lib/api';
import React, { FC } from 'react';
import { Post } from '@/types/post';
import { GetStaticProps } from 'next';
import Meta from '@/components/layout/Meta';
import PageContainer from '@/components/layout/PageContainer';
import { Box, Grid, Heading, useColorMode } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import en from '@/locales/en';
import hu from '@/locales/hu';
import Card from '@/components/common/Card';

interface RecipesProps {
  posts: Post[];
}

const Recipes: FC<RecipesProps> = ({ posts }) => {
  const { locale } = useRouter();
  const t = locale === 'en' ? en : hu;
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
          {posts &&
            posts.map((post) => (
              <Card
                key={post.slug}
                path={`/recipes/${post.slug}`}
                title={post.title}
                description={post.excerpt}
              />
            ))}
        </Grid>
      </PageContainer>
    </>
  );
};

export default Recipes;

export const getStaticProps: GetStaticProps<RecipesProps, {}> = async (
  context,
) => {
  const posts = getAllPosts([
    'title',
    'date',
    'slug',
    'author',
    'coverImage',
    'excerpt',
  ]) as any;

  return {
    props: {
      locale: context.locale || 'en',
      posts,
    },
  };
};
