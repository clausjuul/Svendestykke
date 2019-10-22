import React, { useState, useEffect, useContext } from "react";
import { useQuery, useMutation } from "react-apollo-hooks";
import gql from "graphql-tag";
import * as Yup from "yup";

import Form from "components/Form/Form";
import Breadcrumbs from "components/Breadcrums/Breadcrums";
import "./reservationPage.scss";
import Context from "context/context";

const GET_DESTINATIONS_FOR_BOOKING = gql`
  query countries {
    countries {
      id
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
            num_persons
            day_price_normal
            day_price_flex
          }
        }
      }
    }
  }
`;

const CREATE_BOOKING = gql`
  mutation createBooking(
    $args: BookingArgs
    $hotel_id: String
    $room_id: String
    $quantity: String
    $day_price_normal: String
  ) {
    createBooking(
      args: $args
      hotel_id: $hotel_id
      room_id: $room_id
      quantity: $quantity
      day_price_normal: $day_price_normal
    ) {
      _id
    }
  }
`;

  // function to create the fields array to the form
  // destinationOptions is the structured data from the fetch/query
  const createFields = (destinationOptions = [], isLoggedIn) => {

    let bookingFields = [
      {
        label: "Destination/hotel",
        type: "select",
        name: "hotel",
        initialValue: destinationOptions[0],
        options: destinationOptions
      },
      {
        label: "Værelsestype",
        type: "select",
        name: "room_id",
        options: ["1", "2", "3", "4", "5", "6"]
      },
      {
        label: "Antal personer:",
        type: "select",
        name: "num_persons",
        initialValue: "1",
        options: ["1", "2", "3", "4", "5", "6", "7", "8"]
      },
      {
        label: "Pris klasse:",
        type: "radio",
        name: "price_type",
        options: ["Normal pris", "Flex pris"]
      },
      {
        label: "check ind dato:",
        type: "date",
        name: "checkin",
      },
      {
        label: "check ud dato:",
        type: "date",
        name: "checkout",
      }
    ]
    let userFields = [
      {
        label: "Fornavn",
        type: "input",
        name: "firstname",
        initialValue: "",
        validation: Yup.string()
          .label("Fornavn")
          .min(2, "Minimum 2 bogstaver")
          .max(40, "Maximum 40 bogstaver")
          .required("Fornavn er påkrævet")
      },
      {
        label: "Efternavn",
        type: "input",
        name: "lastname",
        initialValue: "",
        validation: Yup.string()
          .label("Efternavn")
          .min(3, "Minimum 3 bogstaver")
          .max(40, "Maximum 40 bogstaver")
          .required("Efternavn er påkrævet")
      },
      {
        label: "E-mail / brugernavn:",
        type: "input",
        name: "email",
        initialValue: "",
        validation: Yup.string()
          .label("E-mail")
          .email("Not a valid Email")
          .required("E-mail er påkrævet")
      },
      {
        label: "Adgangskode:",
        type: "password",
        name: "password",
        initialValue: "",
        validation: Yup.string()
          .label("Adgangskode")
          .min(3, "Minimum 3 bogstaver og/eller tal")
          .required("Adgangskode er påkrævet")
      },
      {
        label: "Gentag adgangskode:",
        type: "password",
        name: "confirmPassword",
        initialValue: "",
        validation: Yup.string().oneOf(
          [Yup.ref("password"), null],
          "Adgangskoderne er ikke ens"
        )
      },
      {
        label: "Telefonnummer:",
        type: "input",
        name: "phone",
        initialValue: "",
        validation: Yup.string()
          .label("Telefonnummer")
          .min(7, "Minimum 7 tal")
          .max(13, "Maximum 13 tal")
          .required("Telefonnummer er påkrævet")
      },
      {
        label: "Eventuelle anmodninger eller kommentar:  (valgfri)",
        type: "textarea",
        name: "comment",
        initialValue: "",
        validation: Yup.string()
      },
      {
        text: "Jeg accepterer OverLooks betingelser",
        type: "checkbox",
        name: "terms",
        initialValue: false,
        value: false,
        validation: Yup.boolean()
          .label("Terms")
          .test(
            "is-true",
            "Du skal acceptere betingelserne",
            value => value === true
          )
      }
    ];

    let fields = isLoggedIn ? bookingFields : [...bookingFields, ...userFields];
    return fields;
  };

const ReservationPage = props => {
  const context = useContext(Context);

  const [bookMutation] = useMutation(CREATE_BOOKING);
  const { error, data } = useQuery(GET_DESTINATIONS_FOR_BOOKING, { suspend: true });

  const [destinationOptions, setDestinationOptions] = useState(null);
  const [fields, setFields] = useState(null);

  // updating sideInfo' through global state/context
  // useEffect will only run on mount or/and when data changes
  // sideInfo = [title in hero, hero image id, show searchbar]
  // if hero image id is false, it will just keep the old one
  useEffect(() => {
    if(data && data.countries) {
      let sideInfo = [`Reservation`, false, false];
      context.setSideInfo(sideInfo);
    }
    // eslint-disable-next-line
  }, [data.countries]);

  // Structuring and getting the data ready for the 'select destination'
  useEffect(() => {
    if (data.countries) {
      // eslint-disable-next-line
      const destinationOpt = [];
      // eslint-disable-next-line
      data.countries.map(country => {
        
        const countryName = `${country.name}`;
// eslint-disable-next-line
        country.cities.map(city => {
          // eslint-disable-next-line
          city.hotels.map(hotel => {
            destinationOpt.push(`${hotel.title}-${hotel.id}, ${countryName}`);
          })
        })
      });
      setDestinationOptions(destinationOpt);
    }
  }, [data]);

  // creating the fields array when the data is structured
  // setting the array returned from the createFields function to the fields state
  useEffect(() => {
    if (destinationOptions) {
      setFields(createFields(destinationOptions, context.user))
    }
    // eslint-disable-next-line
  }, [destinationOptions]);

  return (
    <>
      <section className="reservation-page">
        {error && <div className="error">{error.message}</div>}
        <Breadcrumbs />
        <main className="content">
          {fields && (

            <Form
              handleSubmit={bookMutation}
              onSuccess={() => {
                console.log("user updated");
              }}
              fields={fields}
              class={"form"}
              submitButton={"Send reservation"}
              redirect={() => props.history.push(`/tak-for-din-reservation`)}
            />
          )}
        </main>
        <aside className="sidebar">
          <h3 className="sidebar__title">Betingelser</h3>
          <ul className="sidebar__list">
            <li>Reduceret pris - spar op til 25%.</li>
            <li>Kan kun bookes online via OverLook' hjemmeside og app.</li>
            <li>Book helt op til og med ankostdagen.</li>
            <li>Reduceret pris - spar op til 25%</li>
          </ul>
        </aside>
      </section>
    </>
  );
};
export default ReservationPage;
