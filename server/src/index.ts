import DOTENV from "dotenv";
DOTENV.config();
import "./awsConfigure";

import serverless from "serverless-http";
import express from "express";
import cors from "cors";
import graphqlHTTP from "express-graphql";
import { buildSchema } from "./buildSchema";

const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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


/*
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}` );
});
*/

export const handler = serverless(app);
