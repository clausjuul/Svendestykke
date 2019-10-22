import { combineResolvers } from 'graphql-resolvers';
import { isCommentOwnerOrAdmin } from "./authorization";

export default {
  Query: {
    comments: async (_, __, { models }) => {
      return await models.Comment.find();
    },
    
    commentsByHotelId: async (_, { hotelId}, { models }) => {
      return await models.Comment.find({ hotelId: hotelId });
    },

    commentsByUser: async (_, { user }, { models }) => {
      return await models.Comment.find({ user: user });
    }
  },

  Mutation: {
    createComment: async (_, { content, args: { hotelId } }, { models, me }) => {
      const comment = await new models.Comment({
        content,
        hotelId,
        userId: me._id
      });

      return comment.save();
    },

    updateComment: combineResolvers(
      isCommentOwnerOrAdmin,
      async (_, { args: { commentId }, content }, { models }) => {
        return models.Comment.findOneAndUpdate(
          { _id: commentId },
          {
            $set: {
              content
            }
          },
          { new: true },
          (err) => {
            if (err) {
              throw new Error(err);
            }
          }
        );
      }
    ),

    deleteComment: combineResolvers(
      isCommentOwnerOrAdmin,
      async (_, { args: { commentId } }, { models }) => {
        try {
          const comment = await models.Comment.findOne({ _id: commentId });

          if (!comment) {
            throw new Error("comment to delete, not found");
          }

          comment.deleteOne();
          return comment;

        } catch (error) {
          
          throw error;
        }
      }
    )
  },

  Comment: {
    user: async (parent, __, { models }) => {
      return await models.User.findOne({ _id: parent.userId });
    }
  }
};
