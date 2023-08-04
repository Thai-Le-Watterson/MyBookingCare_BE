import db from "../models";
import _ from "lodash";
import moment from "moment";

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
                    const date = moment(data.date, "DD/MM/YYYY");
                    const dateBirth = moment(data.dateBirth, "DD/MM/YYYY");

                    await db.Bookings.create({
                        statusId: data.statusId,
                        doctorId: data.doctorId,
                        patientEmail: data.patientEmail,
                        fullName: data.fullName,
                        gender: data.gender,
                        dateBirth: dateBirth,
                        date: date,
                        timeType: data.timeType,
                        reason: data.reason,
                    });
                    resolve({
                        errCode: 0,
                        message: "Create booking successfully",
                    });
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

export { createBooking };
