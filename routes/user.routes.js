const express = require('express');
const User = require('../models/user.model.js');
const routes = express.Router();
const bcrypt = require('bcrypt');
routes.use(express.json());

routes.post('/createUser', async (req, res) => {
    try{
        const payload = req.body;
        if(!payload.password){
         return res.status(400).send({message: "password is Required"})
        }
        const hashedValue = await bcrypt.hash(payload.password, 15);
        payload.userhashedPassword = hashedValue;
        delete payload.password;
        const newUser = new User(payload);
        newUser.save().then((data) => {
           res.status(201).send({message: 'User Has Been Created Successfully...'});
        }).catch((error) => {
          res.status(400).send({message: 'Error While Register User...'});
        });
    }catch(error){
      res.status(500).send({message: 'Internal Server Error...'});
    }
});

module.exports = routes;