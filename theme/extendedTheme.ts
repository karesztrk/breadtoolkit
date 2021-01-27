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
    hero:
      /* Times New Roman-based stack */
      "Merriweather, Cambria, 'Hoefler Text', Utopia, 'Liberation Serif', 'Nimbus Roman No9 L Regular', Times, 'Times New Roman', serif",
    heading:
      /* Helvetica/Arial-based sans serif stack */
      "Lato, Frutiger, 'Frutiger Linotype', Univers, Calibri, 'Gill Sans', 'Gill Sans MT', 'Myriad Pro', Myriad, 'DejaVu Sans Condensed', 'Liberation Sans', 'Nimbus Sans L', Tahoma, Geneva, 'Helvetica Neue', Helvetica, Arial, sans-serif;",
    body:
      /* Trebuchet-based sans serif stack */
      "Montserrat, 'Segoe UI', Candara, 'Bitstream Vera Sans', 'DejaVu Sans', 'Bitstream Vera Sans', 'Trebuchet MS', Verdana, 'Verdana Ref', sans-serif",
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
