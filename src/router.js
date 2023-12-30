const express = require("express");
const userController = require("./controller/userController");
const foodController = require("./controller/foodController");
const loginController = require("./controller/loginController");
const signupController = require("./controller/signupController");
const router = express.Router();

// user table
router.get('/users', userController.getAllUsers);
router.get('/users/:id', userController.getUserById);
router.post('/users', userController.createUser);
// router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);

// food table
router.get('/foods', foodController.getAllFoods);
router.get('/foods/:id', foodController.getFoodById);
router.post('/foods', foodController.createFood);
router.delete('/foods/:id', foodController.deleteFood);

// api login
router.post('/login', loginController.loginUser);
router.post('/sign-up', signupController.createUser);

module.exports = router;
