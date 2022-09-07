import Document, { NextScript, Main, Html, Head } from "next/document";

export default class AppDocument extends Document {
  render() {
    return (
      <Html dir="rtl" lang="ar">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
