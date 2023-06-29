const { GraphQLScalarType } = require('graphql');

const userResolver = {
    DateTime: new GraphQLScalarType({
        name: 'DateTime',
        description: 'string de data e hora no formato ISO-8601',
        serialize: (value) => value.toISOString(), // pega o dado do BD
        parseValue: (value) => new Date(value), // pega o dado de um input
        parseLiteral: (ast) => new Date(ast.value) // pega o dado de um input
    }),

    // A estrutura abaixo somente é necessária quando cada valor do Enum equivale a uma string diferente
    // RolesType: {
    //     ESTUDANTE: "ROLE-001",
    //     DOCENTE: "ROLE-002",
    //     COORDENACAO: "ROLE-003"
    // },    

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
