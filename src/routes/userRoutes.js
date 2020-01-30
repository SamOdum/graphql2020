const { Router } = require('express');
const usersController = require('../controllers/usersController');

// Initialize express router
const router = Router();

/* GET /Users - get list of all Users. */
router.get('/', (req, res) => usersController.getAll(req, res));

/* GET /Users/:id - get User by UserId */
router.get('/:id', (req, res) => {
  const userId = req.params.id;
  return res.json(usersController.getById(userId));
});

/* POST /Users - create a new User and add in db */
router.post('/', (req, res) => {
  const newUser = req.body;
  return res.json(usersController.save(newUser));
});

/* DELETE /Users/:id - delete an existing User with id */
router.delete('/:id', (req, res) => {
  const userId = req.params.id;
  return res.json(usersController.deleteById(userId)); // todo convert to do
});

module.exports = router;
