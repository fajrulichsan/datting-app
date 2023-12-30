const express = require("express");
const { createClient } = require("@supabase/supabase-js");
const userController = require("./controller/userController")
const foodController = require("./controller/foodController")
const router = express.Router();

router.get('/users', userController.getAllUsers);
router.get('/users/:id', userController.getUserById);
router.post('/users', userController.createUser);
// router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);

//food
router.get('/foods', foodController.getAllFoods);
router.get('/foods/:id', foodController.getFoodById);
router.post('/foods', foodController.createFood);
router.delete('/foods/:id', foodController.deleteFood);

module.exports = router;
