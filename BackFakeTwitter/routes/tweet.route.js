var express = require('express');
var router = express.Router();

const tweetController = require('../controllers/tweet.controller');

router.post('/',tweetController.createTweet);

/* GET users listing. */
router.get('/', tweetController.findAllTweets);

router.get('/findUserTweets/:idUser', tweetController.findUserTweets);

router.delete('/deleteTweet',tweetController.deleteTweet);


module.exports = router;
