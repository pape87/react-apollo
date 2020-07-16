import React, { useState } from "react";
import { Layout } from "antd";

import SearchBox, { SearchData } from "./components/SearchBox/SearchBox";
import PokemonList from "./components/PokemonList/PokemonList";
import "./App.css";
import { DocumentNode } from "graphql";
import { GET_POKEMONS, GET_POKEMONS_BY_TYPE } from "./models/pokemon";

const App: React.FC = () => {
  const [search, setSearch] = useState({ q: "", query: GET_POKEMONS } as { q: string, query: DocumentNode });

  function onSearch(data: SearchData) {
    setSearch({
      q: data.value,
      query: data.mode === "type" ? GET_POKEMONS_BY_TYPE : GET_POKEMONS
    })
    console.log("search", data);
  }

  return (
    <Layout>
      <SearchBox onSearch={onSearch}></SearchBox>
      <PokemonList query={search.query} q={search.q}></PokemonList>
    </Layout>);
};

export default App;