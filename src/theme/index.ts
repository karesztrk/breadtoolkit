import { extendTheme, Theme, theme } from '@chakra-ui/core';
import { mode } from '@chakra-ui/theme-tools';

import colors from './colors';
import Stat from './components/Stat';
import Heading from './components/Heading';
import Text from './components/Text';

const overrides = {
  colors,
  fonts: {
    hero: 'Merriweather, sans-serif',
    heading: 'Lato, sans-serif',
    body: 'Montserrat, sans-serif',
  },
  components: {
    Heading,
    Text,
    Stat,
  },
};

export default extendTheme(overrides);
