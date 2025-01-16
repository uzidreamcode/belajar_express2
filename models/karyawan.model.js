'use strict';

module.exports = (sequelize, DataTypes) => {
  const Karyawan = sequelize.define(
    'Karyawan',
    {
      id_karyawan: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nama: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      alamat: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      no_telp: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      },
    },
    {
      tableName: 'karyawan', 
      freezeTableName: true, 
      timestamps: false, 
    }
  );

  Karyawan.associate = (models) => {
    Karyawan.hasMany(models.User, {
      foreignKey: 'id_karyawan',
      as: 'users',
    });
  };

  return Karyawan;
};
