"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class MarkDown extends Model {
        static associate(models) {
            MarkDown.hasOne(models.Users, {
                foreignKey: "id",
            });
        }
    }
    MarkDown.init(
        {
            contentHTML: DataTypes.TEXT("long"),
            contentMarkDown: DataTypes.TEXT("long"),
            description: DataTypes.TEXT("long"),
            doctorId: DataTypes.INTEGER,
            specialtyId: DataTypes.INTEGER,
            clinicId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "MarkDowns",
        }
    );
    return MarkDown;
};
