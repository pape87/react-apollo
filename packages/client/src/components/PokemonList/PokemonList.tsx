import React from "react";
import { useQuery } from "@apollo/client";
import { Button, Typography, Table } from "antd";

import { GET_POKEMONS } from "../../models/pokemon";
import { Container } from "../../styles/container";

const { Text } = Typography;
const { Column } = Table;

const PokemonList: React.FC = () => {

  const { loading, error, data, fetchMore } = useQuery(GET_POKEMONS, {
    variables: { q: "", after: undefined, limit: 10 },
    fetchPolicy: "cache-and-network"
  });

  function onLoadMore() {
    fetchMore({
      variables: {
        q: "", after: data.pokemons.pageInfo.endCursor, limit: 10
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        const result = Object.assign({}, prev, {
          pokemons: {
            edges: [...prev.pokemons.edges, ...fetchMoreResult.pokemons.edges],
            pageInfo: fetchMoreResult.pokemons.pageInfo
          }
        });
        return result;
      }
    })
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>`Error! ${JSON.stringify(error)}`</p>;

  return (
    <Container>
      <Table dataSource={data?.pokemons.edges} rowKey={record => record.node.name} pagination={false}>
        <Column title="Name" render={(value, record: { node: { name: string, types: string[] } }) => record.node.name} />
        <Column title="Types" render={(value, record: { node: { name: string, types: string[] } }) => record.node.types.map((x) => (<Text code key={x}>{x}</Text>))} />

      </Table>
      {!loading ? (
        <div
          style={{
            textAlign: "center",
            marginTop: 12,
            height: 32,
            lineHeight: "32px",
          }}
        >
          <Button onClick={onLoadMore}>Load more</Button>
        </div>
      ) : null}
    </Container>
  );
};

export default PokemonList;