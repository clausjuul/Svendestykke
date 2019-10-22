import React, { useState, useEffect, useContext } from "react";
 import { NavLink, Link } from 'react-router-dom';
import { useQuery, useMutation } from "react-apollo-hooks";
import gql from "graphql-tag";

import Context from "context/context";
import findIdFromUrl from "helpers/findIdFromUrl";
import Breadcrumbs from "components/Breadcrums/Breadcrums";
import Card from "components/Card/Card";
import "./hotels-destinationsPage.scss";
import CountryView from "./countryView";
import CityView from "./cityView";
// import { CitySidebar } from './cityView';
import HotelView from "./hotelView";
// import {HotelSidebar} from './hotelView';
import {CountrySidebar} from './countryView';

const GET_COUNTRIES = gql`
  query countries {
    countries {
      id
      name
      description
      absolute_filename
      image_id
      cities {
        id
        name
        image_id
        description
        absolute_filename
      }
    }
  }
`;
const GET_COUNTRY_BY_ID = gql`
  query countryById($id: String) {
    countryById(id: $id) {
      id
      cities {
        id
        name
        image_id
        description
        absolute_filename
      }
    }
  }
`;

const LIKE_HOTEL_MUTATION = gql`
  mutation like($hotelId: String) {
    like(hotelId: $hotelId) {
      _id
      createdAt
    }
  }
`;

const GET_HOTEL_SIDEBAR_DATA = gql`
  query hotelById($id: String) {
    hotelById(id: $id) {
      id
      title
      address
      phone
      num_stars
      likes {
        _id
      }
    }
  }
`;

export const HotelSidebar = props => {
  const { match } = props;

  const context = useContext(Context);
  const [liked, setLiked] = useState('');

  const [likeMutation] = useMutation(
    LIKE_HOTEL_MUTATION,
    {
      refetchQueries: [{ query: GET_HOTEL_SIDEBAR_DATA }]
    }
  );
  
  const { data: { hotelById: hotel }} = useQuery(
    GET_HOTEL_SIDEBAR_DATA, {
    suspend: true,
    variables: { id: findIdFromUrl(match.params.hotel) }
  });

  const likedByMe = () => {
    try {
      const liked = hotel.likes.find(like => {
        return like.user._id === context.user._id;
      });

      if (liked) {
        setLiked(true);
      }
    } catch (error) {
      setLiked(false);
    }
  };

  useEffect(() => {
    likedByMe();
    // eslint-disable-next-line
  }, [hotel]);

  return (
    <>
      <h3 className="sidebar__title">Hotel information</h3>
      <ul className="sidebar__list">
        {hotel && (
          <>
            <li>
              <b>{hotel.title}</b>
            </li>
            <li>Adresse: {hotel.address}</li>
            <li>telefon: {hotel.phone}</li>
            <li>stars: {hotel.num_stars}</li>
            <li>
              {context.user ? (
                <span
                  className={liked ? "liked" : "like"}
                  onClick={() =>
                    likeMutation({ variables: { hotelId: hotel.id } })
                  }
                >
                  {liked ? "dislike" : "like"} {hotel.likes.length}
                </span>
              ) : (
                <span className="likeCount">
                  <b>{"likes: " + hotel.likes.length}</b>
                </span>
              )}
            </li>
          </>
        )}
      </ul>
    </>
  );
};

export const CitySidebar = props => {
  const { match, location } = props;

  const {
    data
  } = useQuery(GET_COUNTRY_BY_ID, {
    suspend: true,
    variables: { id: findIdFromUrl(match.params.country) }
  });

  return (
    <>
      <h3 className="sidebar__title">Se andre byer fra samme land</h3>
      <ul className="sidebar__list">
        {data &&
          data.countryById &&
          data.countryById.cities.map(city => (
            <li key={`sidebar-cities-${city.id}`}>
              <NavLink to={`${location.pathname}/${city.name}-${city.id}`}>
                {city.name}
              </NavLink>
            </li>
          ))}
      </ul>
    </>
  );
};

const CountriesView = (props) => {
  const { location, countries } = props;
  return (
    <>
      <h2 className="content__title">Vælg et land: </h2>
      <section className="content__list">
      {countries &&
        countries.map(country => (
          <Link
            key={`countries-${country.id}`}
            to={{pathname: `${location.pathname}/${country.name.toLowerCase()}-${country.id}`, state: { country }}}
          >
            <Card
              title={country.name}
              content={country.description}
              image={country.absolute_filename}
            />
          </Link>
        ))}
        </section>
    </>
  );
}

const HotelsDestinationsPage = props => {
  const { match } = props;

  const context = useContext(Context);

  const { error, data } = useQuery(GET_COUNTRIES, { suspend: true });
  
  useEffect(() => {
    if(data && data.countries) {
      let sideInfo = [`Hoteller og destinationer`, false, true];
      context.setSideInfo(sideInfo);
    }
    // eslint-disable-next-line
  }, [data]);

  return (
    <>
      <section className="hotelsDestinations">
        <ul className="hotelsDestinations__list">
          {!!error && <div className="error">{error.message}</div>}
          {data &&
            data.countries &&
            data.countries.map(country => (
              <li key={`country-list-${country.id}`}>
                <NavLink
                  to={{
                    pathname: `/hoteller-og-destinationer/${country.name.toLowerCase()}-${
                      country.id
                    }`,
                    state: { country: country }
                  }}
                  className="hotelsDestinations__list__item"
                >
                  {country.name}
                </NavLink>
              </li>
            ))}
        </ul>
        <section className="content">
          <Breadcrumbs />
          {data && data.countries && (
            <>
              {match.path === "/hoteller-og-destinationer" && (
                <CountriesView countries={data.countries} {...props} />
              )}

              {match.path === "/hoteller-og-destinationer/:country" && (
                <CountryView {...props} />
              )}

              {match.path === "/hoteller-og-destinationer/:country/:city" && (
                <CityView {...props} />
              )}

              {match.path ===
                "/hoteller-og-destinationer/:country/:city/:hotel" && (
                <HotelView {...props} />
              )}
            </>
          )}
        </section>

        <aside className="sidebar">

          {match.path === "/hoteller-og-destinationer" && (
            <h3 className="sidebar__title">Sidebar:</h3>
          )}

          {match.path === "/hoteller-og-destinationer/:country" && (
            <CountrySidebar {...props} />
          )}

          {match.path === "/hoteller-og-destinationer/:country/:city" && (
            <CitySidebar {...props} />
          )}

          {match.path ===
            "/hoteller-og-destinationer/:country/:city/:hotel" && (
            <HotelSidebar {...props} />
          )}
        </aside>
      </section>
    </>
  );
};
export default HotelsDestinationsPage;
