import jwt  from "jsonwebtoken";
import { createError } from "./error.js";

console.log('masuk ke periksa token')

export const verifyToken = (req, res, next) => {
    console.log('masuk ke periksa token1')
    const token = req.cookies.access_token;
    if (!token) {
        return next(createError(401, "You are not authenticated!"));
    }
  
    jwt.verify(token, process.env.JWT, (err, user) => {
        if (err) return next(createError(403, "Token is not valid!"));
        req.user = user;
        //next();
        if (req.user.isAdmin) {
            next();
        } else {
            return next(createError(403, "You are not authorized!"));
        }
    });
};

export const verifyUser = (req, res, next) => {
    verifyToken(req, res, next, () => {
        if (req.user.id === req.params.id || req.user.isAdmin === true) {
            console.log('user masuk')
            next();
        } else {
            return next(createError(403, "You are not authorized!"));
        }
    });
  };
  
export const verifyAdmin = (req, res, next) => {   
    verifyToken(req, res, next, () => {
        // if (req.user.isAdmin) {
        //     console.log("admin masuk")
        //     next();
        // } else {
        //     return next(createError(403, "You are not authorized!"));
        // }
    });
};