import { combineResolvers } from 'graphql-resolvers';
import { isAuthenticated } from './authorization';

export default {
  Query: {
    likesByHotelId: async (_, { hotelId }, { models }) => {
      return models.Like.find({ hotelId });
    },

    likesByUser: async (_, __, { models, me }) => {
      return models.Like.find({ userId: me._id });
    }
  },

  Mutation: {
    like: combineResolvers(isAuthenticated,
      async (_, { hotelId }, { models, me }) => {

        const alreadyLiked = await models.Like.findOne({
          userId: me._id,
          hotelId: hotelId
        });

        if (alreadyLiked) {
          return alreadyLiked.remove()
        } else {
          const like = new models.Like({
            hotelId: hotelId,
            userId: me._id
          });

          return like.save();
        }
      }
    )
  },
  
  Like: {
    user: async (parent, _, { models }) => {
      return await models.User.findOne({ _id: parent.userId })
    }
  }
}

