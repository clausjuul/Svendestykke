import gql from 'graphql-tag';

export default gql`

  extend type Query {
    news: [News!]
    newsById(id: String): News
  }

  type News {
    id: String
    datetime: String
    title: String
    teaser: String
    content:String
    author:String
    filename: String
    absolute_filename: String
  }
`;
