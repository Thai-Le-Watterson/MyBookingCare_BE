import db from "../models";
import _ from "lodash";
import moment from "moment";

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

const getAllDoctors = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const doctors = await db.Users.findAll({
                where: { roleId: "R2" },
                attributes: { exclude: ["password", "image"] },
            });

            if (doctors) {
                resolve({
                    errCode: 0,
                    message: "Get all doctors successfull",
                    doctors,
                });
            } else {
                resolve({
                    errCode: 1,
                    message: "Get all doctors fail",
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

const getDoctorDetail = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const doctor = await db.Users.findOne({
                where: { id },
                attributes: {
                    exclude: ["password"],
                },
                include: [
                    {
                        model: db.MarkDowns,
                        as: "MarkdownData",
                        attributes: [
                            "contentHTML",
                            "contentMarkDown",
                            "description",
                        ],
                    },
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

            if (doctor) {
                resolve({
                    errCode: 0,
                    message: "Get doctor detail successfully",
                    doctor,
                });
            } else {
                resolve({
                    errCode: 2,
                    message: "Get doctor detail fail",
                    doctor,
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

const bulkCreateSchedule = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            // const date = moment(data.dateString, "DD/MM/YYYY").valueOf();
            const scheduleExists = await db.Schedules.findAll({
                where: { doctorId: data.doctorId, date: data.dateString },
            });
            const differenceSchedules = _.differenceWith(
                data.scheduleDatas,
                scheduleExists,
                (obj1, obj2) => {
                    return obj1.timeType === obj2.timeType;
                }
            );

            if (differenceSchedules && !_.isEmpty(differenceSchedules)) {
                await db.Schedules.bulkCreate(differenceSchedules);
                resolve({
                    errCode: 0,
                    message: "Create new schedule successfully",
                });
            }

            resolve({
                errCode: 1,
                message: "Create new schedule fail",
            });
        } catch (e) {
            reject(e);
        }
    });
};

export { getTopDoctors, getAllDoctors, getDoctorDetail, bulkCreateSchedule };
