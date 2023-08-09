"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Clinics", {
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
            address: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            image: {
                allowNull: false,
                type: Sequelize.BLOB("long"),
            },
            introduceHTML: {
                type: Sequelize.TEXT,
            },
            introduceMarkDown: {
                type: Sequelize.TEXT,
            },
            professionalHTML: {
                type: Sequelize.TEXT,
            },
            professionalMarkDown: {
                type: Sequelize.TEXT,
            },
            equipmentHTML: {
                type: Sequelize.TEXT,
            },
            equipmentMarkDown: {
                type: Sequelize.TEXT,
            },
            locationHTML: {
                type: Sequelize.TEXT,
            },
            locationMarkDown: {
                type: Sequelize.TEXT,
            },
            procedureHTML: {
                type: Sequelize.TEXT,
            },
            procedureMarkDown: {
                type: Sequelize.TEXT,
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
        await queryInterface.dropTable("Clinics");
    },
};
