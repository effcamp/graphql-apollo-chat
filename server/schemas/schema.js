const { buildSchema } = require('graphql');
const axios = require('axios');

const schema = buildSchema(`
type User {
  id:String!
  name: String
  username: String
  email: String
  address: Address 
  posts: [Post]
}

type Address {
  street: String
}

type Post {
  userId: User
  id: String!
  title: String
  body: String
}

type Query {
  users: [User]
  user(id: String!): User
  posts: [Post]
  

}
`);

const root = {
  users: async (root, args) => {
    const users = await axios
      .get(`https://jsonplaceholder.typicode.com/users`)
      .then((user) => user.data);
    const posts = await axios
      .get(`https://jsonplaceholder.typicode.com/posts`)
      .then((post) => post.data);

    users.map((user) => {
      user.posts = posts.filter((post) => post.userId === user.id);
      return user;
    });

    return users;
  },
  user: (root, args) =>
    axios
      .get(`https://jsonplaceholder.typicode.com/users/${root.id}`)
      .then((user) => user.data),
  posts: () =>
    axios
      .get(`https://jsonplaceholder.typicode.com/posts`)
      .then((post) => post.data)
};

module.exports = {
  schema,
  root
};
