module.exports = {
    up(queryInterface, Sequelize) {
        return Promise.all([
            queryInterface.addColumn("Handbooks", "views", {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0,
            }),
        ]);
    },

    down(queryInterface, Sequelize) {
        return Promise.all([queryInterface.removeColumn("Handbooks", "views")]);
    },
};
