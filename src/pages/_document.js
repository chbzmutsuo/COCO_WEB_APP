import Document, { Html, Head, Main, NextScript } from 'next/document';
class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }
  render() {
    return (
      <Html>
        <Head />
        <body className='bg-gray-50 min-h-screen  text-gray-700 overflow-hidden '>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
export default MyDocument;
