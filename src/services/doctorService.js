import db from "../models";
import _ from "lodash";
import moment from "moment";
import * as emailService from "./emailService";

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
                    {
                        model: db.Doctor_Infors,
                        as: "doctorInforData",
                        attributes: ["specialtyId"],
                        include: [
                            {
                                model: db.Specialties,
                                as: "specialtyData",
                                attributes: ["name"],
                            },
                        ],
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

const getAllDoctors = (limit) => {
    return new Promise(async (resolve, reject) => {
        try {
            const condition = {
                where: { roleId: "R2" },
                attributes: { exclude: ["password"] },
                include: [
                    {
                        model: db.Doctor_Infors,
                        as: "doctorInforData",
                        attributes: ["specialtyId"],
                        include: [
                            {
                                model: db.Specialties,
                                as: "specialtyData",
                                attributes: ["name"],
                            },
                        ],
                    },
                ],
            };

            if (limit && +limit && +limit > 0) {
                condition.limit = +limit;
            } else if (limit !== "ALL") {
                condition.limit = 10;
            }

            const doctors = await db.Users.findAll(condition);

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

const getDoctorInforBySpecialty = (id, provinceId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const condition = { specialtyId: id };

            provinceId &&
                provinceId !== "ALL" &&
                (condition.provinceId = provinceId);

            const doctorsInfor = await db.Doctor_Infors.findAll({
                where: condition,
                attributes: ["doctorId"],
            });

            if (doctorsInfor) {
                resolve({
                    errCode: 0,
                    message: "Get doctor infor successfully",
                    doctorsInfor,
                });
            } else {
                resolve({
                    errCode: 2,
                    message: "Get doctor infor fail",
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

const getDoctorInforByClinic = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const doctorsInfor = await db.Doctor_Infors.findAll({
                where: { clinicId: id },
                attributes: ["doctorId"],
            });

            if (doctorsInfor && !_.isEmpty(doctorsInfor)) {
                resolve({
                    errCode: 0,
                    message: "Get doctor infor successfully",
                    doctorsInfor,
                });
            } else {
                resolve({
                    errCode: 2,
                    message: "Get doctor infor fail",
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

const getDoctorDetail = (reqId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const id = +reqId;
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
                    {
                        model: db.Doctor_Infors,
                        as: "doctorInforData",
                        attributes: [
                            "priceId",
                            "provinceId",
                            "paymentId",
                            // "addressClinic",
                            // "nameClinic",
                            "note",
                        ],
                        include: [
                            {
                                model: db.Allcodes,
                                as: "priceData",
                                attributes: ["keyMap", "valueVi", "valueEn"],
                            },
                            {
                                model: db.Allcodes,
                                as: "provinceData",
                                attributes: ["keyMap", "valueVi", "valueEn"],
                            },
                            {
                                model: db.Allcodes,
                                as: "paymentData",
                                attributes: ["keyMap", "valueVi", "valueEn"],
                            },
                            {
                                model: db.Specialties,
                                as: "specialtyData",
                                attributes: ["id", "name"],
                            },
                            {
                                model: db.Clinics,
                                as: "clinicData",
                                attributes: ["name", "address"],
                            },
                        ],
                    },
                ],
                raw: true,
                nest: true,
            });

            // doctor.doctorInforData = { ...doctorInforData };
            // console.log("check doctor: ", doctor);
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

const getSchedule = (req) => {
    return new Promise(async (resolve, reject) => {
        try {
            // const date = moment(req.date, "DD/MM/YYYY").toDate();
            const date = moment.utc(req.date, "DD/MM/YYYY").toDate();
            // const timestamp = moment(date, "DD/MM/YYYY").valueOf();
            const doctorId = +req.doctorId;

            const doctorSchedule = await db.Schedules.findAll({
                where: {
                    doctorId,
                    date,
                },
                include: [
                    {
                        model: db.Allcodes,
                        as: "timeData",
                        attributes: ["valueEn", "valueVi"],
                    },
                ],
                order: [["timeType", "ASC"]],
                raw: true,
                nest: true,
            });

            if (doctorSchedule && !_.isEmpty(doctorSchedule)) {
                resolve({
                    errCode: 0,
                    message: "Get doctor schedule successfully",
                    schedule: doctorSchedule,
                });
            } else {
                resolve({
                    errCode: 1,
                    message: "Get doctor schedule fail",
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

            // console.log("check create bulk ========================");
            // console.log(differenceSchedules);
            // console.log({
            //     dateDB: scheduleExists[0].date,
            //     date: data.dateString,
            // });
            // console.log(scheduleExists[0].date === data.dateString);

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

const createDoctorInfor = (data) => {
    return new Promise(async (resovle, reject) => {
        try {
            const isExist = await db.Doctor_Infors.findOne({
                where: { doctorId: data.doctorId },
            });
            // console.log(isExist);
            if (isExist) {
                resovle({
                    errCode: 2,
                    message: "This doctor already has this information",
                });
            } else {
                await db.Doctor_Infors.create({
                    doctorId: data.doctorId,
                    priceId: data.priceId,
                    provinceId: data.provinceId,
                    paymentId: data.paymentId,
                    specialtyId: data?.specialtyId,
                    clinicId: data?.clinicId,
                    // addressClinic: data.addressClinic,
                    // nameClinic: data.nameClinic,
                    note: data.note,
                    count: data.count,
                });

                resovle({
                    errCode: 0,
                    message: "Create doctor infor successfully",
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

const updateDoctorInfor = (data) => {
    return new Promise(async (resovle, reject) => {
        try {
            await db.Doctor_Infors.update(
                {
                    priceId: data.priceId,
                    provinceId: data.provinceId,
                    paymentId: data.paymentId,
                    specialtyId: data?.specialtyId,
                    clinicId: data?.clinicId,
                    // addressClinic: data.addressClinic,
                    // nameClinic: data.nameClinic,
                    note: data.note,
                    count: data.count,
                },
                {
                    where: { doctorId: data.doctorId },
                }
            );

            resovle({
                errCode: 0,
                message: "Update doctor infor successfully",
            });
        } catch (e) {
            reject(e);
        }
    });
};

const getAllBooking = (req) => {
    return new Promise(async (resolve, reject) => {
        try {
            const date = moment(req.date, "DD/MM/YYYY").toDate();
            // const date = moment.utc(req.date, "DD/MM/YYYY").toDate();
            // const timestamp = moment(date, "DD/MM/YYYY").valueOf();
            const doctorId = +req.doctorId;

            const bookings = await db.Bookings.findAll({
                where: {
                    doctorId,
                    date,
                    statusId: "R2",
                },
                include: [
                    {
                        model: db.Allcodes,
                        as: "timeBookingData",
                        attributes: ["valueEn", "valueVi"],
                    },
                    {
                        model: db.Allcodes,
                        as: "genderBookingData",
                        attributes: ["valueEn", "valueVi"],
                    },
                    {
                        model: db.Users,
                        as: "doctorData",
                        attributes: ["fullName"],
                    },
                ],
                order: [["timeType", "ASC"]],
                raw: true,
                nest: true,
            });
            if (bookings && !_.isEmpty(bookings)) {
                // console.log("check bookings date: ", bookings[0].date);
                // console.log("check date: ", date);
                resolve({
                    errCode: 0,
                    message: "Get bookings successfully",
                    bookings: bookings,
                });
            } else {
                resolve({
                    errCode: 1,
                    message: "Get bookings fail",
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

const confirmBooking = (req) => {
    return new Promise(async (resolve, reject) => {
        try {
            const date = moment(req.date, "DD/MM/YYYY").toDate();
            // const date = moment.utc(req.date, "DD/MM/YYYY").toDate();
            // const timestamp = moment(date, "DD/MM/YYYY").valueOf();

            const booking = await db.Bookings.findOne({
                where: {
                    doctorId: req.doctorId,
                    patientEmail: req.patientEmail,
                    date,
                    statusId: "R2",
                },
                raw: false,
            });
            if (booking && !_.isEmpty(booking)) {
                booking.statusId = "R3";
                booking.save();
                await emailService.sendConfirmEmail(req);

                resolve({
                    errCode: 0,
                    message: "Confirm booking successfully",
                });
            } else {
                resolve({
                    errCode: 1,
                    message: "Confirm booking fail",
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

export {
    getTopDoctors,
    getAllDoctors,
    getDoctorDetail,
    bulkCreateSchedule,
    getSchedule,
    createDoctorInfor,
    updateDoctorInfor,
    getDoctorInforBySpecialty,
    getDoctorInforByClinic,
    getAllBooking,
    confirmBooking,
};
