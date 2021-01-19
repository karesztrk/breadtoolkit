import NextDocument, {
  Html,
  Main,
  NextScript,
  DocumentContext,
  Head,
} from 'next/document';
import { ColorModeScript } from '@chakra-ui/react';
import theme from '@/theme/extendedTheme';

export default class Document extends NextDocument {
  static async getInitialProps(ctx: DocumentContext) {
    return NextDocument.getInitialProps(ctx);
  }

  render() {
    return (
      <Html>
        <Head>
          <script
            type="text/javascript"
            src="https://ko-fi.com/widgets/widget_2.js"
          ></script>
          <script type="text/javascript">
            kofiwidget2.init('Support Me on Ko-fi', '#29abe0',
            'K3K53CVET');kofiwidget2.draw();console.log('init');
          </script>
        </Head>
        <body>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
