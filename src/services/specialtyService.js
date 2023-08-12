import db from "../models";
import _ from "lodash";

const createSpecialty = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.Specialties.create({
                name: data.name,
                contentHTML: data.contentHTML,
                contentMarkDown: data.contentMarkDown,
                image: data.image,
            });
            resolve({
                errCode: 0,
                message: "Create specialty successful",
            });
        } catch (e) {
            reject(e);
        }
    });
};

const getSpecialty = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const specialties = await db.Specialties.findOne({
                where: { id },
            });
            if (specialties && !_.isEmpty(specialties)) {
                resolve({
                    errCode: 0,
                    message: "Get specialty successful",
                    specialties,
                });
            } else {
                resolve({
                    errCode: 1,
                    message: "Get specialty fail",
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

const getAllSpecialties = () => {
    return new Promise(async (resolve, reject) => {
        try {
            // console.log(">>> into service");
            const specialties = await db.Specialties.findAll();
            // console.log(">>>check specialties: ", specialties);

            if (specialties && !_.isEmpty(specialties)) {
                resolve({
                    errCode: 0,
                    message: "Get specialty successful",
                    specialties,
                });
            } else {
                resolve({
                    errCode: 1,
                    message: "Get specialty fail",
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

export { createSpecialty, getSpecialty, getAllSpecialties };
