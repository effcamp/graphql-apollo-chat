const express = require('express');
const graphqlHTTP = require('express-graphql');
const { schema, root } = require('./src/schema');

const app = express();
const PORT = 3001;

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
