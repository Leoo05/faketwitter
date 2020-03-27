//IMPORT SEQUELIZE
const Sequelize = require("sequelize");
//IMPORT SEQUELIZE CONNECTION
const sequelizeConnection = require('../Database/db.connection');

//IMPORT MODELS
const UserModel = require("../models/user.model");
const TweetModel = require("../models/tweet.model");

//INITIALIZE MODELS
const User = UserModel (sequelizeConnection, Sequelize);
const Tweet = TweetModel (sequelizeConnection, Sequelize);

//CREATE RELATIONS BETWEEN MODELS
User.hasMany(Tweet, { foreignKey: 'idUser', sourceKey: 'idUser' });
Tweet.belongsTo( User, { foreignKey: 'idUser', sourceKey: 'idTweet' });

//GROUP MODELS
const models = {
  User: User,
  Tweet: Tweet,
};


/**
 * Create object to manage the models and database
 */
const db = {
    ...models,
    sequelizeConnection
};
  
// EXPORT CONSTANT DB
module.exports = db;