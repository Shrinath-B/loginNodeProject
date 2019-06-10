const express = require('express');
const debug = require('debug')('app');
const morgan = require('morgan');
const bodyParser = require('body-parser');
/* const cookieParser = require('cookie-parser');
const session = require('express-session'); */
const dbConnect = require('./src/model/database.js');

const port = process.env.PORT || 3000;
const app = express();

app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());

const allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

const loginRouter = require('./src/routes/loginRoutes.js')(allowCrossDomain);

app.use('/login', loginRouter);

app.listen(port, () => {
    debug(`listening to port ${port}`);
});