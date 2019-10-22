export default {
    Query: {
        rooms: async (_, __, { dataSources }) => {
            return await dataSources.api.rooms();
        },

        roomById: async (_, {id}, { dataSources }) => {
            return await dataSources.api.roomById(id)
        },

        facilitiesByRoom: async (_, {id}, { dataSources }) => {
            return await dataSources.api.facilitiesByRoom(id)
        },

        imagesByRoom: async (_, {id}, { dataSources }) => {
            return await dataSources.api.imagesByRoom(id)
        },

        roomsByHotel: async (_, {id}, { dataSources }) => {
            return await dataSources.api.roomsByHotel(id)
        },
        allImages: async (_, __, { dataSources }) => {
            return await dataSources.api.allImages()
        }
    },

    RoomsAtHotel: {
        images: async (parent, __, { dataSources }) => {
            return await dataSources.api.imagesByRoom(parent.room_id)
        },

        facilities: async (parent, __, { dataSources }) => {
            return await dataSources.api.facilitiesByRoom(parent.room_id)
        },
    },

    Room: {
        images: async (parent, __, { dataSources }) => {
            const data = await dataSources.api.roomById(parent.id)
            return data.images
        }
    }
};
