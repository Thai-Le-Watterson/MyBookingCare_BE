import jwt from "jsonwebtoken";
require("dotenv").config();

const JwtUtil = {
    signAccessToken: (user) => {
        const dateIat = Math.floor(Date.now() / 1000);
        const dateExp = dateIat + 60 * 60 * 2;
        jwt.sign(
            {
                id: user.id,
                email: user.email,
                fullName: user.fullName,
                roleId: user.roleId,
                image: user.image,
                iat: dateIat,
                exp: dateExp,
            },
            process.env.JWT_SECRET_KEY,
            expri
        );
    },
    signRefreshToken: (user) => {
        const dateIat = Math.floor(Date.now() / 1000);
        const dateExp = dateIat + 60 * 60 * 24 * 7;
        jwt.sign(
            {
                id: user.id,
                email: user.email,
                fullName: user.fullName,
                roleId: user.roleId,
                image: user.image,
                iat: dateIat,
                exp: dateExp,
            },
            process.env.JWT_SECRET_KEY
        );
    },
};

export default JwtUtil;
