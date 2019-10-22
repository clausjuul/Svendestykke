import React from "react";

import Hero from 'components/Hero/Hero';
import Card from 'components/Card/Card';
import './homePage.scss';

const RoomsPage = (props) => {

  return (
    <>
      <Hero title={"Forside"} />
      <section className="home">
        <section className="news">
          <h2 className="news__title">Se vores nyheder</h2>
          {newsData &&
            newsData.news &&
            newsData.news.map(news => (
              <Card
                key={`news-${news.id}`}
                title={news.title}
                content={news.teaser}
                image={news.absolute_filename}
              />
            ))}
        </section>

        <hr className="divider" />

        <section className="highlighted-rooms">
          <h2 className="highlighted-rooms__title">Se udvalgte værelser</h2>
          {roomsData &&
            roomsData.rooms &&
            roomsData.rooms.map(room => (
              <Card
                key={`news-${room.id}`}
                title={room.title}
                content={room.description}
                image={room.images[0].absolute_filename}
              />
            ))
          }
        </section>
      </section>
    </>
  );
};
export default RoomsPage;
