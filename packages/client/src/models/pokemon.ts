import { gql } from "@apollo/client";

export interface Pokemon {
  id: string;
  name: string;
  types: string[];
}

export const GET_POKEMONS = gql`
  query pokemons($name: String, $after: ID, $limit: Int)
  {
    pokemons(name: $name, after: $after, limit: $limit) {
      edges {
        node {    
          id,
          name,    
          types
        }
      },
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;