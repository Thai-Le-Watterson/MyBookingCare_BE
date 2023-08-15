"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Category_Handbook extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Category_Handbook.hasMany(models.Handbooks, {
                foreignKey: "categoryId",
                as: "categoryData",
            });
        }
    }
    Category_Handbook.init(
        {
            name: DataTypes.STRING,
            image: DataTypes.BLOB("long"),
        },
        {
            sequelize,
            modelName: "Category_Handbooks",
        }
    );
    return Category_Handbook;
};
