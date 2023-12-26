require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./database/connect.js');
db();
const User = require('./routes/user.routes.js');
const Exist = require('./routes/rest-pass.js');
const Forget = require('./routes/pass-reset.js');
const Login = require('../Backend/routes/login.js');
const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT;
app.listen(PORT, ()=>{
    console.log(`Server Running In A ${PORT} PORT`)
});

app.use(User);
app.use(Login);
app.use(Exist);
app.use(Forget);