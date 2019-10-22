import React, { useState } from "react";

import BookCard from './BookCard';
import "./RoomCard.scss";

const createFlexBookingObj = prop => {
  let bookingFlex = {
    price: parseFloat(prop.day_price_flex),
    roomId: prop.room_id,
    hotelId: prop.hotel_id,
    quantity: 1,
    priceType: "flex"
  };
  return bookingFlex;
};

const createNormalBookingObj = prop => {
  let bookingNormal = {
    price: parseFloat(prop.day_price_normal),
    roomId: prop.room_id,
    hotelId: prop.hotel_id,
    quantity: 1,
    priceType: "normal"
  };
  return bookingNormal;
};

const Closed = (props) => {
  const { room_title, num_persons, area, description, day_price_normal } = props.room;
  return (
    <div className="closed">
      <span>
        <h3 className="room-card__title-closed">{room_title}</h3>
        <p className="room-card__size-closed">{`${area}. Plads til ${num_persons} personer.`}</p>
        <p className="room-card__description-closed">{description}</p>
      </span>
      <span className="room-card__price-closed">
        Fra {parseFloat(day_price_normal)} DKK
      </span>
    </div>
  );
}

const Open = (props) => {
  console.log('PRRROOOPPPSS: ', props)
  const {
    room_title,
    num_persons,
    area,
    description,
    facilities,
  } = props.room;


  let flexBooking = createFlexBookingObj(props.room);
  let normalBooking = createNormalBookingObj(props.room);
  return (
    <div className="open">
      <h3 className="room-card__title">{room_title}</h3>
      <p className="room-card__size-closed">{`${area}. Plads til ${num_persons} personer.`}</p>
      <p className="room-card__description">{description}</p>
      <ul className="room-card__facilities__list">
        {facilities.map((facility, i) => (
          <li key={`facility-${i}`}>{facility.title}</li>
        ))}
      </ul>
      <ul className="book-cards">
        <BookCard flex={false} book={normalBooking} {...props} />
        <BookCard flex={true} book={flexBooking} {...props} />
      </ul>
    </div>
  );
}

export default props => {
  const { room } = props;

  const [isOpen, setIsOpen] = useState(false)
  return (
    <article className="room-card">
      <div className={isOpen ? "room-card__inner-open" : "room-card__inner-closed"}>
        <figure className="room-card__thumbnail">
          <img src={`${room.images[0].absolute_filename}`} alt={room.room_title} />
        </figure>

        {isOpen ? <Open room={room} /> : <Closed room={room} />}
      </div>

      <div className="room-card__toggle" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? 'Vis mindre' : 'Vis mere'}
      </div>
    </article>
  );
};