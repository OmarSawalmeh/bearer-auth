'use strict';

const bcrypt = require('bcrypt');
const Users = require('./auth/models/users-model');
const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Require middleware handeError
const handle404 = require('./middleware/404');
const handle500 = require('./middleware/500');

// Require middleware Router
const basic = require('./auth/middleware/basic');
const bearer = require('./auth/middleware/bearer');


app.get('/', (req, res)=>{
    res.send('Liverpool');
});

app.post('/signup', async (req, res)=>{
    try{
        let username = req.body.username;
        let password = await bcrypt.hash(req.body.password, 10);

        const record = await Users.create({
            username: username,
            password: password
        });
        res.status(201).json(record);
    }
    catch(error){
        throw new Error('signup error');
    }
});

app.post('/signin', basic, async (req, res)=>{
    res.status(201).json(req.user);
});

app.get('/secretstuff', bearer, (req, res)=>{
    console.log('---------', req.user)
    if(req.user.typeError !== "Invalid token"){
        res.json({
            message: 'You are authorized to view the secret stuff.',
            user: req.user
          });
    }
    else{
        res.json(req.user);
    }
});

// Handle error
// 404
app.use('*', handle404);
// 500
//app.use(handle500);

// Kick Off server.....
function start(PORT){
    app.listen(PORT, ()=>{
        console.log(`Server on port ${PORT}`);
    });
}

module.exports = {
    server: app,
    start: start
}

