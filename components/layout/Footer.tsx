import {
  Box,
  Flex,
  Text,
  useBreakpointValue,
  FlexProps,
  Container,
  HStack,
} from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';
import FacebookIcon from '@/components/icons/FacebookIcon';
import GitHubIcon from '@/components/icons/GitHubIcon';
import EmailIcon from '@/components/icons/EmailIcon';
import InstagramIcon from '@/components/icons/InstagramIcon';
import YouTubeIcon from '@/components/icons/YouTubeIcon';
import LinkedInIcon from '@/components/icons/LinkedInIcon';
import { useRouter } from 'next/router';
import en from '@/locales/en';
import hu from '@/locales/hu';
import BottomWaves from '../common/BottomWaves';

const Footer = () => {
  const { locale } = useRouter();
  const t = locale === 'en' ? en : hu;
  const variant = useBreakpointValue({ base: 'column', md: 'row' });
  const direction = variant as FlexProps['direction'];
  return (
    <>
      <BottomWaves color="#3B3437" />
      <Box as="footer" bg="brand.400">
        <Container maxW="7xl">
          <Flex
            justify="space-between"
            alignItems="center"
            py="2"
            direction={direction}
            bg="brand.400"
          >
            <HStack wrap="wrap" p="1" justify="center">
              <Text color="brand.100" fontSize="sm">
                <Link href="/contact">{t.footer.contactLink}</Link>
              </Text>
            </HStack>

            <Text color="brand.100" fontSize="sm">
              &copy; 2020
            </Text>

            <HStack
              wrap="wrap"
              p="1"
              justify="center"
              spacing={4}
              lineHeight={4}
            >
              <a
                href="https://www.facebook.com/karoly.torok.9/"
                aria-label="Facebook"
              >
                <FacebookIcon color="brand.100" />
              </a>
              <a href="https://github.com/karesztrk" aria-label="Github">
                <GitHubIcon color="brand.100" />
              </a>
              <a
                href="mailto:torok.karoly.krisztian@gmail.com"
                aria-label="Email"
              >
                <EmailIcon color="brand.100" />
              </a>
              <a
                href="https://www.instagram.com/karesztrk/"
                aria-label="Instagram"
              >
                <InstagramIcon color="brand.100" />
              </a>
              <a
                href="https://www.linkedin.com/in/k%C3%A1roly-t%C3%B6r%C3%B6k-17541b80/"
                aria-label="LinkedIn"
              >
                <LinkedInIcon color="brand.100" />
              </a>
              <a
                href="https://www.youtube.com/user/r0nan87"
                aria-label="Youtube"
              >
                <YouTubeIcon color="brand.100" />
              </a>
            </HStack>
          </Flex>
        </Container>
      </Box>
    </>
  );
};

export default Footer;
