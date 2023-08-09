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

const getDoctorInforBySpecialty = async (req, res) => {
    try {
        if (!req.query.id) {
            return res.status(200).json({
                errCode: 1,
                message: "Missing id",
            });
        }

        const data = await doctorService.getDoctorInforBySpecialty(
            req.query.id,
            req.query.provinceId
        );

        return res.status(200).json(data);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            message: "Get error from sever",
            error: e,
        });
    }
};

const getDoctorInforByClinic = async (req, res) => {
    try {
        if (!req.query.id) {
            return res.status(200).json({
                errCode: 1,
                message: "Missing id",
            });
        }

        const data = await doctorService.getDoctorInforByClinic(req.query.id);

        return res.status(200).json(data);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            message: "Get error from sever",
            error: e,
        });
    }
};

const getSchedule = async (req, res) => {
    try {
        if (!req.query.doctorId || !req.query.date) {
            return res.status(200).json({
                errCode: 1,
                message: "Missing id",
            });
        }

        const data = await doctorService.getSchedule(req.query);

        return res.status(200).json({ data });
    } catch (e) {
        return {
            errCode: -1,
            message: "Get error from sever",
            error: e,
        };
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

const createDoctorInfor = async (req, res) => {
    try {
        const data = await doctorService.createDoctorInfor(req.body);

        if (data && data.errCode === 0) {
            return res.status(200).json({
                data,
            });
        } else {
            return res.status(200).json(data);
        }
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            message: "Get error from sever",
            error: e,
        });
    }
};

const updateDoctorInfor = async (req, res) => {
    try {
        const data = await doctorService.updateDoctorInfor(req.body);

        if (data && data.errCode === 0) {
            return res.status(200).json({
                data,
            });
        } else {
            return res.status(200).json({
                errCode: 1,
                message: "Update doctor infor fail",
            });
        }
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            message: "Get error from sever",
            error: e,
        });
    }
};

export {
    getTopDoctors,
    getAllDoctors,
    getDoctorDetail,
    bulkCreateSchedule,
    getSchedule,
    createDoctorInfor,
    updateDoctorInfor,
    getDoctorInforBySpecialty,
    getDoctorInforByClinic,
};
