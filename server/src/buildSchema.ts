import { importSchema,  } from "graphql-import";
import { makeExecutableSchema } from "graphql-tools";
import resolvers from "./graphql";

type ReturnT = ReturnType<typeof makeExecutableSchema>;
let cachedSchema: ReturnT = null;

export const buildSchema = async (): Promise<ReturnT> => {
  
  if (cachedSchema) {
    return cachedSchema;
  }
  
  cachedSchema = makeExecutableSchema({
    typeDefs: await importSchema(process.env.SCHEMA_PATH),
    resolvers,
  });

  return cachedSchema;
}
