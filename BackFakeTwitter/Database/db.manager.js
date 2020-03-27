//IMPORT SEQUELIZE
const Sequelize = require("sequelize");
//IMPORT SEQUELIZE CONNECTION
const sequelizeConnection = require('../Database/db.connection');

//IMPORT MODELS
const UserModel = require("../models/user.model");
const TweetModel = require("../models/tweet.model");
const FollowerModel = require("../models/follower.model");
const MessageModel = require("../models/message.model");

//INITIALIZE MODELS
const User = UserModel (sequelizeConnection, Sequelize);
const Tweet = TweetModel (sequelizeConnection, Sequelize);
const Follower = FollowerModel (sequelizeConnection, Sequelize);
const Message = MessageModel (sequelizeConnection, Sequelize);

//CREATE RELATIONS BETWEEN MODELS
User.hasMany(Tweet, { foreignKey: 'idUser', sourceKey: 'idUser' });
Tweet.belongsTo( User, { foreignKey: 'idUser', sourceKey: 'idTweet' });
User.hasMany(Follower, { foreignKey: 'idFollowed', sourceKey: 'idUser' });
Follower.belongsTo( User, { foreignKey: 'idUser', sourceKey: 'idFollowed' });

//GROUP MODELS
const models = {
  User: User,
  Tweet: Tweet,
  Follower: Follower,
  Message: Message
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