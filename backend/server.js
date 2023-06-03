const express = require("express");
const ExpressGraphQL = require("express-graphql").graphqlHTTP;
const cors = require("cors");

// const schema = require("./graphql/post/post.js");
const schema = require("./graphql/post/record.js");
const app = express();

app.use(cors()); // enable `cors` to set HTTP response header: Access-Control-Allow-Origin: *
app.use("/graphql", ExpressGraphQL({ schema: schema.schema, graphiql: true }));

app.listen(4000);
console.log("Running a GraphQL API server at ");
console.log("\x1b[36m%s\x1b[0m", "http://localhost:4000/graphql");
