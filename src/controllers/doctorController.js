import * as doctorService from "../services/doctorService";

const getTopDoctors = async (req, res) => {
    try {
        const data = await doctorService.getTopDoctors(req.query.limit);

        return res.status(200).json({
            data,
        });
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            message: "Get error from sever",
            error: e,
        });
    }
};

const getAllDoctors = async (req, res) => {
    try {
        const data = await doctorService.getAllDoctors();

        return res.status(200).json({ data });
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            message: "Get error from sever",
            error: e,
        });
    }
};

const getDoctorDetail = async (req, res) => {
    try {
        if (!req.query.id) {
            return res.status(200).json({
                errCode: 1,
                message: "Missing id",
            });
        }

        const data = await doctorService.getDoctorDetail(req.query.id);

        return res.status(200).json({ data });
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            message: "Get error from sever",
            error: e,
        });
    }
};

const bulkCreateSchedule = async (req, res) => {
    try {
        const data = await doctorService.bulkCreateSchedule(req.body);

        return res.status(200).json({ data });
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            message: "Get error from sever",
            error: e,
        });
    }
};

export { getTopDoctors, getAllDoctors, getDoctorDetail, bulkCreateSchedule };
