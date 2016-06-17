"use strict";

module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("User", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        email: DataTypes.STRING,
        password: DataTypes.STRING
    });

    return User;
};
