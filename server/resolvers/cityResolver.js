
export default {
  Query: {
    cities: async (_, __, { dataSources }) => {
      return await dataSources.api.cities();
    },

    cityById: async (_, { id }, { dataSources }) => {
      return await dataSources.api.cityById(id);
    },

    citiesByCountry: async (_, { id }, { dataSources }) => {
      return await dataSources.api.citiesByCountry(id);
    }
  },
  
  City: {
    hotels: async (parent, __, { dataSources }) => {
      return await dataSources.api.hotelsByCity(parent.id)
    }
  }
};
