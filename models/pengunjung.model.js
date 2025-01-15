'use strict';

module.exports = (sequelize, DataTypes) => {
  const Pengunjung = sequelize.define(
    'Pengunjung',
    {
      id_pengunjung: {
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
      tableName: 'pengunjung', 
      freezeTableName: true, 
      timestamps: false, 
    }
  );

  Pengunjung.associate = (models) => {
    Pengunjung.hasMany(models.User, {
      foreignKey: 'id_pengunjung',
      as: 'users',
    });
  };

  return Pengunjung;
};
