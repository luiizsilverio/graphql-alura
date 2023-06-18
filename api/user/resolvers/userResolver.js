
const userResolver = {
    Query: {
        users: (root, args, { dataSources }, info) => dataSources.usersAPI.getUsers(),
        user: (root, { id },{ dataSources }) => dataSources.usersAPI.getUserById(id)
    }
};

module.exports = userResolver;
