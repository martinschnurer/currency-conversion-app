import QueryResolver from "./Query";
import { Resolvers } from "../graphqlTypes/graphqlTypes";

const resolvers: Resolvers = {
  Query: QueryResolver,
}

export default resolvers;
