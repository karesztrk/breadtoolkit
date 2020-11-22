import { extendTheme } from '@chakra-ui/core';

import colors from '@app/theme/colors';
import Stat from '@app/theme/components/Stat';
import Heading from '@app/theme/components/Heading';
import Text from '@app/theme/components/Text';
import Select from '@app/theme/components/Select';

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
    Select,
  },
};

export default extendTheme(overrides);
