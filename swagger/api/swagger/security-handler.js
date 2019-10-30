'use strict';

var jwt = require('jsonwebtoken');
var sharedSecret = 'secretKey';

//Here we setup the security checks for the endpoints
//that need it (in our case, only /protected). This
//function will be called every time a request to a protected
//endpoint is received
exports.verifyToken = function (req, authOrSecDef, token, callback) {

    function sendError() {
        return req.res.status(403).json({message: 'Error: Access Denied'});
    }

    //validate the 'Authorization' header. it should have the following format:
    //'Bearer tokenString'
    if (token && token.indexOf("Bearer ") == 0) {

        var tokenString = token.split(' ')[1];

        jwt.verify(tokenString, sharedSecret, function (err, authData) {
            //check if the JWT was verified correctly
            if(err) {
                res.sendStatus(403);
            } else {
                res.json({
                    message: 'OK...',
                    authData
                });
            }
        });
    } else {
        //return the error in the callback if the Authorization header doesn't have the correct format
        return callback(sendError());
    }
};