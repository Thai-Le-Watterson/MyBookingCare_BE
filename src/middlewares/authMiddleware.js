import jwt from "jsonwebtoken";
require("dotenv").config();

const authMiddleware = {
    verifyLogin: (req, res, next) => {
        try {
            jwt.verify(
                req.accessToken,
                process.env.JWT_SECRET_KEY,
                (err, decode) => {
                    if (!err) {
                        console.log(">>> check decode: ", decode);
                        next();
                    } else {
                        return res.status(400).json({
                            message: "Token is not valid",
                            error: err,
                        });
                    }
                }
            );
        } catch (e) {
            return res.status(500).json({
                error: e,
            });
        }
    },
};

export default authMiddleware;
