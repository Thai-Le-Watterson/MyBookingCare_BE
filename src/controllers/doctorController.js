import * as doctorService from "../services/doctorService";

const getTopDoctors = async (req, res) => {
    try {
        const data = await doctorService.getTopDoctors(req.query.limit);

        return res.status(200).json({
            data,
        });
    } catch (e) {
        return {
            errorCode: -1,
            message: "Get error from sever",
            error: e,
        };
    }
};

export { getTopDoctors };
