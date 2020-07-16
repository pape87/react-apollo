# React Apollo Sample

Simple client server application using apollo server/client to search and display data

## Prerequisites
- Node 10.x

## Client
Simple React application that search and display a list of pokemons.

### How to run

`yarn workspace @react-apollo-sample/client install`

`yarn workspace @react-apollo-sample/client run dev`


## Server
Simple Apollo server application 

### How to run

`yarn workspace @react-apollo-sample/server install`

`yarn workspace @react-apollo-sample/server run start`

Now you can access the playground at `http://localhost:4000/`

### Queries
* pokemons(q: String, after: ID, limit: Int)
* pokemonsByType(q: String, after: ID, limit: Int)

