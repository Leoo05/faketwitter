var express = require('express');
var router = express.Router();

const followerController = require('../controllers/follower.controller');

router.post('/',followerController.insertFollower);

router.get('/:idUser', followerController.findUserFollowers);

module.exports = router;
