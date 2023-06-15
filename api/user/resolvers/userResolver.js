const arrayUsers = [
    {
        nome: "Ana",
        ativo: true
    },
    {
        nome: "Marcia",
        ativo: false
    }
]

const userResolver = {
    Query: {
        users: () => arrayUsers,
        user: () => arrayUsers[0]
    }
};

module.exports = userResolver;
