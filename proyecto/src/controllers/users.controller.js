import { usersService } from "../services/index.js"
import logger from "../config/logger.js";

const getAllUsers = async (req, res) => {
try {
    const users = await usersService.getAll();
    logger.info(`Usuarios obtenidos: ${users.length}`);
    res.send({ status: "success", payload: users });
} catch (error) {
    logger.error(`Error al obtener usuarios: ${error.message}`);
    res.status(500).send({ status: "error", error: error.message });
}
};


const getUser = async(req,res)=> {
    const userId = req.params.uid;
    const user = await usersService.getUserById(userId);
    if(!user) return res.status(404).send({status:"error",error:"User not found"})
    res.send({status:"success",payload:user})
}

const updateUser =async(req,res)=>{
    const updateBody = req.body;
    const userId = req.params.uid;
    const user = await usersService.getUserById(userId);
    if(!user) return res.status(404).send({status:"error", error:"User not found"})
    const result = await usersService.update(userId,updateBody);
    res.send({status:"success",message:"User updated"})
}
const createUser = async (req, res) => {
    try {
        const newUser = req.body;
        const user = await usersService.create(newUser); 

        logger.info(`Usuario creado: ${user._id}`);
        res.status(201).send({ status: "success", payload: user });
    } catch (error) {
        logger.error(`Error al crear usuario: ${error.message}`);
        res.status(500).send({ status: "error", error: error.message });
    }
};


const deleteUser = async(req,res) =>{
     const userId = req.params.uid;
    const result = await usersService.getUserById(userId);
    res.send({status:"success",message:"User deleted"})

}

export default {
    createUser,
    deleteUser,
    getAllUsers,
    getUser,
    updateUser
}