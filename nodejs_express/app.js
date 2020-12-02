var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors')

var generate_uid = require('./routes/generate_uid');
var user = require('./routes/user');
var calendar = require('./routes/calendar')
var food = require('./routes/food')
var recommend = require('./routes/recommend')
var db = require('./bin/db.js')

let reporter = function (type, ...rest)
{
	// remote reporter logic goes here
};

/* handle an uncaught exception & exit the process */
process.on('uncaughtException', function (err)
{
	console.error((new Date).toUTCString() + ' uncaughtException:', err.message);
	console.error(err.stack);

	reporter("uncaughtException", (new Date).toUTCString(), err.message, err.stack);

	process.exit(1);
});

/* handle an unhandled promise rejection */
process.on('unhandledRejection', function (reason, promise)
{
	console.error('unhandled rejection:', reason.message || reason);

	reporter("uncaughtException", (new Date).toUTCString(), reason.message || reason);
})

var app = express();

app.options('*', cors())

db.connect(() => {
    app.listen(process.env.PORT || 5555, function (){
        console.log(`Listening`);
    });
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/users', user);
app.use('/user/generate_uid', generate_uid);
app.use('/calendars', calendar)
app.use('/foods', food)
app.use('/recommend', recommend)

module.exports = app;
