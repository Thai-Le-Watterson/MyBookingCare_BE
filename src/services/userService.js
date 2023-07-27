import db from "../models";
const bcrypt = require("bcrypt");
const saltRounds = 10;

const handleLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            const userData = {};

            const user = await checkUser("email", email);

            if (user) {
                await bcrypt.compare(
                    password,
                    user.password,
                    function (err, result) {
                        if (result) {
                            userData.errCode = 0;
                            userData.message = "Login success";
                            userData.user = user;
                        } else {
                            userData.errCode = 2;
                            userData.message = "Wrong password";
                        }
                        resolve(userData);
                    }
                );
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

const checkUser = async (name, value) => {
    try {
        const user = await db.Users.findOne({
            attributes: ["email", "fullName", "roleId", "password"],
            where: { [name]: value },
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

const getUsers = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = {};

            if (id === "ALL") {
                data.users = await db.Users.findAll({
                    attributes: [
                        "id",
                        "email",
                        "fullName",
                        "address",
                        "phonenumber",
                        "gender",
                        "positionId",
                        "roleId",
                        "image",
                    ],
                });
            } else {
                data.users = await db.Users.findOne({
                    attributes: [
                        "id",
                        "email",
                        "fullName",
                        "address",
                        "phonenumber",
                        "gender",
                        "positionId",
                        "roleId",
                        "image",
                    ],
                    where: { id },
                });
            }

            if (data.users) {
                data.errCode = 0;
                data.message = "Success finding users";
            } else {
                data.errCode = 1;
                data.message = `Users dosen't not found`;
            }
            resolve(data);
        } catch (e) {
            reject(e);
        }
    });
};

const createUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await checkUser("email", data.email);
            if (!result) {
                await bcrypt.hash(
                    data.password,
                    saltRounds,
                    async function (err, hash) {
                        await db.Users.create({
                            email: data.email,
                            password: hash,
                            fullName: data.fullName,
                            address: data.address,
                            phonenumber: data.phonenumber,
                            gender: data.gender,
                            positionId: data.positionId,
                            roleId: data.roleId,
                            image: data.image,
                        });
                    }
                );

                resolve({
                    errCode: 0,
                    message: "Create user successfully",
                });
            } else {
                resolve({
                    errCode: 1,
                    message: "Email is exist",
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

const updateUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await checkUser("id", data.id);
            console.log(">>> check data: ", data);
            if (result) {
                const option = {
                    fullName: data.fullName,
                    address: data.address,
                    gender: data.gender,
                    positionId: data.positionId,
                    roleId: data.roleId,
                };
                data.image && (option.image = data.image);

                await db.Users.update(option, {
                    where: {
                        id: data.id,
                    },
                });

                resolve({
                    errCode: 0,
                    message: "Update user successfully",
                });
            } else {
                resolve({
                    errCode: 1,
                    message: "User not found",
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

const deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await checkUser("id", id);
            // console.log(id);
            if (result) {
                await db.Users.destroy({
                    where: {
                        id,
                    },
                });

                resolve({
                    errCode: 0,
                    message: "Delete user successfully",
                });
            } else {
                resolve({
                    errCode: 1,
                    message: "User not found",
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

const getAllCode = async (type) => {
    try {
        const data = type
            ? await db.Allcodes.findAll({ where: { type } })
            : await db.Allcodes.findAll();
        return {
            errCode: 0,
            message: "Get allcode succeed",
            data,
        };
    } catch (e) {
        return {
            errCode: 1,
            message: "Get allcode fail",
        };
    }
};

export {
    handleLogin,
    getUsers,
    createUser,
    updateUser,
    deleteUser,
    getAllCode,
};
