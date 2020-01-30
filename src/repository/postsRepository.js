const db = require('../utils/dbConfig');

const postsData = [{
  id: 1,
  createdOn: '2020-01-05',
  tags: ['tech', 'coding', 'beginner', 'graphql,'],
  title: 'The first post in a long line of posts',
  body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda aspernatur porro error? Reiciendis autem possimus, quidem officiis nisi cumque libero voluptas? Iure ducimus id impedit deserunt sunt recusandae officiis magnam?Nemo neque corrupti itaque excepturi soluta illo ad laudantium, esse magni voluptas blanditiis ea nihil expedita eligendi eveniet atque veniam nam harum maxime accusantium temporibus fugiat quaerat. Et, eos adipisci.',
}];

/* Initialize db queries object */
const queries = {
  getAllPosts: 'SELECT * FROM posts',
  postOne: 'INSERT INTO users(user_id, tags, title, body ) VALUES ($1, $2, $3, $4) returning *',
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
    return res.status(400).send({ status: 'error', message: error });
  }
}

// save a new post
function save(post) {
  validatePost(post);
  const newPost = post;
  const lastPost = postsData[postsData.length - 1] || { id: 0 };
  const lastPostId = lastPost.id;
  newPost.id = lastPostId + 1;
  postsData.push(post);
  return post;
}

// get post by id
function getById(postId) {
  const post = postsData.filter((item) => item.id === postId);
  if (post.length === 0) {
    throw new Error(`Post id: ${postId} not found`);
  }
  return post[0];
}

// delete post by id
function deleteById(postId) {
  const postIndex = postsData.findIndex((item) => item.id === postId);
  if (postIndex === -1) {
    throw new Error(`Post id: ${postId} not found`);
  }
  postsData.splice(postIndex, postIndex + 1);
  return { id: postId };
}

module.exports = {
  getAll,
  save,
  getById,
  deleteById,
};
