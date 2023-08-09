"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn("Doctor_Infors", "specialtyId", {
            type: Sequelize.STRING,
            allowNull: true,
        });
        await queryInterface.addColumn("Doctor_Infors", "clinicId", {
            type: Sequelize.STRING,
            allowNull: true,
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.removeColumn("Doctor_Infors", "specialtyId");
        await queryInterface.removeColumn("Doctor_Infors", "clinicId");
    },
};
