import React from 'react';
import GraphiQL from 'graphiql';
import fetch from 'isomorphic-fetch';
import '../node_modules/graphiql/graphiql.css';

function App({ token }) {
  const graphQLFetcher = async (graphQLParams) => {
    const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/graphql`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(graphQLParams),
    });

    const data = await res.json();

    return data;
  };

  return (
    <div style={{ height: 750 }}>
      <GraphiQL fetcher={graphQLFetcher} />
    </div>
  );
}

export default App;
