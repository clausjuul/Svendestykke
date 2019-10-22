import { gql } from 'apollo-server-express';

import userSchema from './userSchema';
import commentSchema from './commentSchema';
import likeSchema from './likeSchema';
import bookingSchema from './bookingSchema';
import roomSchema from './roomSchema';
import citySchema from './citySchema';
import countrySchema from './countrySchema';
import hotelSchema from './hotelSchema';
import newsSchema from './newsSchema';

const linkSchema = gql`
  scalar Date

  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }
`;

export default [
  linkSchema,
  userSchema,
  commentSchema,
  likeSchema,
  bookingSchema,
  roomSchema,
  citySchema,
  countrySchema,
  hotelSchema,
  newsSchema
];
