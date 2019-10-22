import gql from 'graphql-tag';

export default gql`
  extend type Query {
    rooms: [Room]
    roomById(id: String): Room
    roomsByHotel(id: String): [Room]
    imagesByRoom(id: String): [Image]
    facilitiesByRoom(id: String): [RoomFacility]
    allImages: [Image]
  }

  type Room {
    id: String
    title: String
    description: String
    num_persons: String
    area: String
    day_price_normal: String
    day_price_flex: String
    images: [Image]
    facilities: [RoomFacility]
  }

  type RoomsAtHotel {
    hotel_id: String
    hotel_title: String
    room_id: String
    room_title: String
    description: String
    num_persons: String
    area: String
    num_rooms: String
    day_price_normal: String
    day_price_flex: String
    images: [Image]
    facilities: [RoomFacility]
  }

  type RoomFacility {
    room_facility_id: String
    title: String
    category_id: String
    category: String
  }

  type Image {
    id: String
    title: String
    filename: String
    absolute_filename: String
  }
`;
