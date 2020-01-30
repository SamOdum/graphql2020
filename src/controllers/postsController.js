const postsRepository = require('../repository/postsRepository');
// get all the posts
function getAll(req, res) {
  return postsRepository.getAll(req, res);
}

// save a new post
function save(req, res) {
  return postsRepository.save(req, res);
}

// get post by id
function getById(req, res) {
  return postsRepository.getById(req, res);
}

// delete post by id
function deleteById(req, res) {
  return postsRepository.deleteById(req, res);
}

module.exports = {
  getAll,
  getById,
  save,
  deleteById,
};
