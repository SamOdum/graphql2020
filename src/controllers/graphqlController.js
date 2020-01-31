const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');
const db = require('../utils/dbConfig');

/* Construct schema using GSDL */
const schema = buildSchema(`
type Query {
  users: [User!]!
  user(user_id: ID!): User!
  posts: [Post!]!
  post(post_id: ID!): Post
}

type Mutation {
  createUser(name: String!): User!
  updateUser(id: ID!, name: String!): User
  deleteUser(id: ID!): User
}

type User {
  user_id: String!
  first_name: String!
  last_name: String!
  email: String!
  phone: String!
  city: String!
  country: String!
  date_joined: String!
  Posts: [Post]!
}

type Post {
  post_id: ID!
  title: String!
  body: String!
  created: String!
  Author: User

}

`);

/* Contruct schema query resolvers */
const root = {
  users: async () => db.query('SELECT * FROM users').then((data) => data.rows),
  user: async (parent, args) => {
    const id = parent.user_id || args.user_id;
    const { rows } = await db.query(`SELECT * FROM users WHERE ${id} = $1`, [id]);
    return rows[0];
  },
  posts: () => db.query('SELECT * FROM posts').then((data) => data.rows),
  post: async (parent, args) => {
    const id = parent.post_id || args.post_id;
    const { rows } = await db.query(`SELECT * FROM posts WHERE ${id} = $1`, [id]);
    return rows[0];
  },
};

/* Initialize route resolver object */
const graphql = graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true,
});

module.exports = graphql;
