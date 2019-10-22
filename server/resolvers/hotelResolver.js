

export default {
  Query: {
    hotels: async (_, __, { dataSources }) => {
      const data = await dataSources.api.hotels();
      return data;
    },

    hotelById: async (_, { id }, { dataSources }) => {
      const data = await dataSources.api.hotelById(id);
      return data;
    },

    hotelsByCity: async (_, { id }, { dataSources }) => {
      const data = await dataSources.api.hotelsByCity(id);
      return data;
    },

    facilitiesByHotel: async (_, { id }, { dataSources }) => {
      const data = await dataSources.api.facilitiesByHotel(id);
      return data;
    }
},

    Hotel: {
    rooms: async (parent, __, { dataSources }) => {
        const data = await dataSources.api.roomsByHotel(parent.id);
        return data;
    },

    likes: async (parent, _, { models }) =>
        await models.Like.find({
            hotelId: parent.id
        })
    }
};