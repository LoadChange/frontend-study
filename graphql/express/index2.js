const express = require('express');
const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt } = require('graphql');
const graphqlHTTP = require('express-graphql');

const account = new GraphQLObjectType({
  name: 'Account',
  fields: {
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    sex: { type: GraphQLString },
    department: { type: GraphQLString },
  },
});

const query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    account:{type: account,
      args: {
        username: { type: GraphQLString },
      },
      resolve(_, { username }) {
        return {
          name: username,
          age: 18,
          sex: '男',
          department: 'xxx',
        };
      },}
  },
});

const schema = new GraphQLSchema({ query });

const app = express();

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.use(express.static('public'));

app.listen(3000);
