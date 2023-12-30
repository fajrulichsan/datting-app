const bcrypt = require('bcrypt');
const supabase = require("./supabase");

// Check if email is registered and password is correct
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the email is registered
    const { data: userData, error: emailError } = await supabase
      .from('user')
      .select('id, email, password')
      .eq('email', email);

    if (emailError) {
      console.error('Error checking email:', emailError.message);
      return res.status(500).send({ status: 'Error', message: 'Internal server error' });
    }

    if (!userData || userData.length === 0) {
      return res.status(404).send({ status: 'Error', message: 'Email not registered' });
    }

    const user = userData[0];

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).send({ status: 'Error', message: 'Incorrect password' });
    }

    // Return user ID if email and password are correct
    res.status(200).send({ status: 'Success', message: 'Login successful', userId: user.id });

  } catch (error) {
    console.error('Error during login:', error.message);
    res.status(500).send({ status: 'Error', message: 'Internal server error' });
  }
};

module.exports = {
  loginUser,
};
