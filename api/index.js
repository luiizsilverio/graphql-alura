// import { ApolloServer } from "apollo-server";
// import { userSchema } from "./user/schema/user.graphql";
const { ApolloServer } = require("apollo-server");
const userSchema = require("./user/schema/user.graphql");
const userResolver = require("./user/resolvers/userResolver");
const UsersAPI = require("./user/datasource/user");

const server = new ApolloServer({ 
    typeDefs: [userSchema], 
    resolvers: [userResolver],
    dataSources: () => {
        return {
            usersAPI: new UsersAPI()
        }
    }
});

server.listen({port: 4000}).then(() => 
    console.log(`Servidor rodando na porta 4000`)
)