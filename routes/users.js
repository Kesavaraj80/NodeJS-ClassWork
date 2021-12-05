import express from "express";
const router = express.Router();
import bcrypt from "bcrypt";
import { createUser, getUserByusername } from "../helper.js";
import jwt from 'jsonwebtoken'

router
    .route('/signup')
    .post(async (req, res) => {
        const { username, password } = req.body
        console.log(username, password)

        const isUserExist = await getUserByusername(username)

        if (isUserExist) {
            res.status(400).send({ message: 'User already exists' });
            return;
        }

        if (!/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@!#%&$]).{8,}$/g.test(password)) {
            res.status(400).send({ message: "Password pattern is does not match" })
            return;
        }

        const hashedPassword = await genPassword(password);
        const result = await createUser({ username, password: hashedPassword })

        res.send(result)
    });

    router
    .route('/login')
    .post(async (req, res) => {
        const { username, password } = req.body;

        const userFromdb = await getUserByusername(username)

        if (!userFromdb) {
            res.send({ message: 'Invalid Credentials' });
        }

        const storedPassword = userFromdb.password;

        const isPasswordMatch = await bcrypt.compare(password,storedPassword)

        if(isPasswordMatch){
            const token = jwt.sign({id:userFromdb._id},process.env.SECRET_KEY)
            res.send({ message:"Successfull Login",toker:token});
            console.log("secret key",process.env.SECRET_KEY);
        }else{
            res.send({message:"Invalid Credentials"})
        }
    });

export const usersRouter = router;


async function genPassword(password) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword; x
}
