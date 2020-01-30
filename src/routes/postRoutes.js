const express = require('express');
const postsController = require('../controllers/postsController');

const router = express.Router();
/* GET /posts - get list of all posts. */
router.get('/', (req, res) => res.json(postsController.getAll()));

/* GET /posts/:id - get post by postId */
router.get('/:id', (req, res) => {
  const postId = req.params.id;
  return res.json(postsController.getById(postId));
});

/* POST /posts - create a new post and add in db */
router.post('/', (req, res) => {
  const newPost = req.body;
  return res.json(postsController.save(newPost));
});

/* DELETE /posts/:id - delete an existing post with id */
router.delete('/:id', (req, res) => {
  const postId = req.params.id;
  return res.json(postsController.deleteById(postId)); // todo convert to do
});

module.exports = router;
