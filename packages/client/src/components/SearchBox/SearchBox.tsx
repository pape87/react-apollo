import React, { useState } from "react";

import { Input, Radio } from "antd";
import { Container } from "../../styles/container";

const { Search } = Input;

export type SearchMode = "name" | "type";

export interface SearchData {
  mode: SearchMode;
  value: string;
}

const SearchBox: React.FC<{ onSearch: (data: SearchData) => void }> = (props: { onSearch: (data: SearchData) => void }) => {
  const [mode, setMode] = useState<SearchMode>("name");


  function onSearch(value: string) {
    props.onSearch({
      mode,
      value
    })
  }

  return (
    <Container>
      <Radio.Group onChange={event => setMode(event.target.value)} defaultValue="name" buttonStyle="solid">
        <Radio.Button value="name">Name</Radio.Button>
        <Radio.Button value="type">Type</Radio.Button>
      </Radio.Group>
      <Search
        placeholder="Serach by name"
        enterButton="Search"
        size="large"
        onSearch={value => onSearch(value)}
      ></Search>
    </Container>
  );
}

export default SearchBox;