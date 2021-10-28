import { Paper } from "graphql-paper";
import { GraphQLHandler } from "graphql-mocks";
import { extractDependencies } from "graphql-mocks/resolver";
import type { Resolvers } from "./types";

// Normally would import, but requires a bundler/loader, so duplicating below
// import graphqlSchema from "./schema.graphql";

// same as ./schema.graphql
const graphqlSchema = `
  type Query {
    user(id: ID!): User!
  }

  type User {
    id: ID!
    username: String!
    email: String!
  }
`;

const paper = new Paper(graphqlSchema);

const resolverMap: Resolvers = {
  Query: {
    user(root, args, context, info): any {
      const { paper } = extractDependencies(context, ["paper"]);
      return "foo";
      // return user
      return paper.data.User.find(({ id }) => id === args.id);
    }
  }
};

// const handler = new GraphQLHandler({
//   resolverMap,
//   dependencies: { graphqlSchema, paper }
// });
