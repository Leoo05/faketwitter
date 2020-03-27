var express = require('express');
var router = express.Router();

const userController = require('../controllers/user.controller');

router.post('/',userController.createUser);

/* GET users listing. */
router.get('/', userController.findAllUsers);

router.get('/:idUser', userController.findUserById);

router.get('/:username/:password' , userController.authenticateUser);

router.delete('/:username',userController.deleteUser);


module.exports = router;
