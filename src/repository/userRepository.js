const usersData = [{
  id: 1,
  firstName: 'Sam',
  lastName: 'Odum',
  city: 'Calabar',
  country: 'Nigeria',
  dateJoined: 12-01-2020,
  interest: 'tech',
},];
function validateUser(user) {
  if (!(user.firstName && user.lastName)) {
    throw new Error("User's full naame is required");
  }
}
// get all user
function getAll() {
  return usersData;
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
  const user = usersData.filter(item => item.id === userId);
  if (user.length === 0) {
    throw new Error(`User with id: ${userId} not found`);
  }
  return user[0];
}

// delete user by id
function deleteById(userId) {
  const userIndex = usersData.findIndex(item => item.id === userId);
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