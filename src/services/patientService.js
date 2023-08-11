import db from "../models";
import _ from "lodash";
import moment from "moment";
import * as emailService from "./emailService";
import { v4 as uuidv4 } from "uuid";
import "dotenv/config";

const checkEmptyObject = (obj) => {
    return Object.keys(obj).find((item) => {
        return !obj[item];
    });
};

const createBooking = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!_.isEmpty(data)) {
                if (
                    data.statusId &&
                    data.doctorId &&
                    data.patientEmail &&
                    data.fullName &&
                    data.gender &&
                    data.dateBirth &&
                    data.date &&
                    data.timeType &&
                    data.reason
                ) {
                    const date = moment(data.date, "DD/MM/YYYY").toDate();
                    // const date = +data.date;
                    const dateBirth = moment(
                        data.dateBirth,
                        "DD/MM/YYYY"
                    ).toDate();
                    const token = uuidv4();
                    const verifyLink = `${process.env.VERIFY_LINK}?doctorId=${data.doctorId}&token=${token}`;
                    const [user, created] = await db.Bookings.findOrCreate({
                        where: {
                            doctorId: data.doctorId,
                            date: date,
                            timeType: data.timeType,
                        },
                        defaults: {
                            statusId: data.statusId,
                            // doctorId: data.doctorId,
                            patientEmail: data.patientEmail,
                            fullName: data.fullName,
                            gender: data.gender,
                            dateBirth: dateBirth,
                            // date: date,
                            // timeType: data.timeType,
                            reason: data.reason,
                            token,
                        },
                    });

                    if (created) {
                        await emailService.sendSimpleEmail({
                            toEmail: data.patientEmail,
                            date: `${moment(data.date)
                                .locale(data.language)
                                .format("dddd")} - ${data.date}`,
                            time: data.timeData,
                            doctorName: data.doctorName,
                            patientName: data.fullName,
                            reason: data.reason,
                            verifyLink,
                        });

                        resolve({
                            errCode: 0,
                            message: "Create booking successfully",
                        });
                    } else {
                        resolve({
                            errCode: 2,
                            message: "This appointment is already booked",
                        });
                    }
                } else {
                    resolve({
                        errCode: 1,
                        message: "Missing parameter",
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

const verifySchedule = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.doctorId || !data.token) {
                resolve({
                    errCode: 1,
                    message: "Missing paremeter",
                });
            } else {
                const book = await db.Bookings.findOne({
                    where: {
                        doctorId: data.doctorId,
                        token: data.token,
                        statusId: "R1",
                    },
                    raw: false,
                });
                if (book) {
                    book.statusId = "R2";
                    book.save();
                    resolve({
                        errCode: 0,
                        message: "Appointment confirmation successful",
                    });
                } else {
                    resolve({
                        errCode: 2,
                        message:
                            "This appointment has been verified or does not exist",
                    });
                }
            }
        } catch (e) {
            reject(e);
        }
    });
};

export { createBooking, verifySchedule };
