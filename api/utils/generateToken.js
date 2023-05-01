import jwt from "jsonwebtoken";

export const generateToken = (id, isAdmin) => {
    return jwt.sign({ id, isAdmin }, process.env.JWT_SECRETE);
};