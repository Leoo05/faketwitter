var express = require('express');
var router = express.Router();

const messageController = require('../controllers/message.controller');

router.post('/',messageController.createMessage);

router.get('/', messageController.findMessages);

module.exports = router;
