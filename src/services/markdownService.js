import db from "../models";

const createMarkdown = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.MarkDowns.create({
                contentHTML: data.contentHTML,
                contentMarkDown: data.contentMarkDown,
                description: data.description,
                doctorId: data.selectDoctorId,
            });

            resolve({
                errCode: 0,
                message: "Create markdown successfully",
            });
        } catch (e) {
            reject(e);
        }
    });
};

const updateMarkdown = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.MarkDowns.update(
                {
                    contentHTML: data.contentHTML,
                    contentMarkDown: data.contentMarkDown,
                    description: data.description,
                },
                {
                    where: {
                        doctorId: data.selectDoctorId,
                    },
                }
            );

            resolve({
                errCode: 0,
                message: "Update markdown successfully",
            });
        } catch (e) {
            reject(e);
        }
    });
};

export { createMarkdown, updateMarkdown };
