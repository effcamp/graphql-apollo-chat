const express = require('express');
const graphqlHTTP = require('express-graphql');
const { schema, root } = require('./schemas/schema');

const app = express();
const PORT = 3001;

const channels = [
  {
    id: '1',
    name: 'Channel 1'
  },
  {
    id: '2',
    name: 'Channel 2'
  }
];

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true
  })
);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
