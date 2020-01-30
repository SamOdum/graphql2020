const db = require('../utils/dbConfig');

/* Initialize db queries object */
const queries = {
  getAllUsers: 'SELECT * FROM users',
  postUser: 'INSERT INTO users(first_name, last_name, email, phone, city, country ) VALUES ($1, $2, $3, $4, $5, $6) returning *',
  getOneUser: 'SELECT * FROM users WHERE user_id = $1',
};

/* Validation function */
function validateUser(user) {
  if (!(user.firstName || user.lastName)) {
    throw new Error("User's full name is required");
  }
  return user;
}

/* get all users */
async function getAll(req, res) {
  try {
    const { rows } = await db.query(queries.getAllUsers);
    if (!rows[0]) {
      return res.status(200).json({ status: 'success', message: 'There are no users yet' });
    }
    return res.status(200).json({ rows });
  } catch (error) {
    return res.status(400).send({ status: 'error', message: error });
  }
}

/* save a new user */
async function save(req, res) {
  const validEntry = validateUser(req.body);
  const {
    firstName, lastName, email, phone, city, country,
  } = req.body;
  try {
    const values = [firstName, lastName, email, phone, city, country];
    if (validEntry) {
      const { rows } = await db.query(queries.postUser, values);
      return res.status(201).json({
        status: 'success', message: `User account for ${rows[0].first_name} successfully created`,
      });
    }
    return res.status(400).send({ status: 'error', message: 'Something went wrong' });
  } catch (error) {
    return res.status(400).send({ status: 'error', message: error });
  }
}

/* get user by id */
async function getById(req, res) {
  const { id } = req.params;
  try {
    const { rows } = await db.query(queries.getAllUsers);
    const foundUser = await rows.filter((user) => user.user_id === id);
    if (foundUser[0].length === 0) {
      throw new Error(`User with id: ${id} not found`);
    }
    return res.status(200).json({ status: 'success', message: `${foundUser[0].first_name} ${foundUser[0].last_name} is the user with Id ${id}`, payload: foundUser });
  } catch (error) {
    return res.status(400).send({ status: 'error', message: error });
  }
}

/* delete user by id */
async function deleteById(req, res) {
  const { id } = req.params;
  try {
    const { rows } = await db.query(queries.getAllUsers);
    const userIndex = await rows.findIndex((user) => user.user_id === id);
    if (userIndex === -1) {
      throw new Error('The user you seek does not exist');
    }
    rows.splice(userIndex, userIndex + 1);
    return res.status(200).json({ status: 'success', message: `User with ${id} successfully deleted` });
  } catch (error) {
    return res.status(400).send({ status: 'error', message: error });
  }
}

module.exports = {
  getAll,
  save,
  getById,
  deleteById,
};
