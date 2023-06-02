const express = require("express");
const ExpressGraphQL = require("express-graphql").graphqlHTTP;
const schema = require("./graphql/post/post.js");
const app = express();

app.use("/graphql", ExpressGraphQL({ schema: schema.schema, graphiql: true }));

app.listen(4000);
console.log("Running a GraphQL API server at ");
console.log("\x1b[36m%s\x1b[0m", "http://localhost:4000/graphql");

/*
Querries:

// get
query{
  Posts{
    id,
    title,
    description,
    createDate,
    author
  }
}

// create
mutation {
  createPost(title: "Mi primer Post", description: "en mi primer post tengo que la vida no es facil", createDate:"25-09-2019",author:"Jesus GIlbert") {
    id,
    title,
    description,
    createDate,
    author
  }
}

// update
mutation {
  updatePost(
    id:2,
    title: "Mi segundo Post", 
    description: "en mi primer post tengo que la vida no es facil", 
    createDate:"26-09-2019",
    author:"Jesus GIlbert"
  )
}

// delete
mutation {
  deletePost(id:1)
}


*/
