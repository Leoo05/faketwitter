const dbManager = require('../Database/db.manager');




//LEER TODOS LOS USUARIOS
async function findAllUsers (req, res){
    try {
        const users = await dbManager.User.findAll ();                
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
async function findUserById (req, res){
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
async function authenticateUser (req,res){
    try{
        const {username,password} = req.params;
        const user = await dbManager.User.findOne({
            where:{
                username: username,
                password: password
            }
        })
        if(user!=null){
            res.send(true);
        }
        else{
            res.send(false);
        }
    }catch (e){
        console.log(e);
        res.status(500).send({
            message:e
        });
    }
}


//Eliminar un Usuario
async function deleteUser(req,res){
    try{
        const{username}=req.params;
        const user = await dbManager.User.destroy({
            where:{
                username=username
            }
        })        
        res.json(user);        
    }catch (e){
        console.log(e);
        res.status(500).send({
            message:e
        });
    }
}

exports.findAllUsers=findAllUsers;
exports.findUserById=findUserById;
exports.authenticateUser=authenticateUser;
exports.deleteUser=deleteUser;