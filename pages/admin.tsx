import dynamic from 'next/dynamic';
import { MDXProvider } from '@mdx-js/react';
import { mdComponents } from '@/layouts/mdx';

const config = {
  cms_manual_init: true,
  backend: {
    name: 'github',
    repo: 'karesztrk/breadtoolkit',
    branch: 'recipes',
  },
  slug: {
    encoding: 'ascii',
    clean_accents: true,
    sanitize_replacement: '_',
  },
  media_folder: 'public/images/blog',
  public_folder: '/images/blog',
  collections: [
    {
      name: 'recipes',
      label: 'Recipes',
      folder: 'pages/recipes',
      slug: '{{title}}',
      create: true,
      fields: [
        {
          label: 'Title',
          name: 'title',
          widget: 'string',
        },
        {
          label: 'Publish Date',
          name: 'date',
          widget: 'date',
        },
        {
          label: 'Language',
          name: 'language',
          widget: 'select',
          default: 'hu',
          options: [
            {
              label: 'Magyar',
              value: 'hu',
            },
            {
              label: 'English',
              value: 'en',
            },
          ],
        },
        {
          label: 'Cover Image',
          name: 'coverImage',
          widget: 'image',
          required: false,
        },
        {
          label: 'Body',
          name: 'body',
          widget: 'markdown',
        },
        {
          label: 'Tags',
          name: 'tags',
          widget: 'list',
        },
        {
          label: 'Layout',
          name: 'layout',
          widget: 'hidden',
          default: 'mdx',
          options: [
            {
              label: 'Default',
              value: 'mdx',
            },
          ],
        },
      ],
    },
  ],
};

const MDXPreview = ({ entry }) => {
  console.log(entry);
  return (
    <MDXProvider components={mdComponents}>
      {entry.getIn(['data', 'body'])}
    </MDXProvider>
  );
};

const CMS = dynamic(
  () =>
    import('netlify-cms-app').then((cms) => {
      cms.init({ config });
      cms.registerPreviewTemplate('recipes', MDXPreview);
    }),
  { ssr: false, loading: () => <p>Loading Admin...</p> },
);

const Admin: React.FC = () => {
  return <CMS />;
};
Admin.adminLayout = true;
export default Admin;
