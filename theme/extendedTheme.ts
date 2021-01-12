import { extendTheme, ThemeOverride } from '@chakra-ui/react';
import colors from '@/theme/colors';
import Stat from '@/theme/components/Stat';
import Heading from '@/theme/components/Heading';
import Text from '@/theme/components/Text';
import Select from '@/theme/components/Select';

const overrides: ThemeOverride = {
  config: {
    useSystemColorMode: true,
  },
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
  // styles: {
  //   global: (props) => ({
  //     body: {
  //       bg: mode('orange.700', 'blue.900')(props),
  //     },
  //   }),
  // },
};

export default extendTheme(overrides);
