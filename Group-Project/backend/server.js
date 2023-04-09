const express = require("express");
const app = express();
const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose");
const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");
const URL =
  "mongodb+srv://Trp:Conestoga2021@fullstack.inojy.mongodb.net/database1?authSource=admin&replicaSet=atlas-7v5gbu-shard-0&readPreference=primary&ssl=true";

mongoose.connect(
  URL,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },
  () => console.log("Connected to the database")
);

app.get("/", (req, res) => {
  res.send("HOME");
});

const startServer = async () => {
  const app = express();
  const apolloserver = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await apolloserver.start();
  apolloserver.applyMiddleware({ app: app });
  app.listen(4000, () =>
    console.log("Go on http://localhost:4000 to see output")
  );
};

startServer();
