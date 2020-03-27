const dbManager = require('../Database/db.manager');

/**
 * Crea un nuevo mensaje
 */
async function createMessage(req, res) {

    // CHECK IF THE REQUEST BODY IS EMPTY
    if (!req.body) {
        res.status(400).send({
            message: "Request body is empty!!!!"
        });
        return;
    }

    try {
        const emitter = await dbManager.User.findOne({
            where: {
                idUser: req.body.idEmitter
            }
        });

        const receiver = await dbManager.User.findOne({
            where: {
                idUser: req.body.idReceiver
            }
        });

        if (emitter != null && receiver != null) {
            // CREATING THE OBJECT TO PERSIST
            const newMessageObject = {
                idEmitter: req.body.idEmitter,
                idReceiver: req.body.idReceiver,
                message: req.body.message,
                published_date: req.body.published_date
            }

            // EXECUTING THE CREATE QUERY - INSERT THE OBJECT INTO DATABASE 
            dbManager.Message.create(newMessageObject).then(
                data => {
                    res.send(data);
                }
            ).catch(
                e => {
                    // Print error on console
                    console.log(e);
                    // Send error message as a response 
                    res.status(500).send({
                        message: "Some error occurred"
                    });
                }
            );
        } else {
            res.status(500).send({
                message: "User not found"
            });
        }

    } catch (e) {
        // Print error on console
        console.log(e);
        // Send error message as a response 
        res.status(500).send({
            message: "Some error occurred"
        });
    }

}


/**
 * Encuentra los mensajes entre un emisor y un receptor
 */
async function findMessages(req, res) {

    // CHECK IF THE REQUEST BODY IS EMPTY
    if (!req.body) {
        res.status(400).send({
            message: "Request body is empty!!!!"
        });
        return;
    }

    try {
        const messages = await dbManager.Message.findAll({
            where: {
                idEmitter: req.body.idEmitter,
                idReceiver: req.body.idReceiver
            }
        });

        res.json({
            data: messages
        });
    } catch (error) {
        // Print error on console
        console.log(e);
        // Send error message as a response 
        res.status(500).send({
            message: "Some error occurred"
        });
    }
}

exports.createMessage = createMessage;
exports.findMessages = findMessages;
