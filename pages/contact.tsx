import PageContainer from '@/components/layout/PageContainer';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
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
    <PageContainer title={t.contact.title}>
      <Box
        p="6"
        rounded="xl"
        bg={colorMode === 'light' ? 'white' : '#393432'}
        color={colorMode === 'light' ? 'brand.400' : 'brand.100'}
        maxWidth="md"
        margin="0 auto"
        border={colorMode === 'dark' ? '1px' : ''}
        borderColor={colorMode === 'dark' ? 'rgba(255, 255, 255, 0.15)' : ''}
        boxShadow={colorMode === 'dark' ? '' : '0 0 10px rgba(59, 52, 55, 0.4)'}
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
  );
};

export default Contact;
