import jwt from 'jsonwebtoken';
import User from './user.model';
import config from '../../config';
import Workspace from '../workspace/workspace.model';

/**
 * Export a string which contains our GraphQL type definitions.
 */
export const userTypeDefs = `

  type User {
    id: ID!
    workspaceId: String
    workspace: Workspace
    email: String!
    password: String!
    firstName: String!
    language: String
  }

  input UserFilterInput {
    limit: Int
  }
  
  input Token {
    token: String!
  }

  # Extending the root Query type.
  extend type Query {
    users(filter: UserFilterInput): [User]
    user(id: String!): User
    isUserLogged(token: String!): String
  }

  # We do not need to check if any of the input parameters exist with a "!" character.
  # This is because mongoose will do this for us, and it also means we can use the same
  # input on both the "addUser" and "editUser" methods.
  input UserInput {
    email: String
    password: String
    firstName: String
    language: String
    workspaceId: String
  }

  # Extending the root Mutation type.
  extend type Mutation {
    addUser(input: UserInput!): User
    editUser(id: String!, input: UserInput!): User
    deleteUser(id: String!): User
    loginUser(email: String!, password: String!): String!
  }
`;

/**
 * Exporting our resolver functions. Note that:
 * 1. They can use async/await or return a Promise which
 *    Apollo will resolve for us.
 * 2. The resolver property names match exactly with the
 *    schema types.
 */
export const userResolvers = {
  Query: {
    async users(_, { filter = {} }) {
      const users: any[] = await User.find({}, null, filter);
      return users.map(user => user.toGraph());
    },
    async user(_, { id }) {
      const user: any = await User.findById(id);
      return user.toGraph();
    },
    async isUserLogged(_, { token }) {
      return jwt.verify(token, config.token.secret, (err) => {
        if (err) {
          return 'This user is not authenticated'
        }
        return 'Logged'
      });
    },
  },
  Mutation: {
    async addUser(_, { input }) {
      const user: any = await User.create(input);
      return user.toGraph();
    },
    async editUser(_, { id, input }) {
      const user: any = await User.findByIdAndUpdate(id, input);
      return user.toGraph();
    },
    async deleteUser(_, { id }) {
      const user: any = await User.findByIdAndRemove(id);
      return user ? user.toGraph() : null;
    },
    async loginUser(_, { email, password }) {
      const user: any = await User.findOne({ email });
      const match: boolean = await user.comparePassword(password);
      if (match) {
        return jwt.sign({
          id: user.id,
          email: user.email },
          config.token.secret,
          { expiresIn: '1d' });
      }
      throw new Error('Not Authorised.');
    },
  },
  User: {
    async workspace(user: { workspaceId: string }) {
      if (user.workspaceId) {
        const workspace: any = await Workspace.findById(user.workspaceId);
        return workspace.toGraph();
      }
      return null;
    },
  },
};
