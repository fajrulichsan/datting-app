const supabase = require("./supabase");

const verification = async (req, res) => {
    try {
        // Check if the email is registered
        const { data: userData, error: userError } = await supabase
            .from('user')
            .select('*')
            .eq('email', req.body.email);

        if (userError) {
            console.error('Error checking user:', userError.message);
            return res.status(500).send({ status: 'Error', message: userError.message });
        }

        if (!userData || userData.length === 0) {
            // Email not registered
            return res.status(404).send({ status: 'Error', message: 'Email not registered.' });
        }

        // Check if the verification code is correct
        const user = userData[0];
        if (user.verification_code != req.body.verificationCode) {
            return res.status(400).send({ status: 'Error', message: 'Incorrect verification code.' });
        }

        // Update the user's verification status
        const { data: updateData, error: updateError } = await supabase
            .from('user')
            .update({ is_verification: true })
            .eq('id', user.id);

        if (updateError) {
            console.error('Error updating user verification status:', updateError.message);
            return res.status(500).send({ status: 'Error', message: updateError.message });
        }

        res.status(200).send({ status: 'Success', message: 'Email verified successfully.' });

    } catch (error) {
        console.error('Error verifying email:', error.message);
        res.status(500).send({ status: 'Error', message: error.message });
    }
};

module.exports = {
    verification,
};
