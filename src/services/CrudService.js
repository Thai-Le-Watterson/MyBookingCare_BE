import db from "../models/index";
const bcrypt = require("bcrypt");
const saltRounds = 10;

const createUser = (data) => {
    return new Promise((resolve, reject) => {
        try {
            bcrypt.hash(data.pass, saltRounds, async function (err, hash) {
                await db.Users.create({
                    email: data.email,
                    password: hash,
                    fullName: data.fullname,
                    address: data.address,
                    phonenumber: data.phone,
                    gender: data.gender,
                    roleId: data.roleid,
                });
            });

            resolve("Create Successful");
        } catch (err) {
            reject("Create failure");
        }
    });
};
const updateUser = (userId, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.Users.update(
                {
                    fullName: data.fullName,
                    address: data.address,
                    gender: data.gender,
                },
                {
                    where: {
                        id: userId,
                    },
                }
            );
            resolve("Delete Successful");
        } catch (err) {
            reject("Delete failure");
        }
    });
};
const deleteUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.Users.destroy({
                where: {
                    id: data.userId,
                },
            });
            resolve("Delete Successful");
        } catch (err) {
            reject("Delete failure");
        }
    });
};

export { createUser, deleteUser, updateUser };
