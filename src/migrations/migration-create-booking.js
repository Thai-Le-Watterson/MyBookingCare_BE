"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Bookings", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            statusId: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            doctorId: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            patientEmail: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            fullName: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            gender: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            dateBirth: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            date: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            timeType: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            reason: {
                allowNull: true,
                type: Sequelize.STRING,
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
        await queryInterface.dropTable("Bookings");
    },
};
