import { gql } from "@apollo/client";

export interface Pokemon {
  id: string;
  name: string;
  types: string[];
}

export const GET_POKEMONS = gql`
  query pokemons($q: String, $after: ID, $limit: Int)
  {
    pokemons(q: $q, after: $after, limit: $limit) {
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

export const GET_POKEMONS_BY_TYPE = gql`
  query pokemonsByType($q: String, $after: ID, $limit: Int)
  {
    pokemonsByType(q: $q, after: $after, limit: $limit) {
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