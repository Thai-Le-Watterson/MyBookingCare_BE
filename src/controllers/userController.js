import * as userService from "../services/userService";

const handleLoginUser = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

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
};

const getUsers = async (req, res) => {
    const users = await userService.getUsers(req.query.id);

    return res.status(200).json({
        users,
    });
};

const createUser = async (req, res) => {
    const data = await userService.createUser(req.body);
    return res.status(200).json({
        data,
    });
};

const updateUser = async (req, res) => {
    const data = await userService.updateUser(req.body);

    return res.status(200).json({
        data,
    });
};

const deleteUser = async (req, res) => {
    const data = await userService.deleteUser(req.body.id);

    return res.status(200).json({
        data,
    });
};

const getAllCode = async (req, res) => {
    const data = await userService.getAllCode(req.query.type);

    return res.status(200).json({ data });
};

export {
    handleLoginUser,
    getUsers,
    createUser,
    updateUser,
    deleteUser,
    getAllCode,
};
