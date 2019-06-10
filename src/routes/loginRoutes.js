const express = require('express');
const dbConnect = require('./../model/database.js');

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
        dbConnect.query(`select * from userDetails where username='${req.body.username}' && password='${req.body.password}'`, (err, result) => {
            if (err) {
                throw err
            } else if (result && result.length) {
                res.send(result);
            } else {
                res.send('User not found!');
            }
        });
    });

    return loginRouter;
}


module.exports = router;
