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
  useColorMode,
  useColorModeValue,
  Td,
  Table,
  Th,
  Divider,
} from '@chakra-ui/react';
import { MDXProvider } from '@mdx-js/react';
import * as React from 'react';

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

const MDXLayout: React.FC<MDXLayoutProps> = ({ frontMatter, children }) => {
  const { colorMode } = useColorMode();
  return (
    <MDXProvider components={mdComponents}>
      <PageContainer title={frontMatter.title}>
        <Box
          as={'article'}
          rounded="xl"
          bg={colorMode === 'light' ? 'white' : '#393432'}
          color={colorMode === 'light' ? 'brand.400' : 'brand.100'}
          maxWidth="2xl"
          margin="0 auto"
          overflow="hidden"
          border={colorMode === 'dark' ? '1px' : ''}
          borderColor={colorMode === 'dark' ? 'rgba(255, 255, 255, 0.15)' : ''}
          boxShadow={
            colorMode === 'dark' ? '' : '0 0 10px rgba(59, 52, 55, 0.4)'
          }
        >
          <Image src={frontMatter.coverImage} alt={frontMatter.title} />
          <Box p="6">{children}</Box>
        </Box>
      </PageContainer>
    </MDXProvider>
  );
};

export default MDXLayout;
