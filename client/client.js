import { ApolloClient, InMemoryCache } from "@apollo/client"

const client = new ApolloClient({
  uri: "https://api-ap-northeast-1.hygraph.com/v2/clvhz4ktp0es707tf8c0eknvs/master",
  cache: new InMemoryCache(),
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_GRAPHQL_API_KEY}`
  }
})

export default client