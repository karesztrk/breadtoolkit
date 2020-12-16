import { extendTheme } from '@chakra-ui/react';

import colors from '@/theme/colors';
import Stat from '@/theme/components/Stat';
import Heading from '@/theme/components/Heading';
import Text from '@/theme/components/Text';
import Select from '@/theme/components/Select';

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
