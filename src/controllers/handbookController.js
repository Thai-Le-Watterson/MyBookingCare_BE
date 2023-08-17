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
            req.query.limit,
            req.query.haveImg
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

const getHandbookCategory = async (req, res) => {
    try {
        const data = await handbookService.getHandbookCategory(
            req.query.categoryId
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

const getAllHandbook = async (req, res) => {
    try {
        const data = await handbookService.getAllHandbook(
            req.query.limit,
            req.query.orderBy
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

const getAllHandbookByCategory = async (req, res) => {
    try {
        if (!req.query.categoryId) {
            return res.status(200).json({
                errCode: 1,
                message: "Missing parameter",
            });
        }
        const data = await handbookService.getAllHandbookByCategory(
            req.query.categoryId,
            req.query.limit,
            req.query.orderBy
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

const getAllHandbookByCategoryPG = async (req, res) => {
    try {
        if (!req.query.categoryId && !req.query.page) {
            return res.status(200).json({
                errCode: 1,
                message: "Missing parameter",
            });
        }
        const data = await handbookService.getAllHandbookByCategoryPG(
            req.query.categoryId,
            req.query.page,
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

const getHandbook = async (req, res) => {
    try {
        if (!req.query.id) {
            return res.status(200).json({
                errCode: 1,
                message: "Missing parameter",
            });
        }

        const data = await handbookService.getHandbook(
            req.query.id,
            req.query.isIncreaseViews
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
    getHandbookCategory,
    deleteHandbookCategory,
    updateHandbookCategory,
    getAllHandbook,
    getAllHandbookByCategory,
    getAllHandbookByCategoryPG,
    getHandbook,
    createHandbook,
};
