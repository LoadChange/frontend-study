const express = require('express');
const { buildSchema } = require('graphql');
const graphqlHTTP = require('express-graphql');

const schema = buildSchema(`
    type Query {
        hello: String
    }
`);

const rootValue = {
  hello: () => 'hello world!',
};

const app = express();

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    rootValue,
    graphiql: true,
  })
);

app.listen(3000);
