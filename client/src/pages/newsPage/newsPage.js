import React from "react";
 import { Link } from "react-router-dom";
import { useQuery } from 'react-apollo-hooks';
import gql from "graphql-tag";

import Card from 'components/Card/Card';
import './newsPage.scss';

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

const NewsPage = (props) => {
  const { location } = props;
  const { error, data } = useQuery(GET_NEWS, { suspend: true });
  
  return (
    <>
      <section className="news-archive">
        {error && <div className="error">{error.message}</div>}
          <h2 className="news-archive__title">Nyhedsarkiv</h2>
          {data &&
            data.news &&
            data.news.map(news => (
              <Link to={`/${location.pathname}/${news.title}-${news.id}`}>
                <Card
                  key={`news-${news.id}`}
                  title={news.title}
                  content={news.teaser}
                  image={news.absolute_filename}
                />
              </Link>
            ))
          }
      </section>
    </>
  );
};
export default NewsPage;
