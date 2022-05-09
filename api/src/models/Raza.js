const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('raza', {
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        altura: {
            type: DataTypes.STRING,
            allowNull: false
        },
        peso: {
            type: DataTypes.STRING,
            allowNull: false
        },
        años_vida: {
            type: DataTypes.STRING
        }
    });
}