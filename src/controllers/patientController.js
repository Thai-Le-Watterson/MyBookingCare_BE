import * as patientService from "../services/patientService";

const createBooking = async (req, res) => {
    try {
        const data = await patientService.createBooking(req.body);
        return res.status(200).json(data);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            message: "Get error from sever",
            error: e,
        });
    }
};

const verifySchedule = async (req, res) => {
    try {
        const data = await patientService.verifySchedule(req.query);
        return res.status(200).json(data);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            message: "Get error from sever",
            error: e,
        });
    }
};

export { createBooking, verifySchedule };
