import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import Context from "context/context";
import Card from "components/Card/Card";

export const CountrySidebar = props => {
  const { name } = props;
  return (
    <>
      <h2 className="sidebar__title">Kort over { name }</h2>
    </>
  );
};

const CountryView = props => {
  const { location } = props;
  const context = useContext(Context);

  // updating sideInfo' through global state/context
  // useEffect will only run on mount or/and when location.state changes
  // sideInfo = [title in hero, hero image id, show searchbar]
  // if hero image id is false, it will just keep the old one
  useEffect(() => {
    if (location.state && props.location.state.country) {
      let sideInfo = [
        `Hoteller og destinationer - ${location.state.country.name}`,
        location.state.country.image_id,
        true
      ];
      context.setSideInfo(sideInfo);
    }
    // eslint-disable-next-line
  }, [location.state]);

  return (
    <>
      {location && location.state && location.state.country && <>
        <h2 className="content__title">{location.state.country.name}</h2>
        <p className="content__description">{location.state.country.description}</p>

        <hr className="divider" />
        <section className="content__list">
          {location.state.country.cities.map(city => (
            <Link
              key={`city-card-${city.id}`}
              to={{pathname: `${location.pathname}/${city.name.toLowerCase()}-${city.id}`, state: { city }}}
            >
              <Card title={city.name} image={city.absolute_filename} content={city.description} />
            </Link>
          ))}
        </section>
      </>}
    </>
  );
};
export default CountryView;
