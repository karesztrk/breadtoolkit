import Meta from '@/components/layout/Meta';
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
} from '@chakra-ui/react';
import { useI18n } from 'next-localization';
import React from 'react';

const Contact = () => {
  const { t } = useI18n();
  const { colorMode } = useColorMode();
  return (
    <>
      <Meta subtitle={t('contact.title')} />
      <Container maxW="7xl">
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
              <FormLabel req>{t('contact.email-label')}</FormLabel>
              <Input type="email" name="email" />
              <FormHelperText>{t('contact.email-hint')}</FormHelperText>
            </FormControl>
            <FormControl id="comment" isRequired mb={5}>
              <FormLabel req>{t('contact.comment-label')}</FormLabel>
              <Textarea
                placeholder={t('contact.comment-placeholder')}
                name="comment"
              />
            </FormControl>
            <Button colorScheme="orange" type="submit">
              {t('contact.submit-button')}
            </Button>
          </form>
        </Box>
      </Container>
    </>
  );
};

export default Contact;
