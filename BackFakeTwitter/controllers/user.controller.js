const dbManager = require('../Database/db.manager');

async function createUser(req, res) {

    // CHECK IF THE REQUEST BODY IS EMPTY
    if (!req.body) {
        res.status(400).send({
            message: "Request body is empty!!!!"
        });
        return;
    }

    // CREATING THE OBJECT TO PERSIST
    const newUserObject = {
        username: req.body.username,
        password: req.body.password,
        creation_date: req.body.creation_date
    }

    // EXECUTING THE CREATE QUERY - INSERT THE OBJECT INTO DATABASE 
    dbManager.User.create(newUserObject).then(
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
}

//LEER TODOS LOS USUARIOS
async function findAllUsers(req, res) {
    try {
        const users = await dbManager.User.findAll();
        res.json({
            data: users
        });

    } catch (e) {
        console.log(e);
        res.status(500).send({
            message: e
        });
    }
}


//Leer usuario por id
async function findUserById(req, res) {
    try {
        const { idUser } = req.params;
        const user = await dbManager.User.findOne({
            where: {
                idUser: idUser
            }
        });
        res.json(user);

    } catch (e) {
        console.log(e);
        res.status(500).send({
            message: e
        });
    }
}

//Autenticar Usuario por sus credenciales
async function authenticateUser(req, res) {
    try {
        const { username, password } = req.params;
        const user = await dbManager.User.findOne({
            where: {
                username: username,
                password: password
            }
        });
        if (user != null) {
            res.send(true);
        }
        else {
            res.send(false);
        }
    } catch (e) {
        console.log(e);
        res.status(500).send({
            message: e
        });
    }
}


//Eliminar un Usuario
async function deleteUser(req, res) {
    try {
        const { username } = req.params;
        const user = await dbManager.User.destroy({
            where: {
                username: username
            }
        });
        res.send('USUARIO'+username+'ELIMINADO');
    } catch (e) {
        console.log(e);
        res.status(500).send({
            message: e
        });
    }
}


//Obtiene el usuario por su username
async function findUserByUsername(req, res) {
    try {
        const { username } = req.params;
        const user = await dbManager.User.findOne({
            where: {
                username: username
            }
        });
        res.json(user);

    } catch (e) {
        console.log(e);
        res.status(500).send({
            message: e
        });
    }
}


exports.createUser = createUser;
exports.findAllUsers = findAllUsers;
exports.findUserById = findUserById;
exports.authenticateUser = authenticateUser;
exports.deleteUser = deleteUser;
exports.findUserByUsername = findUserByUsername;