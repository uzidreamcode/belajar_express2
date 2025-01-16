'use strict';
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('User', {
    id_user: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_karyawan: {
      type: DataTypes.INTEGER,
      references: {
        model: 'karaywan',
        key: 'id_karyawan',
      },
      allowNull: false, 
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false, 
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false, 
    },
    role: {
      type: DataTypes.ENUM('admin', 'user'),
      allowNull: false, 
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    }
  }, {
    tableName: 'users',
    underscored: true, 
    timestamps: false, 
  });

  // Relasi dengan Karyawan
  Users.associate = function(models) {
    Users.belongsTo(models.Karyawan, {
      foreignKey: 'id_karyawan',
      onDelete: 'CASCADE', 
      onUpdate: 'CASCADE', 
    });
  };

  return Users;
};
