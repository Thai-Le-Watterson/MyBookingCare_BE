import * as userService from "../services/userService";

const handleLoginUser = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        // console.log(req.body);
        if (!email || !password) {
            return res.status(500).json({
                errCode: 1,
                message: "Input is empty",
            });
        }

        const userData = await userService.handleLogin(email, password);

        return res.status(200).json({
            userData,
        });
    } catch (e) {
        return res
            .status(200)
            .json({ errCode: -1, message: "Get error from sever" });
    }
};

const getUsers = async (req, res) => {
    try {
        const users = await userService.getUsers(req.query.id);

        return res.status(200).json({
            users,
        });
    } catch (e) {
        return res
            .status(200)
            .json({ errCode: -1, message: "Get error from sever" });
    }
};

const createUser = async (req, res) => {
    try {
        const data = await userService.createUser(req.body);
        return res.status(200).json({
            data,
        });
    } catch (e) {
        return res
            .status(200)
            .json({ errCode: -1, message: "Get error from sever" });
    }
};

const updateUser = async (req, res) => {
    try {
        const data = await userService.updateUser(req.body);

        return res.status(200).json({
            data,
        });
    } catch (e) {
        return res
            .status(200)
            .json({ errCode: -1, message: "Get error from sever" });
    }
};

const deleteUser = async (req, res) => {
    try {
        const data = await userService.deleteUser(req.body.id);

        return res.status(200).json({
            data,
        });
    } catch (e) {
        return res
            .status(200)
            .json({ errCode: -1, message: "Get error from sever" });
    }
};

const getAllCode = async (req, res) => {
    try {
        const data = await userService.getAllCode(req.query.type);

        return res.status(200).json({ data });
    } catch (e) {
        return res
            .status(200)
            .json({ errCode: -1, message: "Get error from sever" });
    }
};

export {
    handleLoginUser,
    getUsers,
    createUser,
    updateUser,
    deleteUser,
    getAllCode,
};
