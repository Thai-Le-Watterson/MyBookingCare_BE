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

export { handleLoginUser };
