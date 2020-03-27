module.exports = (sequelize, Sequelize) =>{
    const Follower = sequelize.define ("Follower", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        idUser: {
            type: Sequelize.INTEGER,
        },
        idFollowed: {
            type: Sequelize.INTEGER,
        },
        published_date: Sequelize.DATE,
    }, {
        tableName: "Followers"
    });
    return Follower;
}
