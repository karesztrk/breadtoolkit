import {
  Box,
  Button,
  Container,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Text,
  Textarea,
  useColorMode,
} from '@chakra-ui/core';
import Head from 'next/head';
import React from 'react';
import { useTranslation } from 'react-i18next';

const Contact = () => {
  const [t] = useTranslation();
  const { colorMode } = useColorMode();
  return (
    <>
      <Head>
        <title>Bread Toolkit - Contact</title>
      </Head>
      <Container maxW="xl">
        <Heading
          fontFamily="hero"
          fontSize={['3rem', '4rem', '5rem']}
          textTransform="uppercase"
          color={colorMode === 'light' ? 'brand.300' : 'brand.100'}
          opacity={colorMode === 'light' ? 0.3 : 0.8}
          my={10}
          lineHeight={1}
          whiteSpace="nowrap"
        >
          {t('contact.title')}
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
            {t('contact.description')}
          </Text>
          <form name="contact" method="post">
            <input type="hidden" name="form-name" value="contact" />
            <FormControl id="email" isRequired mb={2}>
              <FormLabel req>{t('contact.email.label')}</FormLabel>
              <Input type="email" name="email" />
              <FormHelperText>{t('contact.email.hint')}</FormHelperText>
            </FormControl>
            <FormControl id="comment" isRequired mb={5}>
              <FormLabel req>{t('contact.comment.label')}</FormLabel>
              <Textarea
                placeholder={t('contact.comment.placeholder')}
                name="comment"
              />
            </FormControl>
            <Button colorScheme="orange" type="submit">
              {t('contact.submit.button')}
            </Button>
          </form>
        </Box>
      </Container>
    </>
  );
};

export default Contact;
