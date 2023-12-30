const { createClient } = require("@supabase/supabase-js");
const bcrypt = require('bcrypt');

// Replace with your actual Supabase URL and API key
const supabase = createClient('https://qaytugbcusqrhmaqwpsu.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFheXR1Z2JjdXNxcmhtYXF3cHN1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDM5MjM2NjAsImV4cCI6MjAxOTQ5OTY2MH0.9WT7yoCXARLpZX2IBhLEIWuw4MsHrhvgz6m61omQxhE');

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

// Create a new user
  const createUser = async (req, res) => {
    try {
      const timestamp = new Date().getTime(); // Get current timestamp
      const id = timestamp.toString(); // Extract the first 8 digits
  
      // Hash the password before storing it
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
  
      const currentTime = new Date();
      const options = { timeZone: 'Asia/Jakarta', hour12: false };
  
      const userData = {
        id: id,
        username: req.body.username,
        email: req.body.email,
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
      res.status(500).send(error.message);
    }
  };
  
  

// // Update a user by ID
// const updateUser = async (req, res) => {
//   try {
//     const { error } = await supabase
//       .from('user')
//       .update({
//         username: req.body.username,
//         email: req.body.email,
//         // Update other user properties as needed
//       })
//       .eq('id', req.params.id);
//     if (error) {
//       res.status(500).send(error);
//     } else {
//       res.status(200).send("User updated!");
//     }
//   } catch (error) {
//     console.error('Error updating user:', error.message);
//     res.status(500).send(error.message);
//   }
// };

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

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
//   updateUser,
  deleteUser,
};