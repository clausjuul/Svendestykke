import React, { useEffect, useContext } from "react";
import { useQuery } from "react-apollo-hooks";
import gql from "graphql-tag";

import findIdFromUrl from 'helpers/findIdFromUrl';
import RoomCard from "components/RoomCard/RoomCard";
import Context from "context/context";

const GET_HOTEL = gql`
  query hotelById($id: String) {
    hotelById(id: $id) {
      id
      title
      num_stars
      image_id
      rooms {
        hotel_id
        hotel_title
        room_id
        room_title
        description
        num_persons
        area
        num_rooms
        day_price_normal
        day_price_flex
        images {
          id
          title
          filename
          absolute_filename
        }
        facilities {
          room_facility_id
          title
          category_id
          category
        }
      }
    }
  }
`;

const HotelView = props => {
  const { match } = props;

  const context = useContext(Context);

  const { error, data: { hotelById: hotel }} = useQuery(GET_HOTEL, {
    suspend: true,
    variables: { id: findIdFromUrl(match.params.hotel) }
  });

  // updating sideInfo' through global state/context
  // useEffect will only run on mount or/and when hotel changes
  // sideInfo = [title in hero, hero image id, show searchbar]
  // if hero image id is false, it will just keep the old one
  useEffect(() => {
    if(hotel) {
      let sideInfo = [`${hotel.title}`, hotel.image_id, false];
      context.setSideInfo(sideInfo);
    }
    // eslint-disable-next-line
  }, [hotel]);

  return (
    <>
      {!!error && <div className="error">{error.message}</div>}
      {hotel && <>
        <h2 className="content__title">{hotel.name}</h2>
        <p className="content__paragraph">{hotel.description}</p>

        <hr className="divider" />
          <section className="hotel-content__list">
          {hotel.rooms.map((room, i) => {
            return (
              <RoomCard key={`room-card-${i}`} room={room} {...props} />
              )
          })}
          </section>
        </>}
    </>
  );
};
export default HotelView;
