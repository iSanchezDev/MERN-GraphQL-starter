import { makeExecutableSchema } from 'graphql-tools';
import { merge } from 'lodash';
import rootTypeDefs from './root';
import { userResolvers, userTypeDefs } from './user/user.schema';
import {workspaceResolvers, workspaceTypeDefs} from './workspace/workspace.schema';

/**
 * Schema declaration for GraphQL types and resolvers
 */
export default makeExecutableSchema({
  typeDefs: [rootTypeDefs, userTypeDefs, workspaceTypeDefs],
  resolvers: merge(userResolvers, workspaceResolvers),
});
