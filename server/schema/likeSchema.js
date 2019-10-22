import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    likesByHotelId(hotelId: String): [Like]
    likesByUser(user: String): [Like]
  }

  extend type Mutation {
    like(hotelId: String): Like!
  }

  type Like {
    _id: ID!
    hotelId: String
    user: User
    createdAt: Date!
  }
`;
