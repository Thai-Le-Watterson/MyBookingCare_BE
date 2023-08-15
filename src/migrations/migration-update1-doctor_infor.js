module.exports = {
    up(queryInterface, Sequelize) {
        return Promise.all([
            queryInterface.removeColumn("Doctor_Infors", "addressClinic"),
            queryInterface.removeColumn("Doctor_Infors", "nameClinic"),
        ]);
    },

    down(queryInterface, Sequelize) {
        return Promise.all([
            queryInterface.addColumn("Doctor_Infors", "addressClinic", {
                type: Sequelize.STRING,
                allowNull: true,
            }),
            queryInterface.addColumn("Doctor_Infors", "nameClinic", {
                type: Sequelize.STRING,
                allowNull: true,
            }),
        ]);
    },
};
