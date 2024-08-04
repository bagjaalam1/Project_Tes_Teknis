var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const sequelize = require('./config/database');
const cors = require('cors')

var app = express();

app.use(cors())

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

require('./app/routes/users')(app)
require('./app/routes/pegawais')(app)
require('./app/routes/unitkerjas')(app)

sequelize.sync().then(() => {
    console.log('Database & tables synced!');
  });

module.exports = app;
