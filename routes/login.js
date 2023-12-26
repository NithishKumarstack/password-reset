const express = require('express');
const User = require('../models/user.model.js');
const routes = express.Router();
const bcrypt = require('bcrypt');
routes.use(express.json());

routes.post('/login', async (req, res) => {
    try {
        const payload = req.body;
        if (!payload.password) {
            return res.status(400).send({ message: "Password is required" });
        }

        const user = await User.findOne({ email: payload.email });

        if (user) {
            const passwordMatch = await bcrypt.compare(payload.password, user.userhashedPassword);

            if (passwordMatch) {
                res.status(200).send({ message: "User can log in" });
            } else {
                res.status(401).send({ message: "Incorrect password" });
            }
        } else {
            res.status(404).send({ message: "User not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});

module.exports = routes;
