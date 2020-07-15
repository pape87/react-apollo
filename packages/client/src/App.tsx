import React from "react";
import SearchBox, { SearchData } from "./components/SearchBox/SearchBox";
import { Layout } from "antd";


import "./App.css";

const App: React.FC = () => {

  function onSearch(data: SearchData) {

    console.log("search", data);
  }
  return (
    <Layout>
      <SearchBox onSearch={onSearch}></SearchBox>
    </Layout>);
};

export default App;