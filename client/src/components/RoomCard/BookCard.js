import React, { useState, useEffect } from "react";
import { useMutation } from "react-apollo-hooks";
import gql from "graphql-tag";

import "./RoomCard.scss";

const CREATE_BOOKING = gql`
  mutation createBooking(
    $price: Float
    $roomId: String
    $hotelId: String
    $quantity: Int
    $priceType: String
  ) {
    createBooking(
      price: $price
      roomId: $roomId
      hotelId: $hotelId
      quantity: $quantity
      priceType: $priceType
    ) {
      _id
    }
  }
`;

const BookCard = props => {

  const { day_price_normal, day_price_flex } = props.room;
  const [isBooked, setIsBooked] = useState(false)

  const [bookMutation, { data }] = useMutation(CREATE_BOOKING, {
    variables: props.book
  });
  useEffect(() => {
    if(data && data.createBooking) {
      setIsBooked(true)
    }
  }, [data])

  useEffect(() => {
    if(isBooked) {
      setTimeout(() => {
        setIsBooked(false);
      }, 2000);
    }
  }, [isBooked]);

  return (
    <>
      <li className="book-card">
        <span className="book-card__title">
          {props.flex ? "FLEX" : "NORMAL"} pris inkl. morgenmad
        </span>
        <span className="book-card__flex">
          {props.flex
            ? "Kan ikke ændres eller afbestilles"
            : "Kan ændres eller afbestilles"}
        </span>
        <span className="book-card__price">
          <span className="book-card__price--valuta">
            {props.flex
              ? parseFloat(day_price_flex)
              : parseFloat(day_price_normal)}
          </span>
          DKK/nat
        </span>
        <button onClick={bookMutation} className="book-card__button">
          Book
        </button>
        {isBooked && <div style={{color: 'green', fontSize: '0.7rem'}}>det er nu booket</div>}
      </li>
    </>
  );
};
export default BookCard;
