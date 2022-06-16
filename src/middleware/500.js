'use strict';

module.exports = (error, req, res, next)=>{
    res.status(500).send({
        Code: 500,
        Route: req.path,
        Message: `Server Error: ${error.message}`
    });  
};