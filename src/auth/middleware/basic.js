'use strict';

const Users = require('../models/users-model');
const base64 = require('base-64');

function basic(req, res, next){
    //console.log('Test1');
    if (req.headers.authorization) {
        let header = req.headers.authorization.split(" ");
        let encoded = header.pop();
        let decode = base64.decode(encoded);

        let [username, password] = decode.split(":");
        //console.log(username, password);
        Users.authenticateBasic(username, password).then((validUser)=>{
            req.user = validUser;
            next();
        }).catch((err) => {
            next("Invalid Signin");
        }); 
    }
}

module.exports = basic;
