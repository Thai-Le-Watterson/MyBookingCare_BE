import * as userService from "../services/patientService";

const createBooking = async (req, res) => {
    try {
        const data = await userService.createBooking(req.body);
        return res.status(200).json(data);
    } catch (e) {
        return {
            errCode: -1,
            message: "Get error from sever",
            error: e,
        };
    }
};

export { createBooking };
