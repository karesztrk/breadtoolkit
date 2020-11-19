import {
  Box,
  Flex,
  Text,
  Image,
  useBreakpointValue,
  FlexProps,
  Container,
  HStack,
} from '@chakra-ui/core';
import { Link } from 'react-router-dom';
import React from 'react';
import FacebookIcon from '@app/components/icons/FacebookIcon';
import GitHubIcon from '@app/components/icons/GitHubIcon';
import EmailIcon from '@app/components/icons/EmailIcon';
import InstagramIcon from '@app/components/icons/InstagramIcon';
import YouTubeIcon from '@app/components/icons/YouTubeIcon';
import LinkedInIcon from '@app/components/icons/LinkedInIcon';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const [t] = useTranslation();
  const variant = useBreakpointValue({ base: 'column', md: 'row' });
  const direction = variant as FlexProps['direction'];
  return (
    <Box as="footer" bg="white">
      <Container maxW="xl">
        <Flex
          justify="space-between"
          alignItems="center"
          py="2"
          direction={direction}
          bg="white"
        >
          <HStack wrap="wrap" p="1" justify="center">
            <Text color="brand.400" fontSize="sm">
              <Link to="/contact">{t('footer.contact.link')}</Link>
            </Text>
          </HStack>

          <Text color="brand.400" fontSize="sm">
            &copy; 2020
          </Text>

          <HStack wrap="wrap" p="1" justify="center" spacing={4} lineHeight={4}>
            <a href="https://www.facebook.com/karoly.torok.9/">
              <FacebookIcon color="brand.400" />
            </a>
            <a href="https://github.com/karesztrk">
              <GitHubIcon color="brand.400" />
            </a>
            <a href="torok.karoly.krisztian@gmail.com">
              <EmailIcon color="brand.400" />
            </a>
            <a href="https://www.instagram.com/karesztrk/">
              <InstagramIcon color="brand.400" />
            </a>
            <a href="https://www.linkedin.com/in/k%C3%A1roly-t%C3%B6r%C3%B6k-17541b80/">
              <LinkedInIcon color="brand.400" />
            </a>
            <a href="https://www.youtube.com/user/r0nan87">
              <YouTubeIcon color="brand.400" />
            </a>
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
};

export default Footer;
