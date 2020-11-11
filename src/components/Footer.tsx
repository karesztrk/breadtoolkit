import {
  Flex,
  Text,
  Image,
  Stack,
  useBreakpointValue,
  FlexProps,
} from '@chakra-ui/core';
import React from 'react';
import facebook from '@app/assets/icons/facebook.svg';
import gitHub from '@app/assets/icons/github.svg';
import google from '@app/assets/icons/google.svg';
import instagram from '@app/assets/icons/instagram.svg';
import skype from '@app/assets/icons/skype.svg';
import youtube from '@app/assets/icons/youtube.svg';

const Footer = () => {
  const variant = useBreakpointValue({ base: 'column', md: 'row' });
  const direction = variant as FlexProps['direction'];
  return (
    <Flex
      as="footer"
      justify="space-between"
      alignItems="center"
      p="4"
      direction={direction}
    >
      <Stack direction="row" wrap="wrap" p="1" justify="center">
        <a href="https://www.facebook.com/karoly.torok.9/">
          <Image height="30px" src={facebook} alt="facebook" />
        </a>
        <a href="https://github.com/karesztrk">
          <Image height="30px" src={gitHub} alt="github" />
        </a>
        <a href="torok.karoly.krisztian@gmail.com">
          <Image height="30px" src={google} alt="google" />
        </a>
        <a href="https://www.instagram.com/karesztrk/">
          <Image height="30px" src={instagram} alt="instagram" />
        </a>
        <a href="https://github.com/karesztrk">
          <Image height="30px" src={gitHub} alt="github" />
        </a>
        <a href="skype:torok.karoly.krisztian">
          <Image height="30px" src={skype} alt="skype" />
        </a>
        <a href="https://www.youtube.com/user/r0nan87">
          <Image height="30px" src={youtube} alt="youtube" />
        </a>
      </Stack>

      <Text color="gray.500" fontSize="sm">
        Copyright &copy; 2020 Károly Török
      </Text>
    </Flex>
  );
};

export default Footer;
