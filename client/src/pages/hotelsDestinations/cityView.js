import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "react-apollo-hooks";
import gql from "graphql-tag";

import findIdFromUrl from 'helpers/findIdFromUrl';
import Card from "components/Card/Card";
import Context from 'context/context';

const GET_HOTELS = gql`
  query cityById($id: String) {
    cityById(id: $id) {
      id
      name
      description
      absolute_filename
      image_id
      hotels {
        id
        title
        num_stars
        absolute_filename
      }
    }
  }
`;

const CityView = props => {
  const { location, match } = props;
  const context = useContext(Context);

  const { error, data: {cityById: city} } = useQuery(GET_HOTELS, {
    suspend: true,
    variables: { id: findIdFromUrl(match.params.city) }
  });

  useEffect(() => {
    if (city) {
      let sideInfo = [
        `Hoteller og destinationer - ${city.name}`,
        city.image_id,
        true
      ];
      context.setSideInfo(sideInfo);
    }
    // eslint-disable-next-line
  }, [city]);

  return (
    <>
      {!!error && <div className="error">{error.message}</div>}
      {city && <>
        <h2 className="content__title">{city.name}</h2>
        <p className="content__description">{city.description}</p>

        <hr className="divider" />
          <section className="content__list">
          { city.hotels.map(hotel => (
            <Link
              key={`city-card-${hotel.id}`}
              to={`${location.pathname}/${hotel.title}-${city.id}`}
              >
                <Card 
                title={hotel.title} 
                image={hotel.absolute_filename} 
                stars={hotel.num_stars} 
                content={hotel.description} 
                />
              </Link>
            ))}
          </section>
        </>}
    </>
  );
};
export default CityView;
