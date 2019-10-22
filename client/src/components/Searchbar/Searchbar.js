import React, { useState, useEffect, useContext } from "react";
import { useQuery } from "react-apollo-hooks";
import gql from "graphql-tag";
import { Tween } from "react-gsap";

import Context from "context/context";
import Form from 'components/Form/searchForm';
import "./Searchbar.scss";

const GET_DESTINATIONS_FOR_SEARCH = gql`
  query countries_for_search {
    countries {
      id
      name
    }
  }
`;

const fields = (destinationOptions) => (
  [{
    label: "Destination:",
    type: "select",
    name: "destination",
    removeId: true,
    initialValue: destinationOptions[0],
    options: destinationOptions
  },
  {
    label: "Check ind:",
    type: "datepicker",
    name: "checkin"
  },
  {
    label: "check ud:",
    type: "datepicker",
    name: "checkout"
  },
  {
    label: "Antal personer:",
    type: "select",
    name: "quantity",
    initialValue: "1",
    options: ["1", "2", "3", "4", "5", "6", "7", "8"]
  }]
)

const Searchbar = (props) => {
  
  const context = useContext(Context);
  const [destinationOptions, setDestinationOptions] = useState(null)
  const { data } = useQuery(GET_DESTINATIONS_FOR_SEARCH, { suspend: true });

  useEffect(() => {
    if(data.countries) {
      let destinationOpt = []
// eslint-disable-next-line
      data.countries.map(country => {
        let path = `${country.name}-${country.id}`

        destinationOpt.push(path)
      })
      setDestinationOptions(destinationOpt);
    }
  }, [data])

  return (

    <Tween
      from={{ autoAlpha: 0, y: "0%" }}
      to={{ autoAlpha: 1, y: "-20%" }}
      duration={0.5}
      playState={context.showSearchbar ? "play" : "reverse"}
    >
      <div className="searchbar-container">
        {!!destinationOptions && (
          <>
            <div className="searchbar">
              <div className="searchbar__title">
                <h3>Find dit værelse</h3>
                <p>Hvor vil du hen og hvornår vil du det?</p>
              </div>
              <Form
                handleSubmit={() => {}}
                fields={fields(destinationOptions)}
                class={"searchbar__form"}
                submitButton={"Søg"}
                {...props}
              />
            </div>
          </>
        )}
      </div>
    </Tween>
  );
};
export default Searchbar;
