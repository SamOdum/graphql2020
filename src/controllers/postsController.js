const express = require('express');
const postsService = require('../service/postsService');

const router = express.Router();
/* GET /posts - get list of all posts. */
router.get('/', (req, res) => res.json(postsService.getAll()));

/* GET /posts/:id - get post by postId */
router.get('/:id', (req, res) => {
  const postId = req.params.id;
  return res.json(postsService.getById(postId));
});

/* POST /posts - create a new post and add in db */
router.post('/', (req, res) => {
  const newPost = req.body;
  return res.json(postsService.save(newPost));
});

/* DELETE /posts/:id - delete an existing post with id */
router.delete('/:id', (req, res) => {
  const postId = req.params.id;
  return res.json(postsService.deleteById(postId)); // todo convert to do
});

module.exports = router;
