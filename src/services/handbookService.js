import db from "../models";
import _ from "lodash";
import moment from "moment";
const { Op } = require("sequelize");

const checkEmptyObject = (obj) => {
    return Object.keys(obj).find((item) => {
        return !obj[item];
    });
};

const createHandbookCategory = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!_.isEmpty(data) || data.name) {
                const [user, created] =
                    await db.Category_Handbooks.findOrCreate({
                        where: {
                            name: data.name,
                        },
                        defaults: {
                            image: data.image || null,
                        },
                    });

                if (created) {
                    resolve({
                        errCode: 0,
                        message: "Create category successfully",
                    });
                } else {
                    resolve({
                        errCode: 2,
                        message: "This category is already exist",
                    });
                }
            } else {
                resolve({
                    errCode: 1,
                    message: "Missing parameter",
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

const updateHandbookCategory = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!_.isEmpty(data) || data.name) {
                const category = await db.Category_Handbooks.findOne({
                    where: {
                        name: data.name,
                    },
                });

                if (category && !_.isEmpty(category)) {
                    category.name = data.name;
                    category.image = data.image;
                    category.save();

                    resolve({
                        errCode: 0,
                        message: "Update category successfully",
                    });
                } else {
                    resolve({
                        errCode: 2,
                        message: "This category doesn't exist",
                    });
                }
            } else {
                resolve({
                    errCode: 1,
                    message: "Missing parameter",
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

const deleteHandbookCategory = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!_.isEmpty(data) && data.id) {
                const category = await db.Category_Handbooks.findOne({
                    where: {
                        id: data.id,
                    },
                    raw: false,
                });

                if (category && !_.isEmpty(category)) {
                    await category.destroy();

                    resolve({
                        errCode: 0,
                        message: "Delete category successfully",
                    });
                } else {
                    resolve({
                        errCode: 0,
                        message: "Category is not found",
                    });
                }
            } else {
                resolve({
                    errCode: 1,
                    message: "Missing parameter",
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

const getAllHandbookCategory = (limit, haveImg = "0") => {
    //haveImg: 0 - Get all; 1 - Only have Img; 2 - Get all but don't get image; -1 - Only don't have Img,
    return new Promise(async (resolve, reject) => {
        try {
            let condition = {};
            if (+limit !== -1) {
                condition = {
                    limit: +limit && +limit > 0 ? +limit : 10,
                };
            }
            if (haveImg && haveImg === "1")
                condition.where = {
                    [Op.and]: [
                        { image: { [Op.not]: null } },
                        { image: { [Op.ne]: "no_issue" } },
                    ],
                };
            else if (haveImg && haveImg === "-2") {
                condition.attributes = ["id", "name"];
            }
            console.log(">>> check haveImg: ", haveImg);
            const categories = await db.Category_Handbooks.findAll(condition);

            if (categories && !_.isEmpty(categories)) {
                resolve({
                    errCode: 0,
                    message: "Get all category successfully",
                    categories,
                });
            } else {
                resolve({
                    errCode: 2,
                    message: "Get all category fail",
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

const getHandbookCategory = (categoryId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const category = await db.Category_Handbooks.findOne({
                where: { id: categoryId },
            });

            if (category && !_.isEmpty(category)) {
                resolve({
                    errCode: 0,
                    message: "Get category successfully",
                    category,
                });
            } else {
                resolve({
                    errCode: 2,
                    message: "Get category fail",
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

const getAllHandbook = (limit, orderBy = "publicationDate") => {
    return new Promise(async (resolve, reject) => {
        try {
            const condition = {
                limit: +limit && +limit > 0 ? +limit : 10,
                order: [[orderBy, "DESC"]],
                // attributes: ["id", "name", "views"],
            };
            // console.log(">>> check orderBy: ", orderBy);
            const handbooks = await db.Handbooks.findAll(condition);

            if (handbooks && !_.isEmpty(handbooks)) {
                resolve({
                    errCode: 0,
                    message: "Get all handbook successfully",
                    handbooks,
                });
            } else {
                resolve({
                    errCode: 2,
                    message: "Get all handbook fail",
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

const getAllHandbookByCategory = (categoryId, limit) => {
    return new Promise(async (resolve, reject) => {
        try {
            const condition = {
                where: { categoryId },
                limit: +limit && +limit > 0 ? +limit : 10,
                order: [["publicationDate", "DESC"]],
            };

            const handbooks = await db.Handbooks.findAll(condition);

            if (handbooks && !_.isEmpty(handbooks)) {
                resolve({
                    errCode: 0,
                    message: "Get all handbook by category successfully",
                    handbooks,
                });
            } else {
                resolve({
                    errCode: 2,
                    message: "Get all handbook by category fail",
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

const getAllHandbookByCategoryPG = (categoryId, page, limit) => {
    return new Promise(async (resolve, reject) => {
        try {
            const condition = {
                where: { categoryId },
                limit: +limit && +limit > 4 ? +limit : 4,
                offset: (+page - 1) * +limit,
                order: [["publicationDate", "DESC"]],
                // attributes: ["id", "categoryId", "name"],
            };

            const count = await db.Handbooks.count({
                where: { categoryId },
            });

            // console.log(">>> check limit: ", +limit && +limit > 0 ? +limit : 4);
            // console.log(">>> check offset: ", (+page - 1) * +limit);

            const handbooks = await db.Handbooks.findAll(condition);

            if (handbooks && !_.isEmpty(handbooks)) {
                resolve({
                    errCode: 0,
                    message: "Get handbooks by category successfully",
                    count,
                    handbooks,
                });
            } else {
                resolve({
                    errCode: 2,
                    message: "Get handbooks by category fail",
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

const getHandbook = (id, isIncreaseViews = "0") => {
    return new Promise(async (resolve, reject) => {
        try {
            const handbook = await db.Handbooks.findOne({
                where: { id },
                include: [
                    {
                        model: db.Category_Handbooks,
                        as: "categoryData",
                        attributes: ["name"],
                    },
                ],
                raw: false,
            });

            if (handbook && !_.isEmpty(handbook)) {
                if (isIncreaseViews && isIncreaseViews !== "0") {
                    handbook.views = ++handbook.views;
                    handbook.save();
                }
                resolve({
                    errCode: 0,
                    message: "Get handbook successfully",
                    handbook,
                });
            } else {
                resolve({
                    errCode: 2,
                    message: "Get handbook fail",
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

const createHandbook = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (
                !_.isEmpty(data) ||
                data.name ||
                data.image ||
                data.doctorId ||
                data.categoryId ||
                data.publicationDate ||
                data.updateDate ||
                data.contentHTML ||
                data.contentMarkDown
            ) {
                const publicationDate = moment(
                    data.publicationDate,
                    "DD/MM/YYYY"
                ).toDate();
                const updateDate = moment(
                    data.updateDate,
                    "DD/MM/YYYY"
                ).toDate();

                const [handbook, created] = await db.Handbooks.findOrCreate({
                    where: {
                        name: data.name,
                    },
                    defaults: {
                        image: data.image || null,
                        doctorId: data.doctorId,
                        categoryId: data.categoryId,
                        publicationDate,
                        updateDate,
                        contentHTML: data.contentHTML,
                        contentMarkDown: data.contentMarkDown,
                    },
                });

                if (created) {
                    resolve({
                        errCode: 0,
                        message: "Create handbook successfully",
                    });
                } else {
                    resolve({
                        errCode: 2,
                        message: "This handbook is already exist",
                    });
                }
            } else {
                resolve({
                    errCode: 1,
                    message: "Missing parameter",
                });
            }
        } catch (e) {
            reject(e);
        }
    });
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
