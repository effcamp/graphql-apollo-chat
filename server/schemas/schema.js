const { buildSchema } = require('graphql');
const axios = require('axios');

const schema = buildSchema(`
type User {
  id:String!
  name: String
  username: String
  email: String
  address: Address 
}

type Address {
  street: String
}

type Query {
  users: [User]

}
`);

const root = {
  users: (root, args) =>
    axios
      .get(`https://jsonplaceholder.typicode.com/users`)
      .then((user) => user.data)
};

module.exports = {
  schema,
  root
};
