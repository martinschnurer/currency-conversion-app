import { CONFIG } from "./config";
import serverless from "serverless-http";
import express from "express";
import cors from "cors";
import graphqlHTTP from "express-graphql";
import { buildSchema } from "./buildSchema";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors({
  origin: CONFIG.ALLOWED_ORIGIN,
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
        res.status(400).json(err);
      });
  }
);


if (process.env.ENV === "development") {
  
  // only for local development
  app.listen(CONFIG.PORT, () => {
    console.log(`Server started at http://localhost:${CONFIG.PORT}` );
  });
}


// for production
// exporting for AWS Lambda
export const handler = serverless(app);
