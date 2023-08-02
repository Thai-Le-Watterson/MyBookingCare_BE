"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            User.belongsTo(models.Allcodes, {
                foreignKey: "positionId",
                targetKey: "keyMap",
                as: "positionData",
            });
            User.belongsTo(models.Allcodes, {
                foreignKey: "gender",
                targetKey: "keyMap",
                as: "genderData",
            });
            User.belongsTo(models.MarkDowns, {
                foreignKey: "id",
                targetKey: "doctorId",
                as: "MarkdownData",
            });
            User.hasOne(models.Doctor_Infors, {
                foreignKey: "doctorId",
                as: "doctorInforData",
            });
        }
    }
    User.init(
        {
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            fullName: DataTypes.STRING,
            address: DataTypes.STRING,
            phonenumber: DataTypes.INTEGER,
            gender: DataTypes.STRING,
            positionId: DataTypes.STRING,
            roleId: DataTypes.STRING,
            image: DataTypes.BLOB,
        },
        {
            sequelize,
            modelName: "Users",
        }
    );
    return User;
};
