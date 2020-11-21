import {
  Box,
  Flex,
  Text,
  Image,
  useBreakpointValue,
  FlexProps,
  Container,
  HStack,
  useColorMode,
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
  const { colorMode } = useColorMode();
  const variant = useBreakpointValue({ base: 'column', md: 'row' });
  const direction = variant as FlexProps['direction'];
  return (
    <Box as="footer" bg={colorMode === 'light' ? 'white' : 'brand.400'}>
      <Container maxW="xl">
        <Flex
          justify="space-between"
          alignItems="center"
          py="2"
          direction={direction}
          bg={colorMode === 'light' ? 'white' : 'brand.400'}
        >
          <HStack wrap="wrap" p="1" justify="center">
            <Text
              color={colorMode === 'light' ? 'brand.400' : 'brand.100'}
              fontSize="sm"
            >
              <Link to="/contact">{t('footer.contact.link')}</Link>
            </Text>
          </HStack>

          <Text
            color={colorMode === 'light' ? 'brand.400' : 'brand.100'}
            fontSize="sm"
          >
            &copy; 2020
          </Text>

          <HStack wrap="wrap" p="1" justify="center" spacing={4} lineHeight={4}>
            <a href="https://www.facebook.com/karoly.torok.9/">
              <FacebookIcon
                color={colorMode === 'light' ? 'brand.400' : 'brand.100'}
              />
            </a>
            <a href="https://github.com/karesztrk">
              <GitHubIcon
                color={colorMode === 'light' ? 'brand.400' : 'brand.100'}
              />
            </a>
            <a href="torok.karoly.krisztian@gmail.com">
              <EmailIcon
                color={colorMode === 'light' ? 'brand.400' : 'brand.100'}
              />
            </a>
            <a href="https://www.instagram.com/karesztrk/">
              <InstagramIcon
                color={colorMode === 'light' ? 'brand.400' : 'brand.100'}
              />
            </a>
            <a href="https://www.linkedin.com/in/k%C3%A1roly-t%C3%B6r%C3%B6k-17541b80/">
              <LinkedInIcon
                color={colorMode === 'light' ? 'brand.400' : 'brand.100'}
              />
            </a>
            <a href="https://www.youtube.com/user/r0nan87">
              <YouTubeIcon
                color={colorMode === 'light' ? 'brand.400' : 'brand.100'}
              />
            </a>
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
};

export default Footer;
