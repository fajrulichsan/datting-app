const { createClient } = require("@supabase/supabase-js");
const bcrypt = require('bcrypt');
const supabase = require("./supabase");

// Fetch all foods
const getAllFoods = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('food')
      .select('*');
    if (error) {
      res.status(500).send(error);
    } else {
      res.status(200).send(data);
    }
  } catch (error) {
    console.error('Error fetching foods:', error.message);
    res.status(500).send(error.message);
  }
};

// Fetch a food by ID
const getFoodById = async (req, res) => {
    try {
      const { data, error } = await supabase
        .from('food')
        .select('*')
        .eq('id', req.params.id);
      if (error) {
        console.error('Error fetching food:', error.message);
        res.status(500).send(error.message);
      } else {
        if (data && data.length > 0) {
          res.status(200).send(data);
        } else {
          res.status(404).send({ status: 'Error', message: "Food not found" });
        }
      }
    } catch (error) {
      console.error('Error fetching food:', error.message);
      res.status(500).send(error.message);
    }
  };

// Create a new food
const createFood = async (req, res) => {
  try {
    const timestamp = new Date().getTime(); // Get current timestamp
    const id = timestamp.toString(); // Extract the first 8 digits

    const currentTime = new Date();
    const options = { timeZone: 'Asia/Jakarta', hour12: false };

    const foodData = {
      id: id,
      name: req.body.name,
      price: req.body.price,
      create: currentTime.toLocaleString('en-ID', options),
      update: currentTime.toLocaleString('en-ID', options),
    };

    const { error } = await supabase
      .from('food')
      .insert([foodData]);

    if (error) {
      res.status(500).send(error);
    } else {
      res.status(201).send({ status: "Success", message: "Food created!" });
    }
  } catch (error) {
    console.error('Error creating food:', error.message);
    res.status(500).send(error.message);
  }
};

// Delete a food by ID
const deleteFood = async (req, res) => {
  try {
    const { error } = await supabase
      .from('food')
      .delete()
      .eq('id', req.params.id);
    if (error) {
      res.status(500).send(error);
    } else {
      res.status(200).send({ status: "Success", message: "Food deleted!" });
    }
  } catch (error) {
    console.error('Error deleting food:', error.message);
    res.status(500).send(error.message);
  }
};

module.exports = {
  getAllFoods,
  getFoodById,
  createFood,
  deleteFood,
};
