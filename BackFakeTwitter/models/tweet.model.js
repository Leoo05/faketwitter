module.exports = (sequelize, Sequelize) =>{
    const Tweet = sequelize.define ("Tweet", {
        idTweet: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        idUser: {
            type: Sequelize.INTEGER,
        },
        message: Sequelize.STRING,
        published_date: Sequelize.DATE,
    }, {
        tableName: "tweets"
    });
    return Tweet;
}