import gql from 'graphql-tag';

export default gql`
  extend type Query {
    bookingsByMe: [Booking!]
  }

  extend type Mutation {
    createBooking(
      price: Float
      roomId: String
      hotelId: String
      title: String
      quantity: Int
      priceType: String
    ): Booking

    updateBooking(
      hotel_id: String
      room_id: String
      quantity: String
      day_price_normal: String
      day_price_flex: String
      priceType: String
      args: BookingArgs
    ): Booking

    deleteBooking(_id: ID): Booking
  }

  input BookNowInput {
    price: String
    roomId: String
    hotelId: String
    title: String
    quantity: Int
    hotelName: String
    priceType: String
  }

  type Booking {
    _id: ID
    user: User
    hotel: Hotel
    room: Room
    roomId: String
    hotelId: String
    price: String
    priceType: String
    totalPrice: String
    quantity: String
    createdAt: Date
    updatedAt: Date
  }
 
  type BookingRoom {
    hotelId: String
    roomId: String
    quantity: Int
    price: Float
    price_flex: Boolean
  }

  input BookingInput {
    hotel_id: String
    room_id: String
    room_title: String
    quantity: String
    day_price_normal: String
    day_price_flex: String
  }

  input BookingArgs {
    _id: String
    hotelId: String
    hotel_id: String
    priceType: String
    hotel_title: String
    roomId: String
    room_id: String
    room_title: String
    description: String
    num_persons: String
    area: String
    num_rooms: String
    price: String
    day_price_normal: String
    day_price_flex: String
  }

  input RoomInput {
    title: String
    roomId: String
    hotelId: String
    price: Float
    quantity: Int
  }
`;
