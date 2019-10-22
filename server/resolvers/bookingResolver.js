// import jwt from 'jsonwebtoken';
// import createToken from '../helpers/createToken';
// import { AuthenticationError, UserInputError } from "apollo-server";
// import bcrypt from 'bcryptjs';

import { combineResolvers } from 'graphql-resolvers';

import { isAuthenticated } from './authorization';

export default {
  Query: {
    bookingsByMe: async (_, { args }, { models, me }) => {
      const res = await models.Booking.find({ userId: me._id });
      // console.log('res: ', res)
      return res;
      // return await models.Booking.find({userId: me._id});
    }
  },

  Mutation: {
    createBooking: combineResolvers(
      isAuthenticated,
      async (_, args, { models, me }) => {
        const { roomId, hotelId, price, priceType, quantity } = args;

        let totalPrice = price * quantity;

        let booking = {
          userId: me._id,
          totalPrice: totalPrice,
          quantity,
          roomId,
          hotelId,
          price,
          priceType
        };

        const newBooking = await new models.Booking(booking);

        if (newBooking) {
          // await models.User.updateOne(
          //   { "_id": me._id },
          //   { $push: {
          //       bookings: newBooking._id
          //   }}
          // )
          return newBooking.save();
        } else return null;
      }
    ),

    updateBooking: combineResolvers(
      isAuthenticated,
      async (_, { args, quantity }, { models, me }) => {
        // const { roomId, hotelId, price, priceType, quantity } = args;
        let totalPrice = args.price * quantity;
        // let totalQuantity = 0;
        // totalPrice = price * quantity;
        // totalQuantity = totalQuantity + room.quantity;
        return models.Booking.findOneAndUpdate(
          { _id: args._id },
          {
            $set: {
              userId: me._id,
              totalPrice: totalPrice,
              quantity,
              roomId: args.roomId,
              hotelId: args.hotelId,
              price: args.price,
              priceType: args.priceType
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

    deleteBooking: combineResolvers(
      isAuthenticated,
      async (_, args, { models }) => {
        console.log("gggDE", args);
        try {
          const booking = await models.Booking.findOne({ _id: args._id });

          if (!booking) {
            throw new Error("booking to delete, not found");
          }

          return await booking.deleteOne();
        } catch (error) {
          console.log(error);
          throw error;
        }
      }
    )
  },
  
  Booking: {
    user: async (parent, _, { models }) => {
      return await models.User.findById(parent.userId);
    },

    hotel: async (parent, _, { dataSources }) => {
      return await dataSources.api.hotelById(parent.hotelId);
    },

    room: async (parent, _, { dataSources }) => {

      return await dataSources.api.roomById(parent.roomId);
    }
  }
};
