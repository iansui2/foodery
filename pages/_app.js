import { ApolloProvider } from '@apollo/client'
import { ChakraProvider } from '@chakra-ui/react'
import Head from 'next/head'
import client from "../client/client"

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider>
        <Head>
          <title>foodery</title>
          <meta name="title" content="foodery" />
          <meta property="og:title" content="foodery" />
          <meta property="og:image" content="../../logo.png" />
          <link rel="icon" type="image/png" href="../../logo.png" />
        </Head>
        <Component {...pageProps} />
      </ChakraProvider>
    </ApolloProvider>
  )  
}

export default MyApp
