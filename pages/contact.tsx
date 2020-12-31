import Meta from '@/components/layout/Meta';
import PageContainer from '@/components/layout/PageContainer';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Text,
  Textarea,
  useColorMode,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';
import en from '@/locales/en';
import hu from '@/locales/hu';

const Contact = () => {
  const { locale } = useRouter();
  const t = locale === 'en' ? en : hu;
  const { colorMode } = useColorMode();
  return (
    <>
      <Meta subtitle={t.contact.title} />
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
          {t.contact.title}
        </Heading>
        <Box
          boxShadow="md"
          p="6"
          rounded="xl"
          bg={colorMode === 'light' ? 'white' : '#393432'}
          color={colorMode === 'light' ? 'brand.400' : 'brand.100'}
          maxWidth="md"
          margin="0 auto"
        >
          <Text fontSize="sm" textAlign="justify" mb={2}>
            {t.contact.description}
          </Text>
          <form name="contact" method="post">
            <input type="hidden" name="form-name" value="contact" />
            <FormControl id="email" isRequired mb={2}>
              <FormLabel req>{t.contact.emailLabel}</FormLabel>
              <Input type="email" name="email" />
              <FormHelperText>{t.contact.emailHint}</FormHelperText>
            </FormControl>
            <FormControl id="comment" isRequired mb={5}>
              <FormLabel req>{t.contact.commentLabel}</FormLabel>
              <Textarea
                placeholder={t.contact.commentPlaceholder}
                name="comment"
              />
            </FormControl>
            <Button colorScheme="orange" type="submit">
              {t.contact.submitButton}
            </Button>
          </form>
        </Box>
      </PageContainer>
    </>
  );
};

export default Contact;
