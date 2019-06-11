const express = require('express');
const dbConnect = require('./../model/database.js');
const crypto = require('crypto');

const loginRouter = express.Router();

function router(allowCrossDomain) {

    loginRouter.use(allowCrossDomain);

    loginRouter.get(('/'), (req, res) => {
        dbConnect.query('select * from userDetails', (err, result) => {
            if (err) throw err;
            res.send(result);
        });
    });

    loginRouter.route('/').post((req, res) => {
        const hashedPwd = crypto.createHmac('sha256', req.body.userName)
            .update(req.body.password)
            .digest('hex');
        const usernameCheck = `select * from userDetails where username='${req.body.userName}'`;
        const emailCheck = `select * from userDetails where email='${req.body.email}'`;
        const insertQuery = `INSERT INTO userdetails VALUES ('${req.body.userName}','${hashedPwd}','${req.body.firstName}','${req.body.lastName}','${req.body.gender}','${req.body.dob}','${req.body.phoneNumber}','${req.body.email}')`;

        const response = {
            usernameInvalid: false,
            emailInvalid: false,
            created: false
        }
        dbConnect.query(usernameCheck, (err, result) => {
            if (err) {
                throw err;
            } else if (result && result.length) {
                response.usernameInvalid = true;
                res.send(response);
            } else {
                dbConnect.query(emailCheck, (err, result) => {
                    if (err) {
                        throw err
                    } else if (result && result.length) {
                        response.emailInvalid = true;
                        res.send(response);
                    } else {
                        dbConnect.query(insertQuery, (err, result) => {
                            if (err) {
                                throw err
                            } else if (result) {
                                response.created = true;
                                res.send(result);
                            } else {
                                console.log(`${result}`);
                                console.log(`cannot be inserted`);
                            }
                        });
                    }
                });
            }
        });
    });

    return loginRouter;
}


module.exports = router;
