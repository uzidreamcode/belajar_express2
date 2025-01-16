'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Absensi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define associations here if needed
    }
  }

  Absensi.init(
    {
      id_absensi: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      nama: {
        type: DataTypes.STRING,
        allowNull: false
      },
      role: {
        type: DataTypes.ENUM('admin', 'user'),
        allowNull: false
      },
      jam_absensi: {
        type: DataTypes.DATE,
        allowNull: false
      },
      foto: {
        type: DataTypes.STRING,
        allowNull: false
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'Absensi',
      tableName: 'absensi',
      underscored: true,
      timestamps: true // Automatically uses `createdAt` and `updatedAt`
    }
  );

  return Absensi;
};
