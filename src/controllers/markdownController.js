import * as markdownService from "../services/markdownService";

const createMarkdown = async (req, res) => {
    try {
        const result = await markdownService.createMarkdown(req.body);

        res.status(200).json(result);
    } catch (e) {
        res.status(200).json({
            errCode: -1,
            message: "Get error from sever",
            error: e,
        });
    }
};

const updateMarkdown = async (req, res) => {
    try {
        const result = await markdownService.updateMarkdown(req.body);

        res.status(200).json(result);
    } catch (e) {
        res.status(200).json({
            errCode: -1,
            message: "Get error from sever",
            error: e,
        });
    }
};

export { createMarkdown, updateMarkdown };
