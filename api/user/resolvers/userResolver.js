
const userResolver = {
    Query: {
        users: (root, args, { dataSources }, info) => dataSources.usersAPI.getUsers(),
        user: (root, { id },{ dataSources }) => dataSources.usersAPI.getUserById(id)
    },
    Mutation: {
        addUser: async (root, user, { dataSources }) =>
            dataSources.usersAPI.addUser(user),
        updateUser: async (root, user, { dataSources }) =>
            dataSources.usersAPI.updateUser(user),
        deleteUser: async (root, { id }, { dataSources }) =>
            dataSources.usersAPI.deleteUser(id)
    }
};

module.exports = userResolver;
