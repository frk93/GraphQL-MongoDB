const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");

const typeDefs = require("./graphql/typeDef");
const { MONGO_DB } = require("./config");
const resolvers = require("./graphql/resolvers");

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

mongoose
  .connect(MONGO_DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Database is connected");
    return server.listen({ port: 3000 });
  })
  .then((res) => {
    console.log(`Server is listening on ${res.url}`);
  });
