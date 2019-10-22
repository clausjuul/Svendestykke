import gql from 'graphql-tag';

export default gql`

  extend type Query {
    cities: [City]
    cityById(id: String): City
    citiesByCountry(id: String): [City]
  }

  type City {
    id: String
    name: String
    description: String
    image_id: String
    country_id: String
    country_name: String
    filename: String
    absolute_filename: String
    hotels: [Hotel]
  }
`;
