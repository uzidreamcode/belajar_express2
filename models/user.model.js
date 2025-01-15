'use strict';
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('User', {
    id_user: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_pengunjung: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Pengunjung',
        key: 'id_pengunjung',
      },
      allowNull: false, 
    },
    password: {
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

  // Relasi dengan Pengunjung
  Users.associate = function(models) {
    Users.belongsTo(models.Pengunjung, {
      foreignKey: 'id_pengunjung',
      onDelete: 'CASCADE', 
      onUpdate: 'CASCADE', 
    });
  };

  return Users;
};
