const { RESTDataSource } = require('apollo-datasource-rest');

class UsersAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'http://localhost:3000';
    }

    async getUsers() {
        const users = await this.get('/users');
        return users.map(async (user) => ({
            id: user.id,
            nome: user.nome,
            email: user.email,
            ativo: user.ativo,
            role: await this.get(`/roles/${user.role}`)
        }))
    }

    async getUserById(id) {
        const user = await this.get(`/users/${id}`);
        user.role = await this.get(`/roles/${user.role}`)
        return user
    }

    async addUser(data) {
        data.user.id = Date.now();
        data.user.createdAt = data.createdAt;

        const role = await this.get(`/roles?type=${data.user.role}`)

        await this.post('users', {
            ...data.user,
            role: role[0].id,
        })

        return ({
            ...data.user,
            role: role[0]
        })
    }

    async updateUser (data) {
        const role = await this.get(`/roles?type=${data.user.role}`)

        // a diferença entre put e patch é que put sobrepõe todos os campos,
        // enquanto patch sobrepõe somente os campos informados.
        await this.patch(`users/${data.id}`, {
            ...data.user,
            role: role[0].id
        })

        return ({
            ...data.user,
            role: role[0]
        })
    }

    async deleteUser (id) {
        await this.delete(`users/${id}`);
        return id
    }
}

module.exports = UsersAPI;
