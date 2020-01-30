const usersRepository = require('../repository/userRepository');

// get all the users
function getAll(req, res) {
  return usersRepository.getAll(req, res);
}

// save a new user
function save(newUser) {
  return usersRepository.save(newUser);
}

// get user by id
function getById(userId) {
  return usersRepository.getById(parseInt(userId, 10));
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
