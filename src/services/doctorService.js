import db from "../models";

const getTopDoctors = (limit) => {
    return new Promise(async (resolve, reject) => {
        try {
            const topDoctors = await db.Users.findAll({
                limit: limit ? +limit : 10,
                where: { roleId: "R2" },
            });

            if (topDoctors) {
                resolve({
                    errorCode: 0,
                    message: "Get top doctors successfuly",
                    topDoctors,
                });
            } else {
                resolve({
                    errorCode: 1,
                    message: "Get top doctor fail",
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

export { getTopDoctors };
