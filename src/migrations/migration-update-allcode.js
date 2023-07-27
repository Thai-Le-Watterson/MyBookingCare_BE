"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.renameColumn("Allcodes", "key", "keyMap");
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.renameColumn("Allcodes", "keyMap", "key");
    },
};
