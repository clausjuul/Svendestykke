import { ForbiddenError } from 'apollo-server';
import { combineResolvers, skip } from 'graphql-resolvers';

export const isAuthenticated = (_, __, { me }) =>
  me ? skip : new ForbiddenError('Not authenticated as user.');

export const isAdmin = combineResolvers(
  isAuthenticated,
  (_, __, { me: { role } }) =>
    role === 'admin'
      ? skip
      : new ForbiddenError('Not authorized as admin.'),
);

export const isCommentOwnerOrAdmin = combineResolvers( isAuthenticated,
  async (_, { args: { commentId } }, { models, me }) => {

    const comment = await models.Comment.findById(commentId);

    if (comment.userId != me._id || me.role !== 'admin') {
      throw new ForbiddenError('Not authenticated as owner.');
    }

    return skip;
  }
)

export const isMeOrAdmin = async (
  _, args, { models, me } 
) => {
  
  let ark = null

  if(args.args._id != undefined) {
    ark = args.args._id
  }
  
  if (args._id != undefined) {
    ark = args._id;
  }

  const user = await models.User.findOne({ _id: ark });

  if (user._id == me._id || me.role == 'admin') {
    return skip;
  }
  
  throw new ForbiddenError('Not authenticated as owner or admin.');
};
