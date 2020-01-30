const express = require('express');
const postsController = require('../controllers/postsController');

const router = express.Router();
/* GET /posts - get list of all posts. */
router.get('/', (req, res) => postsController.getAll(req, res));

/* GET /posts/:id - get post by postId */
router.get('/:id', (req, res) => postsController.getById(req, res));

/* POST /posts - create a new post and add in db */
router.post('/', (req, res) => postsController.save(req, res));

/* DELETE /posts/:id - delete an existing post with id */
router.delete('/:id', (req, res) => postsController.deleteById(req, res));

module.exports = router;
