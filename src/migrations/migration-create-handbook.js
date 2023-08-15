"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Handbooks", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            name: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            doctorId: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            categoryId: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            publicationDate: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updateDate: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            image: {
                allowNull: false,
                type: Sequelize.BLOB("long"),
            },
            contentHTML: {
                allowNull: false,
                type: Sequelize.TEXT("long"),
            },
            contentMarkDown: {
                allowNull: false,
                type: Sequelize.TEXT("long"),
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("Handbooks");
    },
};
