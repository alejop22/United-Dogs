const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('raza', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        height: {
            type: DataTypes.STRING,
            allowNull: false
        },
        weight: {
            type: DataTypes.STRING,
            allowNull: false
        },
        life_span: {
            type: DataTypes.STRING
        }
    });
}