import React, { useState, useEffect, useContext } from "react";
import { useQuery } from 'react-apollo-hooks';
import gql from "graphql-tag";

import Context from "context/context";
import Card from 'components/Card/Card';

import './homePage.scss';
const GET_NEWS = gql`
  query news {
    news {
      id
      title
      teaser
      filename
      absolute_filename
    }
  }
`;
const GET_ROOMS = gql`
  query rooms {
    rooms {
      id
      title
      description
      images{
        id
        absolute_filename
      }
    }
  }
`;
const HomePage = (props) => {

  const context = useContext(Context);
  
  const [news, setNews] = useState(null)
  const [rooms, setRooms] = useState(null)
  const { error: newsError, data: newsData } = useQuery(GET_NEWS, { suspend: true });
  const { error: roomsError, data: roomsData } = useQuery(GET_ROOMS, { suspend: true });
  
  useEffect(() => {
    const sideInfo = ["Forside", false, true];
    context.setSideInfo(sideInfo);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if(newsData.news) {
      setNews(newsData.news.slice(0, 3));
    }
  }, [newsData])

  useEffect(() => {
    if(roomsData.rooms) {
      setRooms(roomsData.rooms.slice(0, 3));
    }
  }, [roomsData])

  return (
    <>
      <section className="home">
        {newsError && <div className="error">{newsError.message}</div>}
        {roomsError && <div className="error">{roomsError.message}</div>}
        <section className="news">
          <h2 className="news__title">Se vores nyheder</h2>
          {news && news.map(news => (
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
          {rooms && rooms.map(room => (
            <Card
              key={`news-${room.id}`}
              title={room.title}
              content={room.description}
              image={room.images[0].absolute_filename}
            />
          ))}
        </section>
      </section>
    </>
  );
};
export default HomePage;
