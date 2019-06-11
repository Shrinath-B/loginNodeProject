const express = require('express');
const jwt = require('jsonwebtoken');
const dbConnect = require('./../model/database.js');
const crypto = require('crypto');

const dashboardRouter = express.Router();

function router(allowCrossDomain) {

    dashboardRouter.use(allowCrossDomain);

    dashboardRouter.get(('/'), (req, res) => {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGV0YWlscyI6eyJ1c2VybmFtZSI6InNocmluYXRoIiwicGFzc3dvcmQiOiJTaHJpQDEyMyJ9LCJpYXQiOjE1NjAxNjg4MjN9.PgqLrqqooER8Tv3_ne1Kt0NfvwwFILtktdBJd2jxNhs"
        let decodedValue;
        jwt.verify(token, 'shrinath', function(err, decoded) {
            if(err){
                throw err;
            } else {
                decodedValue = decoded;
            }
          });
        dbConnect.query('select * from userDetails', (err, result) => {
            if (err) throw err;
            res.send(decodedValue);
        });
    });

    return dashboardRouter;
}


module.exports = router;
