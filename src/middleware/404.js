'use strict';

module.exports = (req, res, next)=>{
    res.status(404).send({
        Code: "404",
        path: req.path,
        message: 'Page not found.'
    });
}