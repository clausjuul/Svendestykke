import { GraphQLDateTime } from 'graphql-iso-date';

import userResolver from './userResolver';
import commentResolver from './commentResolver';
import likeResolver from './likeResolver';
import countryResolver from './countryResolver';
import cityResolver from './cityResolver';
import hotelResolver from './hotelResolver';
import roomResolver from './roomResolver';
import newsResolver from './newsResolver';
import bookingResolver from './bookingResolver';

const customScalarResolver = {
  Date: GraphQLDateTime,
};

export default [
  customScalarResolver,
  userResolver,
  commentResolver,
  likeResolver,
  bookingResolver,
  countryResolver,
  cityResolver,
  hotelResolver,
  roomResolver,
  newsResolver
];
