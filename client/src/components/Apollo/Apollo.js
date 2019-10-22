import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
// import { RestLink } from "apollo-link-rest";
import { onError } from "apollo-link-error";
import { createHttpLink } from "apollo-link-http";
import { ApolloLink, from } from "apollo-link";

// const restLink = new RestLink({
//   uri: "https://websiteuser3.apache.techcollege.dk/api/"
// });

const httpLink = createHttpLink({
  uri: "http://localhost:8000/graphql",
  opts: {
    credentials: "include"
  }
});

const authLink = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      token: localStorage.getItem("token") || null
    }
  });
  return forward(operation);
});

const cache = new InMemoryCache();

// persistCache({
//   cache,
//   storage: window.localStorage,
//   debug: true
// })

export const client = new ApolloClient({
  link: from([
    onError(stuff => {
      const { graphQLErrors, networkError } = stuff;
      if (graphQLErrors) {
        graphQLErrors.map(({ message, locations, path }) =>
          console.log(`
            [GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}
          `)
        );
      }
      if (networkError) console.log(`[Network error]: ${networkError}`);
    }),
    // restLink,
    authLink,
    httpLink
  ]),
  cache
});

