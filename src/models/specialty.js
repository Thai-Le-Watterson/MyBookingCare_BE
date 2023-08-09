"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Specialty extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Specialty.hasMany(models.Doctor_Infors, {
                foreignKey: "specialtyId",
                as: "specialtyData",
            });
        }
    }
    Specialty.init(
        {
            name: DataTypes.STRING,
            contentHTML: DataTypes.TEXT,
            contentMarkDown: DataTypes.TEXT,
            image: DataTypes.BLOB("long"),
        },
        {
            sequelize,
            modelName: "Specialties",
        }
    );
    return Specialty;
};
