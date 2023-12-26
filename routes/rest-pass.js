const express = require('express');
const nodeMailer = require('nodemailer')
const User = require('../models/user.model.js');
const routes = express.Router();
routes.use(express.json());

routes.post('/resetpassword',async (req, res) => {
   const { email } = req.body;

   const user = await User.findOne({email});

   if(!user){
      return  res.status(404).send({message: 'User Not Found...'})
   }

   const Token = Math.random().toString(36).slice(-8);
   user.restPasswordToken = Token;
   user.restPasswordExpries = Date.now() + 3600000;
   
   await user.save();

   const transporter = nodeMailer.createTransport({
      service: "gmail",
      auth: {
         user: "officialnithish13@gmail.com",
         pass: "pbxp gqxa zsud jujz"
      },
   });
        
   const message = {
      from: "officialnithish13@gmail.com",
      to: user.email,
      subject: "Password Reset Request",
      text: `You Are Receiving This Email Because You (or someone else) Has Requested A Password Reset For Your Account. \n\n Please Use The Follow Token To Reset Your Password: ${Token}`
   };   
   
   transporter.sendMail(message, (err,info)=>{
      if(err){
         res.status(404).send({message: "Something Went Wrong..."});
      }

      res.status(200).send({message: "Email Sent" + info.response});
   });
});

module.exports = routes;