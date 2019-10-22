import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    comments: [Comment]
    commentsByHotelId(hotelId: String): [Comment!]
    commentsByUser(user: String): [Comment!]
  }

  extend type Mutation {
    createComment(content: String, args: CommentArgs): Comment!
    updateComment(content: String, args: CommentArgs): Comment!
    deleteComment(args: CommentArgs): Comment
  }

  input CommentArgs {
    commentId: ID
    hotelId: String
  }

  type Comment {
    _id: ID!
    content: String
    hotelId: String
    user: User
    createdAt: Date!
    updatedAt: Date!
  }
`;
