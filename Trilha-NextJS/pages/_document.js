import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return(
      <Html>
        <Head>
          <title>OverJob</title>
          <link rel="icon" href="/favicon.ico" />
          <meta name="description" content="Um lugar para achar vagas de DEV" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
          <link 
            href={"https://fonts.googleapis.com/css2?family=Nunito:wght@400;700;800&display=swap"} 
            rel="stylesheet"></link>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument;