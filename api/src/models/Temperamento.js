const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('temperamento', {
        name: {
            type: DataTypes.STRING,
            unique: true
        }
    },
    {
        timestamps: false
    });
}