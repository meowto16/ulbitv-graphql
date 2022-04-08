const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const cors = require('cors')
const schema = require('./schema')

const users = [
  { id: 1, username: 'Vasya', age: 20 }
]

const app = express()
app.use(cors())

const root = {
  getAllUsers: () => {
    return users
  },
  getUser: ({ id }) => {
    return users.find(user => user.id === id)
  },
  createUser: ({ input }) => {
    const user = (() => {
      const id = Date.now()

      return {
        id,
        ...input
      }
    })()
    users.push(user)

    return user
  }
}

app.use('/graphql', graphqlHTTP({
  graphiql: true,
  schema,
  rootValue: root,
}))

app.listen(4500, () => console.log(`Server started on http://localhost:4500`))