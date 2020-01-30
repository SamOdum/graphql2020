const postsRepository = require('../repository/postsRepository');
// get all the posts
function getAll() {
  return postsRepository.getAll();
}

// save a new post
function save(newPost) {
  return postsRepository.save(newPost);
}

// get post by id
function getById(postId) {
  return postsRepository.getById(parseInt(postId, 10));
}

// delete post by id
function deleteById(postId) {
  return postsRepository.deleteById(parseInt(postId, 10));
}

module.exports = {
  getAll,
  getById,
  save,
  deleteById,
};
