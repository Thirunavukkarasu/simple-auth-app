const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const config = require('./server/config');
const cors = require('cors');

// connect to the database and load models
require('./server/models').connect(config.dbUri);

const app = express();

app.use(cors());
app.use(express.static('dist'));  
// tell the app to parse HTTP body messages
app.use(bodyParser.urlencoded({ extended: false }));
// pass the passport middleware
app.use(passport.initialize());

// load passport strategies
const localSignupStrategy = require('./server/passport/local-signup');
const localLoginStrategy = require('./server/passport/local-login');
passport.use('local-signup', localSignupStrategy);
passport.use('local-login', localLoginStrategy);

// pass the authenticaion checker middleware
const authCheckMiddleware = require('./server/middleware/auth-check');
app.use('/api/data', authCheckMiddleware);

// routes
const authRoutes = require('./server/routes/auth');
const apiRoutes = require('./server/routes/api');
app.use('/api/auth', authRoutes);
app.use('/api/data', apiRoutes);

// Set Port, hosting services will look for process.env.PORT
app.set('port', (process.env.PORT || 4000));

// start the server
app.listen(app.get('port'), () => {
  console.log(`Server is running on port ${app.get('port')}`);
});