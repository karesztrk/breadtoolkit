import {
  Box,
  Flex,
  Text,
  useBreakpointValue,
  FlexProps,
  Container,
  HStack,
  Divider,
  useColorModeValue,
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
import KofiIcon from '../icons/KofiIcon';

const Footer = () => {
  const { locale } = useRouter();
  const t = locale === 'en' ? en : hu;
  const variant = useBreakpointValue({ base: 'column', md: 'row' });
  const direction = variant as FlexProps['direction'];
  const hoverColor = useColorModeValue('brand.600', 'white');
  const background = useColorModeValue('white', 'gray.800');
  return (
    <>
      <Divider />
      <Box as="footer" position="relative" background={background}>
        <Container maxW="7xl">
          <Flex
            justify="space-between"
            alignItems="center"
            py="2"
            direction={direction}
          >
            <Text
              flex={1}
              color="brand.500"
              _hover={{ color: hoverColor }}
              fontSize="sm"
            >
              <Link href="/contact">{t.footer.contactLink}</Link>
            </Text>

            <Text color="brand.500" fontSize="sm" flex={2} textAlign="center">
              &copy; 2020
            </Text>

            <HStack
              flex={1}
              wrap="wrap"
              p="1"
              justify="flex-end"
              spacing={4}
              lineHeight={4}
            >
              <a href="https://ko-fi.com/K3K53CVET" target="_blank">
                <KofiIcon color="#434B57" hoverColor="#29ABE0" />
              </a>
              <a
                href="https://www.facebook.com/karoly.torok.9/"
                aria-label="Facebook"
              >
                <FacebookIcon color="brand.500" hoverColor={hoverColor} />
              </a>
              <a href="https://github.com/karesztrk" aria-label="Github">
                <GitHubIcon color="brand.500" hoverColor={hoverColor} />
              </a>
              <a
                href="mailto:torok.karoly.krisztian@gmail.com"
                aria-label="Email"
              >
                <EmailIcon color="brand.500" hoverColor={hoverColor} />
              </a>
              <a
                href="https://www.instagram.com/karesztrk/"
                aria-label="Instagram"
              >
                <InstagramIcon color="brand.500" hoverColor={hoverColor} />
              </a>
              <a
                href="https://www.linkedin.com/in/k%C3%A1roly-t%C3%B6r%C3%B6k-17541b80/"
                aria-label="LinkedIn"
              >
                <LinkedInIcon color="brand.500" hoverColor={hoverColor} />
              </a>
              <a
                href="https://www.youtube.com/user/r0nan87"
                aria-label="Youtube"
              >
                <YouTubeIcon color="brand.500" hoverColor={hoverColor} />
              </a>
            </HStack>
          </Flex>
        </Container>
      </Box>
    </>
  );
};

export default Footer;
