const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        const { first_name, last_name, email, password } = req.body;
        // Validate input
        if (!(email && password && first_name && last_name)) {
            return res.status(400).send('All input is required');
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).send('User Already Exist. Please Login');
        }

        const user = await User.create({
            first_name,
            last_name,
            email: email.toLowerCase(),
            password: password,
        });

        const token = jwt.sign({ user_id: user._id, email }, process.env.TOKEN_KEY, { expiresIn: '2h' });
        user.token = token;

        res.status(201).json(user);
    } catch (error) {
        res.status(500).send(error.message);
    }
};
exports.login = async (req, res) => {
    try {
        // Get user input
        const { email, password } = req.body;

        // Validate user input
        if (!(email && password)) {
            return res.status(400).send("All input is required");
        }

        // Validate if user exists in our database
        const user = await User.findOne({ email });

        if (user && (await password == password)) {
            // Create token
            const token = jwt.sign(
                { user_id: user._id, email },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "2h",
                }
            );

            // Save user token
            user.token = token;

            // Respond with user and token
            return res.status(200).json(user);
        }

        return res.status(400).send("Invalid Credentials");
    } catch (err) {
        console.log(err);
        return res.status(500).send("Server Error");
    }
};
