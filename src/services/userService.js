import db from "../models";
const bcrypt = require("bcrypt");

const handleLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            const userData = {};

            const user = await checkUserEmail(email);

            if (user) {
                bcrypt.compare(password, user.password, function (err, result) {
                    if (result) {
                        userData.errCode = 0;
                        userData.message = "Login success";
                        userData.user = user;
                    } else {
                        userData.errCode = 2;
                        userData.message = "Wrong password";
                    }
                    resolve(userData);
                });
            } else {
                userData.errCode = 3;
                userData.message = `Email doesn't exist`;
                resolve(userData);
            }
        } catch (e) {
            reject(e);
        }
    });
};

const checkUserEmail = async (email) => {
    try {
        const user = await db.Users.findOne({
            attributes: ["email", "fullName", "roleId", "password"],
            where: { email },
            raw: true,
        });

        if (user) {
            return user;
        } else {
            return false;
        }
    } catch (e) {
        return false;
    }
};

export { handleLogin };
