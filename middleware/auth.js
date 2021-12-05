import jwt from 'jsonwebtoken';

// custom Middleware
export const auth = (req, res, next) => {
    try {
        const token = req.header("x-auth-token");
        jwt.verify(token, process.env.SECRET_KEY);
        console.log("token  ", token);
        next();
    } catch (err) {
        res.send({ error: err.message })
    }
};