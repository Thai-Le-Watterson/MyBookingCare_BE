"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Allcode extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Allcode.hasMany(models.Users, {
                foreignKey: "positionId",
                as: "positionData",
            });
            Allcode.hasMany(models.Users, {
                foreignKey: "gender",
                as: "genderData",
            });
            Allcode.hasMany(models.Schedules, {
                foreignKey: "timeType",
                as: "timeData",
            });
            Allcode.hasMany(models.Doctor_Infors, {
                foreignKey: "priceId",
                as: "priceData",
            });
            Allcode.hasMany(models.Doctor_Infors, {
                foreignKey: "provinceId",
                as: "provinceData",
            });
            Allcode.hasMany(models.Doctor_Infors, {
                foreignKey: "paymentId",
                as: "paymentData",
            });
            Allcode.hasMany(models.Bookings, {
                foreignKey: "timeType",
                as: "timeBookingData",
            });
            Allcode.hasMany(models.Bookings, {
                foreignKey: "gender",
                as: "genderBookingData",
            });
        }
    }
    Allcode.init(
        {
            keyMap: DataTypes.STRING,
            type: DataTypes.STRING,
            valueEn: DataTypes.STRING,
            valueVi: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "Allcodes",
        }
    );
    return Allcode;
};
