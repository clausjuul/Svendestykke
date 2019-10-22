import gql from 'graphql-tag';

export default gql`

  extend type Query {
    countries: [Country]
    countryById(id: String): Country
  }

  type Country {
    id: String
    name: String
    description: String
    image_id: String
    filename: String
    absolute_filename: String
    cities: [City]
  }
`;
