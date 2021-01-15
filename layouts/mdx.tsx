import { FC, useState } from 'react';
import PageContainer from '@/components/layout/PageContainer';
import { PostMeta } from '@/types/post';
import {
  Alert,
  Box,
  Heading,
  Image,
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
  Skeleton,
} from '@chakra-ui/react';
import { MDXProvider } from '@mdx-js/react';
import Page from '@/components/layout/PageCard';

const mdComponents = {
  h1: (props: any) => <Heading as="h1" {...props} />,
  h2: (props: any) => <Heading as="h2" {...props} />,
  h3: (props: any) => <Heading as="h3" {...props} />,
  h4: (props: any) => <Heading as="h4" {...props} />,
  h5: (props: any) => <Heading as="h5" {...props} />,
  h6: (props: any) => <Heading as="h6" {...props} />,
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
  img: (props: any) => <Image {...props} />,
};

interface MDXLayoutProps {
  frontMatter: PostMeta;
}

const MDXLayout: FC<MDXLayoutProps> = ({ frontMatter, children }) => {
  const { title, coverImage } = frontMatter;
  const [imageLoaded, setImageLoaded] = useState(false);
  const onImageLoaded = () => setImageLoaded(true);
  return (
    <MDXProvider components={mdComponents}>
      <PageContainer title={title}>
        <Page as="article" maxWidth="3xl" overflow="hidden" p={0}>
          <Skeleton isLoaded={imageLoaded}>
            <Image
              src={`${coverImage}?nf_resize=fit&w=766`}
              alt={title}
              fit="cover"
              width="100%"
              maxHeight="md"
              height="md"
              onLoad={onImageLoaded}
            />
          </Skeleton>
          <Box p="6">{children}</Box>
          {/* </Box> */}
        </Page>
      </PageContainer>
    </MDXProvider>
  );
};

export default MDXLayout;
