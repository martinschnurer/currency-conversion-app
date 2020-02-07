import DOTENV from "dotenv";
DOTENV.config();
import "./awsConfigure";

import express from "express";
import cors from "cors";
import graphqlHTTP from "express-graphql";
import { buildSchema } from "./buildSchema";

const app = express();
const port = process.env.PORT; // default port to listen

app.use(cors({
  origin: '*',
}));

app.use(
  '/graphql',
  (req, res) => {
    
    return buildSchema()
      .then(schema => {
        return graphqlHTTP({
          schema,
          graphiql: true,
        })(req, res);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  }
);

// define a route handler for the default home page
app.get( "/", async (req, res) => {
    
    // render the index template
    res.status(200).end(process.env.FOO);
});


// start the express server
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}` );
});
