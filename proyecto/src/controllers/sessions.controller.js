import { usersService } from "../services/index.js";
import { createHash, passwordValidation } from "../utils/index.js";
import jwt from 'jsonwebtoken';
import UserDTO from '../dto/User.dto.js';
import { CustomError, ERROR_DICTIONARY } from "../utils/errors.js";
import logger from "../config/logger.js";


const register = async (req, res) => {
    try {
        const { first_name, last_name, email, password } = req.body;
        
        if (!first_name || !last_name || !email || !password) {
            throw new CustomError(400, ERROR_DICTIONARY.INVALID_USER_DATA);
        }
        
        const exists = await usersService.getUserByEmail(email);
        if (exists) {
            throw new CustomError(400, ERROR_DICTIONARY.USER_ALREADY_EXISTS);
        }
        
        const hashedPassword = await createHash(password);
        const user = {
            first_name,
            last_name,
            email,
            password: hashedPassword
        };
        
        let result = await usersService.create(user);
        console.log(result);
        res.send({ status: "success", payload: result._id });
        
    } catch (error) {
        res.status(error.code || 500).send({ status: "error", message: error.message });
    }
};


const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            logger.warning(`Intento de login con datos incompletos`);
            return res.status(400).send({ status: "error", error: "Incomplete values" });
        }

        const user = await usersService.getUserByEmail(email);
        if (!user) {
            logger.warning(`Intento de login con email no registrado: ${email}`);
            return res.status(404).send({ status: "error", error: "User doesn't exist" });
        }

        const isValidPassword = await passwordValidation(user, password);
        if (!isValidPassword) {
            logger.warning(`Intento de login con contraseña incorrecta: ${email}`);
            return res.status(400).send({ status: "error", error: "Incorrect password" });
        }

        const userDto = UserDTO.getUserTokenFrom(user);
        const token = jwt.sign(userDto, 'tokenSecretJWT', { expiresIn: "1h" });

        logger.info(`Usuario autenticado: ${email}`);
        res.cookie('coderCookie', token, { maxAge: 3600000 }).send({ status: "success", message: "Logged in" });

    } catch (error) {
        logger.error(`Error en el login: ${error.message}`);
        res.status(500).send({ status: "error", error: error.message });
    }
};

const current = async(req,res) =>{
    const cookie = req.cookies['coderCookie']
    const user = jwt.verify(cookie,'tokenSecretJWT');
    if(user)
        return res.send({status:"success",payload:user})
}

const unprotectedLogin  = async(req,res) =>{
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).send({ status: "error", error: "Incomplete values" });
    const user = await usersService.getUserByEmail(email);
    if(!user) return res.status(404).send({status:"error",error:"User doesn't exist"});
    const isValidPassword = await passwordValidation(user,password);
    if(!isValidPassword) return res.status(400).send({status:"error",error:"Incorrect password"});
    const token = jwt.sign(user,'tokenSecretJWT',{expiresIn:"1h"});
    res.cookie('unprotectedCookie',token,{maxAge:3600000}).send({status:"success",message:"Unprotected Logged in"})
}
const unprotectedCurrent = async(req,res)=>{
    const cookie = req.cookies['unprotectedCookie']
    const user = jwt.verify(cookie,'tokenSecretJWT');
    if(user)
        return res.send({status:"success",payload:user})
}
export default {
    current,
    login,
    register,
    current,
    unprotectedLogin,
    unprotectedCurrent
}