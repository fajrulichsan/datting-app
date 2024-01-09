const { createClient } = require("@supabase/supabase-js");
const bcrypt = require('bcrypt');
const supabase = require("./supabase")

// Replace with your actual Supabase URL and API key

// Fetch all users
const getAllUsers = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('user')
      .select('*');
    if (error) {
      res.status(500).send(error);
    } else {
      res.status(200).send(data);
    }
  } catch (error) {
    console.error('Error fetching users:', error.message);
    res.status(500).send(error.message);
  }
};

// Fetch a user by ID
const getUserById = async (req, res) => {
    try {
      const { data, error } = await supabase
        .from('user')
        .select('*')
        .eq('id', req.params.id);
      if (error) {
        console.error('Error fetching user:', error.message);
        res.status(500).send(error.message);
      } else {
        if (data && data.length > 0) {
          res.status(200).send(data);
        } else {
          res.status(404).send({status : 'Error' , message : "User not found"});
        }
      }
    } catch (error) {
      console.error('Error fetching user:', error.message);
      res.status(500).send(error.message);
    }
  };


const createUser = async (req, res) => {
    try {
      const { email } = req.body;
  
      // Check if the email is already registered
      const { data: existingUser, error: emailError } = await supabase
        .from('user')
        .select('id')
        .eq('email', email);
  
      if (emailError) {
        console.error('Error checking email:', emailError.message);
        return res.status(500).send({ status: 'Error', message: 'Internal server error' });
      }
  
      if (existingUser && existingUser.length > 0) {
        return res.status(400).send({ status: 'Error', message: 'Email already registered' });
      }
  
      // Continue with user registration if email is not registered
      const timestamp = new Date().getTime();
      const id = timestamp.toString();
  
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
  
      const currentTime = new Date();
      const options = { timeZone: 'Asia/Jakarta', hour12: false };
  
      const userData = {
        id: id,
        username: req.body.username,
        email: email,
        password: hashedPassword,
        create: currentTime.toLocaleString('en-ID', options),
        update: currentTime.toLocaleString('en-ID', options),
      };
  
      const { error } = await supabase
        .from('user')
        .insert([userData]);
  
      if (error) {
        res.status(500).send(error);
      } else {
        res.status(201).send({ status: "Success", message: "User created!" });
      }
    } catch (error) {
      console.error('Error creating user:', error.message);
      res.status(500).send({ status: 'Error', message: error.message });
    }
  };


// Delete a user by ID
const deleteUser = async (req, res) => {
  try {
    const { error } = await supabase
      .from('user')
      .delete()
      .eq('id', req.params.id);
    if (error) {
      res.status(500).send(error);
    } else {
      res.status(200).send({status : "Success", message : "User deleted!"});
    }
  } catch (error) {
    console.error('Error deleting user:', error.message);
    res.status(500).send(error.message);
  }
};

const getCoinAndDiamond = async (req, res) => {
  try {
    const userId = req.params.userId; // Assuming you are passing userId as a parameter

    // Fetch data based on userId
    const { data, error } = await supabase
      .from('user')
      .select("*")
      .eq('id', userId)
      .single(); // Assuming you expect only one record for a specific userId

    if (error) {
      throw new Error(error.message);
    }

    console.log(data);
    if (!data) {
      res.status(404).json({ message: 'Data not found for the specified userId' });
      return;
    }

    // Data found, send it as a JSON response
    res.status(200).json({status : "Success" , data : { coin : data.coin , diamond : data.diamond} });
  } catch (error) {
    console.error('Error getting coin and diamond:', error.message);
    res.status(500).send(error.message);
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  deleteUser,
  getCoinAndDiamond
};
