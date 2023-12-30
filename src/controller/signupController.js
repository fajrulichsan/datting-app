const bcrypt = require('bcrypt');
const supabase = require("./supabase");

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
  

module.exports = {
    createUser
}