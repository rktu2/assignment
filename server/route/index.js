const express  = require('express');
const router  = express.Router();
const UserCtrl  = require('../cotrollers/user');


router.get('/api/users',UserCtrl.allUsers);

router.get('/api/users/:userId',UserCtrl.getUserByID);

router.post('/api/users',UserCtrl.createUser);

router.put('/api/users/:userId',UserCtrl.UpdateUser);

router.delete('/api/users/:userId',UserCtrl.deleteUser);


module.exports = router