import db from "../models";

const getTopDoctors = (limit) => {
    return new Promise(async (resolve, reject) => {
        try {
            const topDoctors = await db.Users.findAll({
                limit: limit ? +limit : 10,
                where: { roleId: "R2" },
                attributes: {
                    exclude: ["password"],
                },
                include: [
                    {
                        model: db.Allcodes,
                        as: "positionData",
                        attributes: ["valueVi", "valueEn"],
                    },
                    {
                        model: db.Allcodes,
                        as: "genderData",
                        attributes: ["valueVi", "valueEn"],
                    },
                ],
                raw: true,
                nest: true,
            });

            if (topDoctors) {
                resolve({
                    errCode: 0,
                    message: "Get top doctors successfuly",
                    topDoctors,
                });
            } else {
                resolve({
                    errCode: 1,
                    message: "Get top doctor fail",
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

export { getTopDoctors };
