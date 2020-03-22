module.exports = (sequelize, Sequelize) =>{
    const Tweet = sequelize.define ("Tweet", {
        idTweet: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        message: Sequelize.STRING,
        published_date: Sequelize.DATE,
    }, {
        tableName: "tweets"
    });
    return Tweet;
}