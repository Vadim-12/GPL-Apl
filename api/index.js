const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const cors = require('cors')
const schema = require('./schema')

const PORT = 5000
const users = [
	{id: 1, username: 'Petya', age: 12},
	{id: 2, username: 'Olya', age: 22}
]

const app = express()
app.use(cors())


function buildUser(input) {
	const id = Date.now()
	return {
		id, ...input
	}
}
const root = {
	getAllUsers: () => {
		return users
	},
	getUser: ({id}) => {
		return users.find(user => user.id == id)
	},
	createUser: ({input}) => {
		const user = buildUser(input)
		users.push(user)
		return user
	}
}

app.use('/graphql', graphqlHTTP({
	graphiql: true,
	schema,
	rootValue: root
}))

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))

exports.module = {}