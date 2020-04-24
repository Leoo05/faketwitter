var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/user.route');
var tweetRouter = require('./routes/tweet.route');
var followerRouter = require('./routes/follower.route');
var messageRouter = require('./routes/message.route');

var app = express();
const dbManager = require('./Database/db.manager');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());    

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/tweets',tweetRouter);
app.use('/followers',followerRouter);
app.use('/messages',messageRouter);

dbManager.sequelizeConnection.authenticate()
    .then(() => {
        console.log('****Connection has been established successfully.****');
        // recreate the models if the tables doesn´t exists
        dbManager.sequelizeConnection.sync().then(() => {
            console.log("Database Synced");
        });

    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

module.exports = app;