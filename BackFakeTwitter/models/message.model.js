module.exports = (sequelize, Sequelize) =>{
    const Message = sequelize.define ("Message", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        idEmitter: {
            type: Sequelize.INTEGER,
        },
        idReceiver: {
            type: Sequelize.INTEGER,
        },
        message: Sequelize.STRING,
        published_date: Sequelize.DATE,
    }, {
        tableName: "Messages"
    });
    return Message;
}
