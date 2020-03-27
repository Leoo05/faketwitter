const dbManager = require('../Database/db.manager');

/**
 * Crea un nuevo tweet
 */
async function createTweet (req, res) {
    
    // CHECK IF THE REQUEST BODY IS EMPTY
    if (!req.body) {
        res.status(400).send({
          message: "Request body is empty!!!!"
        });
        return;
    }
    
    // CREATING THE OBJECT TO PERSIST
    const newTweetObject = {
        idUser: req.body.idUser,
        message: req.body.message,
        published_date: req.body.published_date
    }
    
    // EXECUTING THE CREATE QUERY - INSERT THE OBJECT INTO DATABASE 
    dbManager.Tweet.create(newTweetObject).then (
        data => {
            res.send (data);
        }
    ).catch (
        e => {
            // Print error on console
            console.log(e);
            // Send error message as a response 
            res.status(500).send({
                message: "Some error occurred"
            });
        }
    );
}

/**
 * Encuentra todos los tweets en la base de datos
 */
async function findAllTweets(req, res){
    try {
        const tweets = await dbManager.Tweet.findAll();

        res.json({
            data: tweets
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

/**
 * Encuentra todos los tweets de un usuario
 */
async function findUserTweets(req, res){

    // CHECK IF THE REQUEST BODY IS EMPTY
    if (!req.body) {
        res.status(400).send({
          message: "Request body is empty!!!!"
        });
        return;
    }

    try {
        const tweets = await dbManager.Tweet.findAll({
            where: {
                idUser : req.body.idUser
            }
        });

        res.json({
            data: tweets
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


/**
 * Elimina un Tweet
 */
async function deleteTweet(req, res){

    // CHECK IF THE REQUEST BODY IS EMPTY
    if (!req.body) {
        res.status(400).send({
          message: "Request body is empty!!!!"
        });
        return;
    }

    try {
        const tweet = await dbManager.Tweet.destroy({
            where: {
                idTweet : req.body.idTweet
            }
        });

        res.json({
            data: tweet
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

exports.createTweet = createTweet;
exports.findAllTweets = findAllTweets;
exports.findUserTweets = findUserTweets;
exports.deleteTweet = deleteTweet;
