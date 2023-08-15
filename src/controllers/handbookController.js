import * as handbookService from "../services/handbookService";

const createHandbookCategory = async (req, res) => {
    try {
        const data = await handbookService.createHandbookCategory(req.body);

        return res.status(200).json(data);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            message: "Get error from sever",
            error: e,
        });
    }
};

const updateHandbookCategory = async (req, res) => {
    try {
        const data = await handbookService.updateHandbookCategory(req.body);

        return res.status(200).json(data);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            message: "Get error from sever",
            error: e,
        });
    }
};

const deleteHandbookCategory = async (req, res) => {
    try {
        const data = await handbookService.deleteHandbookCategory(req.body);
        // console.log(">>> check req.body: ", req.body);
        return res.status(200).json(data);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            message: "Get error from sever",
            error: e,
        });
    }
};

const getAllHandbookCategory = async (req, res) => {
    try {
        const data = await handbookService.getAllHandbookCategory(
            req.query.limit
        );

        return res.status(200).json(data);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            message: "Get error from sever",
            error: e,
        });
    }
};

const createHandbook = async (req, res) => {
    try {
        const data = await handbookService.createHandbook(req.body);

        return res.status(200).json(data);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            message: "Get error from sever",
            error: e,
        });
    }
};

export {
    createHandbookCategory,
    getAllHandbookCategory,
    deleteHandbookCategory,
    updateHandbookCategory,
    createHandbook,
};
