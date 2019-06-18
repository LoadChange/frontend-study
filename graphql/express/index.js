const express = require('express');
const { buildSchema } = require('graphql');
const graphqlHTTP = require('express-graphql');

const schema = buildSchema(`
    type Account {
        name: String
        age: Int
        sex: String
        department: String
    }
    type Query {
        hello: String,
        accountName: String,
        age: Int,
        account: Account
    }
`);

const rootValue = {
  hello: () => 'hello world!',
  accountName: () => 'apollo',
  age: () => 18,
  account: () => ({
    name: 'apollo',
    age: 18,
    sex: '男',
    department: 'school'
  }),
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
