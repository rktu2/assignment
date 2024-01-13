const express  = require('express');
const router  = express.Router();
const { v4: uuidv4 } = require('uuid');


// In-memory database 
let users = [];

// get all users
const allUsers  =  (req, res) =>{
    res.status(200).json(users);
};

// GET user by ID
const getUserByID  =  (req, res) => {
    const userId = req.params.userId;
    const user = users.find((u) => u.id === userId);
    if (user) {
      res.status(200).json(user);
    } else if (!isValidUUID(userId)) {
      res.status(400).json({ message: 'Invalid userId format' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  };


  // POST create user
const createUser = (req, res) => {

  const { username, age, hobbies } = req.body;
  if (!username || !age) {
    res.status(400).json({ message: 'Username and age are required fields' });
  } else {
    const newUser = {
      id: uuidv4(),
      username,
      age,
      hobbies: hobbies || [],
    };

     users.push(newUser);
    res.status(201).json(newUser);
  }
};

// PUT update user by ID
const UpdateUser = (req, res) => {
  const userId = req.params.userId;
  const { username, age, hobbies } = req.body;
  const userIndex = users.findIndex((u) => u.id === userId);

  if (userIndex !== -1) {
    users[userIndex] = {
      id: userId,
      username: username || users[userIndex].username,
      age: age || users[userIndex].age,
      hobbies: hobbies || users[userIndex].hobbies,
    };
    res.status(200).json(users[userIndex]);
  } else if (!isValidUUID(userId)) {
    res.status(400).json({ message: 'Invalid userId format' });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

// DELETE user by ID
const deleteUser  = (req, res) => {
  const userId = req.params.userId;
  const userIndex = users.findIndex((u) => u.id === userId);

  if (userIndex !== -1) {
    users.splice(userIndex, 1);
    res.status(204).end();
  } else if (!isValidUUID(userId)) {
    res.status(400).json({ message: 'Invalid userId format' });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};


//validate UUID format
function isValidUUID(uuid) {
  const uuidRegex =
    /^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i;
  return uuidRegex.test(uuid);
}

module.exports  = {
  allUsers,
  getUserByID,
  createUser,
  UpdateUser,
  deleteUser

}
