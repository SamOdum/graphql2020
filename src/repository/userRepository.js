const db = require('../utils/dbConfig');

const usersData = [{
  id: 1,
  firstName: 'Sam',
  lastName: 'Odum',
  city: 'Calabar',
  country: 'Nigeria',
  dateJoined: '2020-01-12',
  interest: 'tech',
}];

// Initialize db queries object
const queries = {
  getAll: 'SELECT * FROM users',
};
function validateUser(user) {
  if (!(user.firstName && user.lastName)) {
    throw new Error("User's full naame is required");
  }
}
// get all users
async function getAll(req, res) {
  /* return usersData; */
  try {
    const { rows } = await db.query(queries.getAll);
    if (!rows[0]) {
      return res.status(200).json({ message: 'There are no users yet' });
    }
    return res.status(200).json({ rows });
  } catch (error) {
    return res.status(400).send({ status: 'error', error });
  }
}
// save a new user
function save(user) {
  validateUser(user);
  const newUser = user;
  const lastUser = usersData[usersData.length - 1] || { id: 0 };
  const lastUserId = lastUser.id;
  newUser.id = lastUserId + 1;
  usersData.push(user);
  return user;
}

// get user by id
function getById(userId) {
  const user = usersData.filter((item) => item.id === userId);
  if (user.length === 0) {
    throw new Error(`User with id: ${userId} not found`);
  }
  return user[0];
}

// delete user by id
function deleteById(userId) {
  const userIndex = usersData.findIndex((item) => item.id === userId);
  if (userIndex === -1) {
    throw new Error(`User with id: ${userId} not found`);
  }
  usersData.splice(userIndex, userIndex + 1);
  return { id: userId };
}

module.exports = {
  getAll,
  save,
  getById,
  deleteById,
};
