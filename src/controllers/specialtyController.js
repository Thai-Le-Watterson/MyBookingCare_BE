import * as specialtyService from "../services/specialtyService";

const createSpecialty = async (req, res) => {
    try {
        const data = await specialtyService.createSpecialty(req.body);
        return res.status(200).json(data);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            message: "Get error from sever",
            error: e,
        });
    }
};

const getSpecialty = async (req, res) => {
    try {
        const data = await specialtyService.getSpecialty(req.query.id);
        return res.status(200).json(data);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            message: "Get error from server",
            error: e,
        });
    }
};

const getAllSpecialties = async (req, res) => {
    try {
        // console.log(">>> into controller");
        const data = await specialtyService.getAllSpecialties();

        return res.status(200).json(data);
    } catch (e) {
        // console.log("check error: ", e);
        return res.status(200).json({
            errCode: -1,
            message: "Get error from server",
            error: e,
        });
    }
};

export { createSpecialty, getAllSpecialties, getSpecialty };
