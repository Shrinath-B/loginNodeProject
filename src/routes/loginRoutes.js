const express = require('express');
const jwt = require('jsonwebtoken');
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
        console.log(`${req.body.username}`);
        const hashedPwd = crypto.createHmac('sha256', req.body.username)
            .update(req.body.password)
            .digest('hex');
        console.log(`${hashedPwd}`);
        dbConnect.query(`select * from userDetails where username='${req.body.username}' && password='${hashedPwd}'`, (err, result) => {
            if (err) {
                throw err
            } else if (result && result.length) {
                jwt.sign({ userDetails: req.body }, req.body.username, { algorithm: 'HS256' }, (err, token) => {
                    res.json({ token });
                });
            } else {
                res.send('User not found!');
            }
        });
    });

    return loginRouter;
}


module.exports = router;
