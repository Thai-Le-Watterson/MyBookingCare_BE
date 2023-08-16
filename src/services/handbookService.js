import db from "../models";
import _ from "lodash";
import moment from "moment";

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

const getAllHandbookCategory = (limit) => {
    return new Promise(async (resolve, reject) => {
        try {
            const condition = (+limit && +limit > 0 && { limit: +limit }) || {};
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

const getAllHandbook = (limit, orderBy = "publicationDate") => {
    return new Promise(async (resolve, reject) => {
        try {
            const condition = { order: [[orderBy, "DESC"]] };
            if (+limit && +limit > 0) condition.limit = +limit;
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
                order: [["publicationDate", "DESC"]],
            };
            if (+limit && +limit > 0) condition.limit = +limit;

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
    deleteHandbookCategory,
    updateHandbookCategory,
    getAllHandbook,
    getAllHandbookByCategory,
    getHandbook,
    createHandbook,
};
