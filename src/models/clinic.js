"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Clinic extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Clinic.hasMany(models.Doctor_Infors, {
                foreignKey: "clinicId",
                as: "clinicData",
            });
        }
    }
    Clinic.init(
        {
            name: DataTypes.STRING,
            address: DataTypes.STRING,
            image: DataTypes.BLOB("long"),
            introduceHTML: DataTypes.TEXT,
            introduceMarkDown: DataTypes.TEXT,
            professionalHTML: DataTypes.TEXT,
            professionalMarkDown: DataTypes.TEXT,
            equipmentHTML: DataTypes.TEXT,
            equipmentMarkDown: DataTypes.TEXT,
            locationHTML: DataTypes.TEXT,
            locationMarkDown: DataTypes.TEXT,
            procedureHTML: DataTypes.TEXT,
            procedureMarkDown: DataTypes.TEXT,
        },
        {
            sequelize,
            modelName: "Clinics",
        }
    );
    return Clinic;
};
