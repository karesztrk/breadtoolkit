declare module '*.md?(x)' {
  type PostMeta = {
    title: string;
    slug: string;
    coverImage: string;
    date: string;
    language: string;
    __resourcePath: string;
  };

  export const frontMatter: [PostMeta];

  let MDXComponent: (props: any) => JSX.Element;
  export default MDXComponent;
}
