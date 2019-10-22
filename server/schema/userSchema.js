import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    users(args: usersArgs): [User!]
    user(_id: ID): User
    me: User
  }

  extend type Mutation {
    login(email: String!, password: String!): Token!
    signup(user: signupInput): Token!

    ## ME OR ADMIN ONLY ##
    updateUser(
      firstname: String!
      lastname: String!
      email: String!
      phone: String!
      args: updateUserArgs
    ): User
    
    deleteUser(_id: ID args: updateUserArgs): User

    ## ADMIN ONLY ##
    createUser(user: createUserInput): User
  }

  enum Roles {
    user
    admin
    superhero
  }

  type Token {
    token: String!
  }

  input usersArgs {
    limit: Int
  }

  type User {
    _id: ID!
    fullname: String
    firstname: String!
    lastname: String!
    email: String!
    phone: String!
    password: String!
    terms: Boolean
    comments: [Comment!]
    likes: [Like!]
    bookings: [Booking!]
    role: Roles
  }

  input signupInput {
    firstname: String!
    lastname: String!
    email: String!
    password: String!
    confirmPassword: String!
    phone: String!
    terms: Boolean
  }

  input createUserInput {
    firstname: String!
    lastname: String!
    email: String!
    password: String!
    phone: String!
    role: String
  }

  input updateUserInput {
    firstname: String
    lastname: String
    email: String
    password: String
    phone: String
    role: String
  }

  input updateUserArgs {
    _id: String
  }
`;
