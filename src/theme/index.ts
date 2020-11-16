import { extendTheme, Theme, theme } from '@chakra-ui/core';

import colors from './colors';

const overrides = {
  colors,
  fonts: {
    heading: 'Merriweather, sans-serif',
    body: 'Montserrat, sans-serif',
  },
  components: {
    Heading: {
      baseStyle: {
        fontFamily: 'heading',
      },
    },
    Text: {
      baseStyle: {
        fontFamily: 'body',
      },
    },
  },
};

export default extendTheme(overrides);
