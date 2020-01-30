const usersHandler = require('../handlers/usersHandler');

// get all the users
function getAll(req, res) {
  return usersHandler.getAll(req, res);
}

// save a new user
function save(req, res) {
  return usersHandler.save(req, res);
}

// get user by id
function getById(req, res) {
  return usersHandler.getById(req, res);
}

// delete user by id
function deleteById(req, res) {
  return usersHandler.deleteById(req, res);
}

module.exports = {
  getAll,
  getById,
  save,
  deleteById,
};
