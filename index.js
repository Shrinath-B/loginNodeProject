const express = require('express');
const debug = require('debug')('app');
const morgan = require('morgan');
const bodyParser = require('body-parser');
/* const cookieParser = require('cookie-parser');
const session = require('express-session'); */

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

const secretKey = 'shri';

const loginRouter = require('./src/routes/loginRoutes.js')(allowCrossDomain);
const signupRouter = require('./src/routes/signupRouter.js')(allowCrossDomain);
const dashboardRouter = require('./src/routes/dashboardRouter.js')(allowCrossDomain);

app.use('/login', loginRouter);
app.use('/signup', signupRouter);
app.use('/dashboard', dashboardRouter);

app.listen(port, () => {
    debug(`listening to port ${port}`);
});