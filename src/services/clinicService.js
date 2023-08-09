import db from "../models";
import _ from "lodash";

const checkEmptyData = (data) => {
    const arrFields = [
        "image",
        "introduceHTML",
        "introduceMarkDown",
        "professionalHTML",
        "professionalMarkDown",
        "equipmentHTML",
        "equipmentMarkDown",
        "locationHTML",
        "locationMarkDown",
    ];
    let result = "";
    for (const value of arrFields) {
        if (!data[value]) {
            result = value;
            break;
        }
    }

    return result;
};

const getAllClinic = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const clinics = await db.Clinics.findAll();

            if (clinics && !_.isEmpty(clinics)) {
                resolve({
                    errCode: 0,
                    message: "Get all clinic successfully",
                    clinics,
                });
            } else {
                resolve({
                    errCode: 1,
                    message: "Get all clinic fail",
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

const getClinic = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const clinic = await db.Clinics.findOne({
                where: { id },
            });

            if (clinic && !_.isEmpty(clinic)) {
                resolve({
                    errCode: 0,
                    message: "Get clinic successfully",
                    clinic,
                });
            } else {
                resolve({
                    errCode: 1,
                    message: "Get clinic fail",
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

const createClinic = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!_.isEmpty(data) && !checkEmptyData(data)) {
                const [clinic, created] = await db.Clinics.findOrCreate({
                    where: {
                        name: data.name,
                        address: data.address,
                    },
                    defaults: {
                        image: data.image,
                        introduceHTML: data.introduceHTML,
                        introduceMarkDown: data.introduceMarkDown,
                        professionalHTML: data.professionalHTML,
                        professionalMarkDown: data.professionalMarkDown,
                        equipmentHTML: data.equipmentHTML,
                        equipmentMarkDown: data.equipmentMarkDown,
                        locationHTML: data.locationHTML,
                        locationMarkDown: data.locationMarkDown,
                        procedureHTML: data.procedureHTML,
                        procedureMarkDown: data.procedureMarkDown,
                    },
                });

                if (created) {
                    resolve({
                        errCode: 0,
                        message: "Create clinic successfully",
                    });
                } else {
                    resolve({
                        errCode: 1,
                        message: "This clinic already exists",
                    });
                }
            } else {
                resolve({
                    errCode: 2,
                    message: "Missing parameter",
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

const updateClinic = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!_.isEmpty(data) && !checkEmptyData(data)) {
                const clinic = await db.Clinics.findOne({
                    where: {
                        name: data.name,
                        address: data.address,
                    },
                    raw: false,
                });

                if (clinic && !_.isEmpty(clinic)) {
                    clinic.image = data.image;
                    clinic.introduceHTML = data.introduceHTML;
                    clinic.introduceMarkDown = data.introduceMarkDown;
                    clinic.professionalHTML = data.professionalHTML;
                    clinic.professionalMarkDown = data.professionalMarkDown;
                    clinic.equipmentHTML = data.equipmentHTML;
                    clinic.equipmentMarkDown = data.equipmentMarkDown;
                    clinic.locationHTML = data.locationHTML;
                    clinic.locationMarkDown = data.locationMarkDown;
                    clinic.procedureHTML = data.procedureHTML;
                    clinic.procedureMarkDown = data.procedureMarkDown;
                    clinic.save();

                    resolve({
                        errCode: 0,
                        message: "Update clinic successfully",
                    });
                } else {
                    resolve({
                        errCode: 1,
                        message: "This clinic does not exist",
                    });
                }
            } else {
                resolve({
                    errCode: 2,
                    message: "Missing parameter",
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

export { createClinic, updateClinic, getAllClinic, getClinic };
