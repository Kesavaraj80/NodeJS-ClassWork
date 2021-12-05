import express from "express";
const router = express.Router();
import bcrypt from "bcrypt";
import { createUser, getUserByusername } from "../helper.js";

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

export const usersRouter = router;

async function genPassword(password) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword; x
}
