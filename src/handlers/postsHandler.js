const db = require('../utils/dbConfig');

/* Initialize db queries object */
const queries = {
  getAllPosts: 'SELECT * FROM posts',
  postOne: 'INSERT INTO posts(user_id, title, body, tags ) VALUES ($1, $2, $3, $4) returning *',
  getOnePost: 'SELECT * FROM posts WHERE user_id = $1',
};

/* Validation function */
function validatePost(post) {
  if (!(post.title && post.body)) {
    throw new Error('Post must have a title and a body');
  }
  return post;
}

/* get all posts */
async function getAll(req, res) {
  try {
    const { rows } = await db.query(queries.getAllPosts);
    if (!rows[0]) {
      return res.status(200).json({ status: 'success', message: 'There are no posts yet' });
    }
    return res.status(200).json({ rows });
  } catch (error) {
    return res.status(500).send({ status: 'error', message: error });
  }
}

/* save a new post */
async function save(req, res) {
  const validEntry = validatePost(req.body);
  const {
    userId, title, body, tags,
  } = req.body;
  try {
    const values = [userId, title, body, tags];
    if (validEntry) {
      const { rows } = await db.query(queries.postOne, values);
      return res.status(201).json({
        status: 'success', message: `Post about ${rows[0].title} successfully created`,
      });
    }
    return res.status(400).send({ status: 'error', message: 'Something went wrong' });
  } catch (error) {
    return res.status(500).send({ status: 'error', message: error });
  }
}

/* get Post by id */
async function getById(req, res) {
  const { id } = req.params;
  try {
    const { rows } = await db.query(queries.getAllPosts);
    const foundPost = await rows.filter((post) => post.post_id === id);
    if (foundPost[0].length === 0) {
      throw new Error(`Post with id: ${id} not found`);
    }
    return res.status(200).json({ status: 'success', message: `Found post with title ${foundPost[0].title}`, payload: { title: foundPost[0].title, body: foundPost[0].body } });
  } catch (error) {
    return res.status(400).send({ status: 'error', message: error });
  }
}

/* delete user by id */
async function deleteById(req, res) {
  const { id } = req.params;
  try {
    const { rows } = await db.query(queries.getAllUsers);
    const postIndex = await rows.findIndex((post) => post.post_id === id);
    if (postIndex === -1) {
      throw new Error('The user you seek does not exist');
    }
    rows.splice(postIndex, postIndex + 1);
    return res.status(200).json({ status: 'success', message: `Post with ${id} successfully deleted` });
  } catch (error) {
    return res.status(400).send({ status: 'error', message: error });
  }
}

module.exports = {
  getAll,
  save,
  getById,
  deleteById,
};
