import * as clinicService from "../services/clinicService";

const getAllClinic = async (req, res) => {
    try {
        const data = await clinicService.getAllClinic(req.query.limit);

        return res.status(200).json(data);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            message: "Get error from sever",
            error: e,
        });
    }
};

const getClinic = async (req, res) => {
    try {
        const data = await clinicService.getClinic(req.query.id);

        return res.status(200).json(data);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            message: "Get error from sever",
            error: e,
        });
    }
};

const createClinic = async (req, res) => {
    try {
        const data = await clinicService.createClinic(req.body);

        return res.status(200).json(data);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            message: "Get error from sever",
            error: e,
        });
    }
};

const updateClinic = async (req, res) => {
    try {
        const data = await clinicService.updateClinic(req.body);

        return res.status(200).json(data);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            message: "Get error from sever",
            error: e,
        });
    }
};

export { createClinic, updateClinic, getClinic, getAllClinic };
