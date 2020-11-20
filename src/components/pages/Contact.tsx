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
} from '@chakra-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';

const Contact = () => {
  const [t] = useTranslation();
  return (
    <Container maxW="xl">
      <Heading
        fontFamily="hero"
        fontSize={['3rem', '4rem', '5rem']}
        textTransform="uppercase"
        color="brand.300"
        opacity={0.3}
        my={10}
        lineHeight={1}
      >
        {t('contact.title')}
      </Heading>
      <Box
        border="1px"
        boxShadow="md"
        borderColor="gray.200"
        p="6"
        rounded="xl"
        bg="white"
        color="brand.400"
        maxWidth="md"
        margin="0 auto"
      >
        <Text fontSize="sm" textAlign="justify" mb={2}>
          Do you have any suggestion? Are you eager to have another kind of
          tool? Give us a comment.
        </Text>
        <form name="contact" method="post">
          <input type="hidden" name="form-name" value="contact" />
          <FormControl id="email" isRequired mb={2}>
            <FormLabel req>Email address</FormLabel>
            <Input type="email" name="email" />
            <FormHelperText>We'll never share your email.</FormHelperText>
          </FormControl>
          <FormControl id="comment" isRequired mb={5}>
            <FormLabel req>Comment</FormLabel>
            <Textarea placeholder="Tell your oppinion" name="comment" />
          </FormControl>
          <Button colorScheme="orange" type="submit">
            Submit
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Contact;
