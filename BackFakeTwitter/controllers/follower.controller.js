const dbManager = require('../Database/db.manager');

/**
 * Inserta un nuevo seguidor
 */
async function insertFollower(req, res) {

    // CHECK IF THE REQUEST BODY IS EMPTY
    if (!req.body) {
        res.status(400).send({
            message: "Request body is empty!!!!"
        });
        return;
    }

    try {
        const user = await dbManager.User.findOne({
            where: {
                idUser: req.body.idUser
            }
        });

        const followed = await dbManager.User.findOne({
            where: {
                idUser: req.body.idFollowed
            }
        });

        if (user != null && followed != null) {
            // CREATING THE OBJECT TO PERSIST
            const newFollowerObject = {
                idUser: req.body.idUser,
                idFollowed: req.body.idFollowed,
                published_date: req.body.published_date
            }

            // EXECUTING THE CREATE QUERY - INSERT THE OBJECT INTO DATABASE 
            dbManager.Follower.create(newFollowerObject).then(
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
 * Encuentra todos los follower de un usuario
 */
async function findUserFollowers(req, res) {

    // CHECK IF THE REQUEST BODY IS EMPTY
    if (!req.body) {
        res.status(400).send({
            message: "Request body is empty!!!!"
        });
        return;
    }

    try {
        const followers = await dbManager.Follower.findAll({
            where: {
                idFollowed: req.body.idUser
            }
        });

        res.json({
            data: followers
        });
    } catch (e) {
        // Print error on console
        console.log(e);
        // Send error message as a response 
        res.status(500).send({
            message: "Some error occurred"
        });
    }
}

exports.insertFollower = insertFollower;
exports.findUserFollowers = findUserFollowers;
