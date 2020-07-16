import React, { useEffect, useState } from "react";
import { useQuery, DocumentNode } from "@apollo/client";
import { Button, Typography, Table } from "antd";

import { Container } from "../../styles/container";

const { Text } = Typography;
const { Column } = Table;

const PokemonList: React.FC<{ q: string, query: DocumentNode }> = (props: { q: string, query: DocumentNode }) => {
  const [queryName, setQueryName] = useState("");

  const { loading, error, data, fetchMore } = useQuery(props.query, {
    variables: { q: props.q, after: undefined, limit: 10 },
    fetchPolicy: "cache-and-network"
  });

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((props.query.definitions[0] as any).name) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setQueryName((props.query.definitions[0] as any).name?.value);
    }
  }, [props.query]);

  function onLoadMore() {
    fetchMore({
      variables: {
        q: props.q, after: data[queryName].pageInfo.endCursor, limit: 10
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        const result = Object.assign({}, prev, {
          [queryName]: {
            edges: [...prev[queryName].edges, ...fetchMoreResult[queryName].edges],
            pageInfo: fetchMoreResult[queryName].pageInfo
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
      <Table dataSource={data[queryName]?.edges} rowKey={record => record.node.name} pagination={false}>
        <Column title="Name" render={(value, record: { node: { name: string, types: string[] } }) => record.node.name} />
        <Column title="Types" render={(value, record: { node: { name: string, types: string[] } }) => record.node.types.map((x) => (<Text code key={x}>{x}</Text>))} />

      </Table>
      {!loading && data[queryName]?.pageInfo.hasNextPage ? (
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