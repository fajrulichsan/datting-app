const bcrypt = require('bcrypt');
const supabase = require("./supabase");

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the email is registered
    const { data: userData, error: emailError } = await supabase
      .from('user')
      .select('id, email, password, is_verification')
      .eq('email', email)
      .single();

    if (emailError) {
      console.error('Error checking email:', emailError.message);
      return res.status(500).send({ status: 'Error', message: 'Internal server error' });
    }

    if (!userData) {
      return res.status(404).send({ status: 'Error', message: 'Email not registered' });
    }

    const { id, is_verification, password: hashedPassword } = userData;

    // Check if the account has been verified
    if (!is_verification) {
      return res.status(401).send({ status: 'Error', message: 'The account has not been verified' });
    }

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, hashedPassword);

    if (!isPasswordValid) {
      return res.status(401).send({ status: 'Error', message: 'Incorrect password' });
    }

    // Return user ID if email and password are correct
    res.status(200).send({ status: 'Success', message: 'Login successful', userId: id });

  } catch (error) {
    console.error('Error during login:', error.message);
    res.status(500).send({ status: 'Error', message: 'Internal server error' });
  }
};


module.exports = {
  loginUser,
};
