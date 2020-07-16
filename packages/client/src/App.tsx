import React from "react";
import { Layout } from "antd";

import SearchBox, { SearchData } from "./components/SearchBox/SearchBox";
import PokemonList from "./components/PokemonList/PokemonList";
import "./App.css";

const App: React.FC = () => {


  function onSearch(data: SearchData) {

    console.log("search", data);
  }
  return (
    <Layout>
      <SearchBox onSearch={onSearch}></SearchBox>
      <PokemonList></PokemonList>
    </Layout>);
};

export default App;