const bcrypt = require('bcrypt');
const supabase = require("./supabase");
const nodemailer = require('nodemailer');


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
  
      // Generate a 6-digit verification code
      const verificationCode = Math.floor(100000 + Math.random() * 900000);
  
      // Set the verification expiration timestamp (e.g., 24 hours from now)
      const verificationExpiration = new Date(timestamp + 24 * 60 * 60 * 1000); // 24 hours in milliseconds
  
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
  
      const currentTime = new Date();
      const options = { timeZone: 'Asia/Jakarta', hour12: false };
  
      const userData = {
        id: id,
        username: req.body.username,
        email: email,
        password: hashedPassword,
        verification_code: verificationCode,
        verification_expired: verificationExpiration,
        create: currentTime.toLocaleString('en-ID', options),
        update: currentTime.toLocaleString('en-ID', options),
      };

      const emailSent = await sendVerificationEmail(email, verificationCode);
      console.log(emailSent);

      if (!emailSent) {
        return res.status(500).send({ status: 'Error', message: 'Failed to send verification email' });
      }

      const { error } = await supabase.from('user').insert([userData]);
  
      if (error) {
        res.status(500).send(error);
      } else {
        res.status(201).send({ status: 'Success', message: 'User created!' });
      }
    } catch (error) {
      console.error('Error creating user:', error.message);
      res.status(500).send({ status: 'Error', message: error.message });
    }
  };



// Function to send a verification email
const sendVerificationEmail = async (toEmail, verificationCode) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'fajrulichsan0208@gmail.com', // replace with your email
      pass: 'zvbv qrcw ifbr pagx', // replace with your email password
    },
  });

  const mailOptions = {
    from: 'fajrulichsan0208@gmail.com', // replace with your email
    to: toEmail,
    subject: 'Verification Code',
    text: `Your verification code is: ${verificationCode}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return true; // Email sent successfully
  } catch (error) {
    console.log(error);
    console.error('Error sending verification email:', error.message);
    return false; // Failed to send email
  }
};



module.exports = {
    createUser
}