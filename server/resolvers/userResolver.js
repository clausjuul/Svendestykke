import bcrypt from 'bcryptjs';
import { AuthenticationError, UserInputError } from "apollo-server";
import { combineResolvers } from 'graphql-resolvers';

import createToken from '../helpers/createToken';
import { isAdmin, isMeOrAdmin, isAuthenticated } from './authorization';

export default {
  Query: {
    users: async (_, { args }, { models }) => {
      return await models.User.find({}, null, args);
    },

    user: async (_, { _id }, { models }) => {
      return await models.User.findOne({ _id });
    },

    me: combineResolvers(isAuthenticated, async (_, __, { models, me }) => {
      return await models.User.findOne({ _id: me._id });
    })
  },

  Mutation: {
    signup: async (_, { user }, { models, secret }) => {
      const {
        firstname,
        lastname,
        email,
        password,
        confirmPassword,
        phone,
        terms
      } = user;

      if (password !== confirmPassword) {
        throw new UserInputError("Adgangskoderne er ikke ens");
      }

      if(terms !== true) {
        throw new UserInputError("Betingelserne er ikke accepteret");
      }

      const exsitingEmail = await models.User.findOne({ email });
      if (exsitingEmail) {
        throw new UserInputError("Invalid email");
      }

      const newUser = await new models.User({
        fullname: firstname + lastname,
        firstname,
        lastname,
        email,
        phone,
        password,
        terms: true,
        role: "user"
      });

      await newUser.save();

      return { token: createToken(newUser, secret) };
    },

    login: async (_, { email, password }, { models, secret }) => {
      const user = await models.User.findOne({ email });
      if (!user) {
        throw new UserInputError("Email or/and password invalid");
      }

      const isEqual = await bcrypt.compare(password, user.password);
      if (!isEqual) {
        throw new AuthenticationError("email or/and Password invalid");
      }

      return { token: createToken(user, secret) };
    },

    createUser: combineResolvers(isAdmin, async (_, { user }, { models }) => {
      const { firstname, lastname, email, password, phone, role } = user;

      const exsitingEmail = await models.User.findOne({ email });
      if (exsitingEmail) {
        throw new UserInputError("email already taken");
      }

      const newUser = await new models.User({
        fullname: `${firstname} ${lastname}`,
        firstname,
        lastname,
        email,
        phone,
        password,
        terms: true,
        role: role ? role : "user"
      });

      return newUser.save();
    }),

    updateUser: combineResolvers(
      isMeOrAdmin,
      async (_, { args, firstname, lastname, phone, email }, { models }) => {

        return models.User.findOneAndUpdate(
          { _id: args._id },
          {
            $set: {
              fullname: `${firstname} ${lastname}`,
              firstname,
              lastname,
              email,
              phone
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

    deleteUser: combineResolvers(
      isAuthenticated,
      async (_, args, { models }, info) => {
        try {
          const user = await models.User.findOne({ _id: args._id });

          if (!user) {
            throw new Error("user to delete, not found");
          }

          user.deleteOne();
          
          return user;
        } catch (error) {
          console.log(error);
          throw error;
        }
      }
    )
  },

  User: {
    comments: async (user, _, { models }) =>
      await models.Comment.find({
        userId: user._id
      }),

    likes: async (user, _, { models }) =>
      await models.Like.find({
        userId: user._id
      }),

    bookings: async (user, _, { models }) =>
      await models.Booking.find({
        userId: user._id
      })
  }
};
