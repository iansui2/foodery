import { ApolloClient, InMemoryCache } from "@apollo/client"

const client = new ApolloClient({
  uri: "https://graphql-compose.herokuapp.com/northwind",
  cache: new InMemoryCache()
})

export default client