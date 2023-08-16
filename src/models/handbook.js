"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Handbook extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Handbook.belongsTo(models.Category_Handbooks, {
                foreignKey: "categoryId",
                targetKey: "id",
                as: "categoryData",
            });
        }
    }
    Handbook.init(
        {
            name: DataTypes.STRING,
            doctorId: DataTypes.INTEGER,
            categoryId: DataTypes.INTEGER,
            publicationDate: DataTypes.DATE,
            updateDate: DataTypes.DATE,
            views: DataTypes.INTEGER,
            image: DataTypes.BLOB("long"),
            contentHTML: DataTypes.TEXT,
            contentMarkDown: DataTypes.TEXT,
        },
        {
            sequelize,
            modelName: "Handbooks",
        }
    );
    return Handbook;
};
