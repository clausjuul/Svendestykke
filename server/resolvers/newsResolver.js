
export default {
    Query: {
        news: async (_, __, { dataSources }) => {
            return await dataSources.api.news()
        },
        
        newsById: async (_, {id}, { dataSources }) => {
            return await dataSources.api.newsById(id);
        }
    }
};
