const graphql = require("graphql");
const sqlite3 = require("sqlite3").verbose();

//create a database if no exists
const database = new sqlite3.Database("../graphs.db");

//create a table to insert Record
const createRecordTable = () => {
  const query = `
        CREATE TABLE IF NOT EXISTS records (
        id integer PRIMARY KEY,
        value float,
        description text,
        createDate text,
        author text )`;

  return database.run(query);
};

//call function to init the Record table
createRecordTable();

//creacte graphql Record object
const RecordType = new graphql.GraphQLObjectType({
  name: "Record",
  fields: {
    id: { type: graphql.GraphQLID },
    value: { type: graphql.GraphQLFloat },
  },
});
// create a graphql query to select all and by id
var queryType = new graphql.GraphQLObjectType({
  name: "Query",
  fields: {
    //first query to select all
    Records: {
      type: graphql.GraphQLList(RecordType),
      resolve: (root, args, context, info) => {
        return new Promise((resolve, reject) => {
          // raw SQLite query to select from table
          database.all("SELECT * FROM Records;", function (err, rows) {
            if (err) {
              reject([]);
            }
            resolve(rows);
          });
        });
      },
    },
    //second query to select by id
    Record: {
      type: RecordType,
      args: {
        id: {
          type: new graphql.GraphQLNonNull(graphql.GraphQLID),
        },
      },
      resolve: (root, { id }, context, info) => {
        return new Promise((resolve, reject) => {
          database.all(
            "SELECT * FROM Records WHERE id = (?);",
            [id],
            function (err, rows) {
              if (err) {
                reject(null);
              }
              resolve(rows[0]);
            }
          );
        });
      },
    },
  },
});
//mutation type is a type of object to modify data (INSERT,DELETE,UPDATE)
var mutationType = new graphql.GraphQLObjectType({
  name: "Mutation",
  fields: {
    //mutation for creacte
    createRecord: {
      //type of object to return after create in SQLite
      type: RecordType,
      //argument of mutation creacteRecord to get from request
      args: {
        value: {
          type: new graphql.GraphQLNonNull(graphql.GraphQLFloat),
        },
      },
      resolve: (root, { value }) => {
        return new Promise((resolve, reject) => {
          //raw SQLite to insert a new Record in Record table
          database.run(
            "INSERT INTO Records (value) VALUES (?);",
            [value],
            (err) => {
              if (err) {
                reject(null);
              }
              database.get("SELECT last_insert_rowid() as id", (err, row) => {
                resolve({
                  id: row["id"],
                  value: value,
                });
              });
            }
          );
        });
      },
    },
    //mutation for update
    updateRecord: {
      //type of object to return afater update in SQLite
      type: graphql.GraphQLString,
      //argument of mutation creacteRecord to get from request
      args: {
        id: {
          type: new graphql.GraphQLNonNull(graphql.GraphQLID),
        },
        value: {
          type: new graphql.GraphQLNonNull(graphql.GraphQLFloat),
        },
      },
      resolve: (root, { id, value }) => {
        return new Promise((resolve, reject) => {
          //raw SQLite to update a Record in Record table
          database.run(
            "UPDATE Records SET value = (?) WHERE id = (?);",
            [value, id],
            (err) => {
              if (err) {
                reject(err);
              }
              resolve(`Record #${id} updated`);
            }
          );
        });
      },
    },
    //mutation for update
    deleteRecord: {
      //type of object resturn after delete in SQLite
      type: graphql.GraphQLString,
      args: {
        id: {
          type: new graphql.GraphQLNonNull(graphql.GraphQLID),
        },
      },
      resolve: (root, { id }) => {
        return new Promise((resolve, reject) => {
          //raw query to delete from Record table by id
          database.run("DELETE from Records WHERE id =(?);", [id], (err) => {
            if (err) {
              reject(err);
            }
            resolve(`Record #${id} deleted`);
          });
        });
      },
    },
  },
});

//define schema with Record object, queries, and mustation
const schema = new graphql.GraphQLSchema({
  query: queryType,
  mutation: mutationType,
});

//export schema to use on index.js
module.exports = {
  schema,
};

/*
Querries:

// get
query{
  Records{
    id,
    value,
  }
}

// create
mutation {
  createRecord(value: 0.12) {
    id,
    value,
  }
}

// update
mutation {
  updateRecord(
    id:2,
    value: 0.1, 
  )
}

// delete
mutation {
  deleteRecord(id:1)
}

*/
