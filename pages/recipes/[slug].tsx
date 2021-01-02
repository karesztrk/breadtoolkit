import { getAllPosts, getPostBySlug } from '@/lib/api';
import markdownToHtml from '@/lib/markdownToHtml';
import { Post } from '@/types/post';
import { FC } from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import { ParsedUrlQuery } from 'querystring';
import Meta from '@/components/layout/Meta';

interface RecipeProps {
  post: Post;
  //   morePosts: PostType[];
  //   preview?: boolean;
}

const Recipe: FC<RecipeProps> = ({ post }) => {
  return (
    <article>
      <Meta title={post.title} />
      <p>{post.title}</p>
      {/* {post.coverImage}
      {post.date}
      {post.author}
      {post.content} */}
    </article>
  );
};

export default Recipe;

interface Params extends ParsedUrlQuery {
  slug: string;
}

export const getStaticProps: GetStaticProps<RecipeProps, Params> = async (
  context,
) => {
  const slug = context.params?.slug || '';
  const post = getPostBySlug(slug, [
    'title',
    'date',
    'slug',
    'author',
    'content',
    'ogImage',
    'coverImage',
  ]) as any;

  const content = await markdownToHtml(post.content || '');

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  };
};

export const getStaticPaths: GetStaticPaths = async (context) => {
  const locales = context?.locales || ['en'];
  const posts = getAllPosts(['slug', 'language']);
  let paths = posts.map((post) => ({
    params: {
      slug: post.slug,
    },
    locale: 'en',
  }));

  // TODO temp solution: we display the same content for all locales
  const [, ...rest] = locales;
  rest.forEach((locale) => {
    paths = paths.concat(paths.map((path) => ({ ...path, locale })));
  });
  return {
    paths,
    fallback: false,
  };
};
