import gql from 'graphql-tag';

export default gql`

  extend type Query {
    hotels: [Hotel]
    hotelById(id: String): Hotel
    hotelsByCity(id: String): [Hotel]
    facilitiesByHotel(id: String): [HotelFacility]
  }

  type Hotel {
    id: String
    title: String
    teaser: String
    description: String
    address: String
    phone: String
    city_id: String
    city_name: String
    num_stars: String
    image_id: String
    filename: String
    absolute_filename: String
    likes: [Like]
    likesCount: Int
    comments: [Comment]
    commentsCount: Int
    rooms: [RoomsAtHotel]
    facilities: [HotelFacility]
  }

  type HotelFacility {
    id: String
    title: String
    teaser: String
    description: String
    address: String
    phone: String
    city_id: String
    city_name: String
    num_stars: String
    image_id: String
    filename: String
    absolute_filename: String
  }
`;
