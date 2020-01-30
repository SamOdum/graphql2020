const usersRepository = require('../repository/userRepository');

// get all the users
function getAll(req, res) {
  return usersRepository.getAll(req, res);
}

// save a new user
function save(req, res) {
  return usersRepository.save(req, res);
}

// get user by id
function getById(req, res) {
  return usersRepository.getById(req, res);
}

// delete user by id
function deleteById(userId) {
  return usersRepository.deleteById(parseInt(userId, 10));
}

module.exports = {
  getAll,
  getById,
  save,
  deleteById,
};
