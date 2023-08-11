"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Booking extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Booking.belongsTo(models.Allcodes, {
                foreignKey: "timeType",
                targetKey: "keyMap",
                as: "timeBookingData",
            });
            Booking.belongsTo(models.Allcodes, {
                foreignKey: "gender",
                targetKey: "keyMap",
                as: "genderBookingData",
            });
        }
    }
    Booking.init(
        {
            statusId: DataTypes.STRING,
            doctorId: DataTypes.INTEGER,
            patientEmail: DataTypes.STRING,
            fullName: DataTypes.STRING,
            gender: DataTypes.STRING,
            dateBirth: DataTypes.DATE,
            date: DataTypes.DATE,
            timeType: DataTypes.STRING,
            reason: DataTypes.STRING,
            token: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "Bookings",
        }
    );
    return Booking;
};
