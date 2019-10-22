import React, { useState, useEffect, Fragment, useContext } from "react";
import { useQuery } from 'react-apollo-hooks';
import gql from "graphql-tag";

import Context from 'context/context';
import RoomCard from 'components/RoomCard/RoomCard';
import Breadcrumbs from "components/Breadcrums/Breadcrums";
import findIdFromUrl from 'helpers/findIdFromUrl';
import extractGetParameters from 'helpers/extractGetParameters';
import './searchPage.scss';

const GET_SEARCH = gql`
  query countryById($id: String) {
    countryById(id: $id) {
      name
      cities {
        id
        name
        hotels {
          id
          title
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
    }
  }
`;

const SearchPage = (props) => {
  const { location } = props;

  const context = useContext(Context);
// eslint-disable-next-line
  const [searchParameters, setSearchParameters] = useState(null);
  const [destinationId, setDestinationId] = useState(null)

  const { error, data } = useQuery(GET_SEARCH, {
    suspend: true,
    skip: !destinationId,
    variables: { id: destinationId }
  });

  useEffect(() => {
    let parameters = extractGetParameters(location.search);
    setSearchParameters(parameters)
    let id = findIdFromUrl(parameters.destination);
    setDestinationId(id)
  }, [location.search])

  // updating sideInfo' through global state/context
  // useEffect will only run on mount or/and when data changes
  // sideInfo = [title in hero, hero image id, show searchbar]
  // if hero image id is false, it will just keep the old one
  useEffect(() => {
    if(data && data.countryById) {
      let sideInfo = [`Søge resultater`, false, false];
      context.setSideInfo(sideInfo);
    }
    // eslint-disable-next-line
  }, [data]);

  return (
    <>
      <section className="search-page">
        <Breadcrumbs />
        <div className="content">
          {error && <div className="error">{error.message}</div>}
          <h2 className="content__title">Find dit værelse</h2>
          {data &&
            data.countryById &&
            data.countryById.cities &&
            data.countryById.cities.map(city => (
              <Fragment key={`search-city-${city.id}`}>
                <h2 className="content__title-city">{city.name}</h2>
                <hr className="divider" />
                {city.hotels.map(hotel => (
                  <Fragment key={`search-hotel-${hotel.id}`}>
                    <h2 className="content__title">{hotel.name}</h2>
                    {hotel.rooms.map((room, i) => (
                      <RoomCard key={`search-room-${i}`} room={room} />
                    ))}
                  </Fragment>
                ))}
              </Fragment>
            ))}
        </div>
        <div className="divider-horizontal" />

        <aside className="sidebar">sidebar</aside>
      </section>
    </>
  );
};
export default SearchPage;
