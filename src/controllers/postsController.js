const postsHandler = require('../handlers/postsHandler');
// get all the posts
function getAll(req, res) {
  return postsHandler.getAll(req, res);
}

// save a new post
function save(req, res) {
  return postsHandler.save(req, res);
}

// get post by id
function getById(req, res) {
  return postsHandler.getById(req, res);
}

// delete post by id
function deleteById(req, res) {
  return postsHandler.deleteById(req, res);
}

module.exports = {
  getAll,
  getById,
  save,
  deleteById,
};
