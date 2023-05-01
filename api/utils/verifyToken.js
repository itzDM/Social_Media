import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const auth = req.headers.token;
    if (auth) {
        const token = auth.split(" ")[1];
        jwt.verify(token, process.env.JWT_SECRETE, (err, data) => {
            if (err) {
                return res.status(403).json(err.message);
            }

            req.user = data;
            next();

        });

    } else {
        res.status(401).json("You are not Authenticate");
    }

};