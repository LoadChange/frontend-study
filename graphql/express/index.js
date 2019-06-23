const express = require('express');
const { buildSchema } = require('graphql');
const graphqlHTTP = require('express-graphql');

/**
 * 基本类型
 * String Int Float Boolean ID
 * [类型] 代表数组
 */
const schema = buildSchema(`
    type Account {
        name: String
        age: Int
        sex: String
        department: String
        salary(city: String): Int
    }
    input AccountInput {
        name: String
        age: Int
        sex: String
        department: String
    }
    type Mutation {
        createAccount(input: AccountInput): Account
        updateAccount(id: ID!, input: AccountInput): Account
    }
    type Query {
        hello: String
        accountName: String
        age: Int
        account(username: String): Account
        accounts: [Account]
        getClassMates(classNo: Int!): [String]
    }
`);

const fakeDB = {};

const rootValue = {
  hello: () => 'hello world!',
  accountName: () => 'apollo',
  age: () => 18,
  accounts: () => Object.keys(fakeDB).map(key => fakeDB[key]),
  account: ({ username }) => ({
    name: username,
    age: 18,
    sex: '男',
    department: 'school',
    salary({ city }) {
      if (['北京', '上海', '广州', '深圳'].includes(city)) {
        return 10000;
      }
      return 5000;
    },
  }),
  getClassMates({ classNo }) {
    const obj = {
      31: ['张三', '李四', '王五'],
      61: ['张二三', '李二四', '王二五'],
    };
    return obj[classNo];
  },
  createAccount({ input }) {
    fakeDB[input.name] = input;
    return input;
  },
  updateAccount({ id, input }) {
    fakeDB[id] = input;
    return input;
  },
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

app.use(express.static('public'));

app.listen(3000);
