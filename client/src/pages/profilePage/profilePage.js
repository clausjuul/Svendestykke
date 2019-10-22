import React, { useEffect, useContext, Fragment } from "react";
import { NavLink } from "react-router-dom";
import { useQuery, useMutation } from "react-apollo-hooks";
import gql from "graphql-tag";
import * as Yup from "yup";

import Form from 'components/Form/Form';
import './profilePage.scss'
import Breadcrumbs from "components/Breadcrums/Breadcrums";
import Context from "context/context";

const GET_ME = gql`
  query me {
    me {
      _id
      fullname
      firstname
      lastname
      email
      phone
      
    }
  }
`;

const BOOKINGS_BY_ME = gql`
  query bookingsByMe {
    bookingsByMe {
      _id
      roomId
      room {
        title
      }
      hotelId
      hotel {
        title
      }
      price
      priceType
      quantity
      createdAt
      updatedAt
    }
  }
`;

const UPDATE_BOOKING = gql`
  mutation updateBooking($args: BookingArgs, $quantity: String) {
    updateBooking(args: $args, quantity: $quantity) {
      _id
    }
  }
`;

const DELETE_BOOKING = gql`
  mutation deleteBooking($_id: ID) {
    deleteBooking(_id: $_id) {
      _id
    }
  }
`;

const EDIT_ME = gql`
  mutation updateUser(
    $args: updateUserArgs
    $firstname: String!
    $lastname: String!
    $email: String!
    $phone: String!
  ) {
    updateUser(
      args: $args
      email: $email
      firstname: $firstname
      lastname: $lastname
      phone: $phone
    ) {
      firstname
    }
  }
`;

const DELETE_ME = gql`
  mutation deleteUser($_id: ID) {
    deleteUser(_id: $_id) {
      firstname
    }
  }
`;

const createFlexBookingObj = (prop) => {
  let bookingFlex = {
    _id: prop._id,
    price: prop.price,
    roomId: prop.roomId,
    hotelId: prop.hotelId,
    // quantity: quantity,
    priceType: "flex"
  };
  return bookingFlex;
};

const createNormalBookingObj = (prop) => {
  let bookingNormal = {
    _id: prop._id,
    price: prop.price,
    roomId: prop.roomId,
    hotelId: prop.hotelId,
    // quantity: quantity,
    priceType: "normal"
  };
  return bookingNormal;
};

const UserSettings = (props) => {
  const { urlPath, me} = props;

  const [updateUserMutation] = useMutation(EDIT_ME);
  const [deleteUserMutation] = useMutation(DELETE_ME);

  const createUserFields = (me) => {

  const fields = [
    {
      label: "Fornavn",
      type: "input",
      name: "firstname",
      initialValue: me.firstname,
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
      initialValue: me.lastname,
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
      initialValue: me.email,
      validation: Yup.string()
        .label("E-mail")
        .email("Not a valid Email")
        .required("E-mail er påkrævet")
    },
    {
      label: "Telefonnummer:",
      type: "input",
      name: "phone",
      initialValue: me.phone,
      validation: Yup.string()
        .label("Telefonnummer")
        .min(7, "Minimum 7 tal")
        .max(13, "Maximum 13 tal")
        .required("Telefonnummer er påkrævet")
    }
  ]
  return fields
  }

  return (
    <>
      <h2 className="content__title">Rediger dine oplysninger</h2>
      <button
      className="delete-button"
        onClick={() => deleteUserMutation({variables: { _id: me._id }})}
      >
        Slet din bruger
      </button>

      <hr className="divider" />
      <Form
        handleSubmit={updateUserMutation}
        args={{ args: { _id: me._id } }}
        refetch={GET_ME}
        onSuccess={() => {
          console.log("user updated");
        }}
        fields={createUserFields(me)}
        class={"form"}
        submitButton={"Gem ændringer"}
        redirect={() => props.history.push(`${urlPath}`)}
      />
    </>
  );
}

const UserBookings = (props) => {

  const { data } = useQuery(BOOKINGS_BY_ME, { suspend: true });
  const [updateBookingMutation] = useMutation(UPDATE_BOOKING);
  const [deleteBookingMutation] = useMutation(DELETE_BOOKING);

  return (
    <>
      <h2 className="content__title">Administrer dine reservationer</h2>
      <h4 className="content__sub-title">
        Her kan du ændre og afbestille dine reservationer.
      </h4>

      <hr className="divider" />

      {data &&
        data.bookingsByMe &&
        data.bookingsByMe.map(booking => (
          <Fragment key={`booking-${booking._id}`}>
            <ul>
              <>
                <li className="booked-card">
                  <ul>
                    <li>hotel navn: {booking.hotel.title}</li>
                    <li>hvilket værelse på hotellet: {booking.room.title}</li>
                    <li>hvilken type: {booking.priceType} </li>
                    <li>til en pris på: {booking.price}</li>
                    <li>stk: {booking.quantity}</li>
                    <li>
                      <button
                        onClick={async () => {
                          await deleteBookingMutation({
                            variables: { _id: booking._id }
                          });
                          await props.history.push("/bruger-side");
                        }}
                      >
                        Anullere booking
                      </button>
                    </li>
                  </ul>
                </li>
              </>
              <li>
                <Form
                  handleSubmit={updateBookingMutation}
                  args={{
                    args:
                      // eslint-disable-next-line
                      booking.priceType == "normal"
                        ? createNormalBookingObj(booking)
                        : createFlexBookingObj(booking)
                  }}
                  refetch={BOOKINGS_BY_ME}
                  onSuccess={() => {
                    console.log("user updated");
                  }}
                  fields={[
                    {
                      label: "Antal:",
                      type: "select",
                      name: "quantity",
                      initialValue: "1",
                      options: ["1", "2", "3", "4", "5", "6", "7", "8"]
                    }
                  ]}
                  class={"form"}
                  submitButton={"Gem ændringer"}
                  redirect={() => props.history.push(`/bruger-side`)}
                />
              </li>
            </ul>
          </Fragment>
        ))}
    </>
  );
}

const ProfilePage = props => {
  const { match } = props;

  const urlPath = "/bruger-side";

  const context = useContext(Context);

  const {error, data} = useQuery(GET_ME, { suspend: true });

  // updating sideInfo' through global state/context
  // useEffect will only run on mount or/and when me changes
  // sideInfo = [title in hero, hero image id, show searchbar]
  // if hero image id is false, it will just keep the old one
  useEffect(() => {
    if(data && data.me) {
      let sideInfo = [`Bruger side`, false, false];
      context.setSideInfo(sideInfo);
    }
    // eslint-disable-next-line
  }, [data.me]);

  return (
    <>
      <div className="profile-page">
        {error && <div className="error">{error.message}</div>}
        <Breadcrumbs />
        <main className="content">
          {data && data.me && (
            <>
              {match.path === `${urlPath}` && (
                <UserBookings me={data.me} urlPath={urlPath} {...props} />
              )}
              {match.path === `${urlPath}/edit` && (
                <UserSettings me={data.me} urlPath={urlPath} {...props} />
              )}
            </>
          )}
        </main>
        <aside className="sidebar">
          {data && data.me && (
            <>
              <h3 className="sidebar__title">Dine oplysninger</h3>
              <ul className="sidebar__list">
                <li>
                  Du er logget ind som:<br></br>
                  <b>{data.me.fullname}</b>
                </li>
                <li>{data.me.email}</li>
                <li>{data.me.phone}</li>
                <li>
                  <NavLink exact={true} to={`${urlPath}/edit`}>
                    Rediger profil
                  </NavLink>
                </li>
                <li>
                  <NavLink exact={true} to={`${urlPath}`}>
                    Administrer reservationer
                  </NavLink>
                </li>
                <li>
                  <button className="logout" onClick={() => context.logout()}>
                    Log ud
                  </button>
                </li>
              </ul>
            </>
          )}
        </aside>
      </div>
    </>
  );
};
export default ProfilePage;
