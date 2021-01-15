import PageContainer from '@/components/layout/PageContainer';
import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Text,
  Textarea,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';
import en from '@/locales/en';
import hu from '@/locales/hu';
import PageCard from '@/components/layout/PageCard';

const Contact = () => {
  const { locale } = useRouter();
  const t = locale === 'en' ? en : hu;
  return (
    <PageContainer title={t.contact.title}>
      <PageCard>
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
      </PageCard>
    </PageContainer>
  );
};

export default Contact;
