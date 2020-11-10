const { makeAugmentedSchema } = require('neo4j-graphql-js');
const neo4j = require('neo4j-driver');
const { ApolloServer } = require('apollo-server-express');

const fs = require('fs').promises;
const path = require('path');

const makeServer = async () => {
  const schemaFile = path.join(__dirname, './schema.graphql');

  const typeDefs = await fs.readFile(schemaFile, 'utf-8');
  const schema = makeAugmentedSchema({ typeDefs });

  const driver = neo4j.driver(
    'bolt://neo4j:7687',
    neo4j.auth.basic(process.env.DB_USER, process.env.DB_PASSWORD)
  );

  return new ApolloServer({ schema, context: { driver } });
};

module.exports = {
  makeServer,
};
