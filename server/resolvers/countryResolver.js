
export default {
    Query: {
        countries: async (_, __, { dataSources }) => {
            return await dataSources.api.countries();
        },
        
        countryById: async (_, {id}, { dataSources }) => {
            return await dataSources.api.countryById(id)
        }
    },
    
    Country: {
        cities: async (parent, __, { dataSources }) => {
            return await dataSources.api.citiesByCountry(parent.id)
        }
    }
};
