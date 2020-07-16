import React from "react";
import ReactDOM from "react-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import App from "./App";

const cache = new InMemoryCache(
  // {
  //   typePolicies: {
  //     PokemonsConnection: {
  //       fields: {
  //         edges: {
  //           // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //           merge(existing: any[], incoming: any[]) {
  //             console.log("fooooooooooooo", existing, incoming)
  //             return [...(existing || []), ...incoming];
  //           },
  //         }
  //       }
  //     }
  //   }


  // }
);

const client = new ApolloClient({
  uri: "http://localhost:4000/",
  cache: cache,
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root"));