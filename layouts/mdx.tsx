import { FC, useEffect, useState } from 'react';
import PageContainer from '@/components/layout/PageContainer';
import { PostMeta } from '@/types/post';
import {
  Alert,
  Box,
  Heading,
  Link,
  ListItem,
  OrderedList,
  Text,
  UnorderedList,
  useColorModeValue,
  Td,
  Table,
  Th,
  Divider,
  Image as ChakraImage,
  chakra,
} from '@chakra-ui/react';
import { MDXProvider } from '@mdx-js/react';
import Page from '@/components/layout/PageCard';
import { Recipe } from '@/components/layout/Meta';
import { motion, useAnimation, Variants } from 'framer-motion';

const imageMotion: Variants = {
  blurred: { filter: 'blur(20px)' },
  reveal: {
    filter: 'blur(0px)',
    transition: {
      duration: 0.5,
    },
  },
};

const MotionBox = chakra(motion.div);

const mdComponents = {
  h1: (props: any) => <Heading as="h1" size="xl" {...props} />,
  h2: (props: any) => <Heading as="h2" size="lg" {...props} />,
  h3: (props: any) => <Heading as="h3" size="md" {...props} />,
  h4: (props: any) => <Heading as="h4" size="md" {...props} />,
  h5: (props: any) => <Heading as="h5" size="md" {...props} />,
  h6: (props: any) => <Heading as="h6" size="md" {...props} />,
  hr: (props: any) => <Divider {...props} />,
  p: (props: any) => <Text as="p" mb={4} {...props} />,
  a: (props: any) => <Link as="a" {...props} />,
  ul: (props: any) => <UnorderedList my={2}>{props.children}</UnorderedList>,
  ol: (props: any) => <OrderedList my={2}>{props.children}</OrderedList>,
  li: (props: any) => <ListItem>{props.children}</ListItem>,
  blockquote: (props: any) => (
    <Alert
      mt="4"
      role="none"
      status="warning"
      variant="left-accent"
      as="blockquote"
      rounded="4px"
      my="1.5rem"
      {...props}
    />
  ),
  table: (props: any) => (
    <Table textAlign="left" mt="32px" width="full" {...props} />
  ),
  th: (props: any) => (
    <Th
      bg={useColorModeValue('gray.50', 'whiteAlpha.100')}
      fontWeight="semibold"
      p={2}
      fontSize="sm"
      textAlign={props.align}
      {...props}
    />
  ),
  td: (props: any) => (
    <Td
      p={2}
      borderTopWidth="1px"
      borderColor="inherit"
      fontSize="sm"
      whiteSpace="normal"
      {...props}
    />
  ),
  img: (props: any) => <ChakraImage {...props} />,
};

interface MDXLayoutProps {
  frontMatter: PostMeta;
}

const MDXLayout: FC<MDXLayoutProps> = ({ frontMatter, children }) => {
  const { title, coverImage, date, tags } = frontMatter;
  const animation = useAnimation();
  const imageSource = `${coverImage}?nf_resize=fit&w=40`;
  const [imageSourceSet, setImageSourceSet] = useState<string>();
  const sizes = '(min-width: 50em) 766px, 90vw';
  const srcSet = `${coverImage}?nf_resize=fit&w=320 320w,
    ${coverImage}?nf_resize=fit&w=576 576w,
    ${coverImage}?nf_resize=fit&w=768 768w`;
  const onImageSourceLoad = () => {
    setImageSourceSet(srcSet);
    animation.start('reveal');
  };

  useEffect(() => {
    const image = new Image();
    image.sizes = sizes;
    image.srcset = srcSet;
    image.addEventListener('load', onImageSourceLoad, false);
    return () => {
      image.removeEventListener('load', onImageSourceLoad);
    };
  }, []);
  const keywords = tags ? tags.join(',') : undefined;
  const metaDetails: Recipe = {
    datePublished: date,
    image: [`${coverImage}?nf_resize=fit&w=768`],
    keywords,
    name: title,
    recipeCategory: 'bread',
  };
  return (
    <MDXProvider components={mdComponents}>
      <PageContainer
        title={title}
        sd={{ details: metaDetails }}
        meta={{
          title,
          keywords,
        }}
      >
        <Page as="article" maxWidth="3xl" overflow="hidden" p={0}>
          <MotionBox
            initial="blurred"
            animate={animation}
            variants={imageMotion}
            maxHeight="md"
            height="md"
          >
            <ChakraImage
              alt={title}
              sizes={sizes}
              src={imageSource}
              srcSet={imageSourceSet}
              fit="cover"
              width="100%"
              maxHeight="md"
              height="md"
            />
          </MotionBox>
          <Box p="6">{children}</Box>
        </Page>
      </PageContainer>
    </MDXProvider>
  );
};

export default MDXLayout;
