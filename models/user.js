const { Sequelize, DataTypes } = require('sequelize');

class User extends Sequelize.Model {
  static initiate(sequelize) {
    return super.init(
      {
        user_id: {
          type: DataTypes.BIGINT,
          autoIncrement: true,
          primaryKey: true,
        },
        user_name: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
        user_email: {
          type: DataTypes.STRING(255),
          allowNull: false,
          unique: true,
        },
        email_verified: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        user_pwd: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        ban_count: {
          type: DataTypes.BIGINT,
          allowNull: false,
          defaultValue: 0,
        },
        created_at: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        },
        updated_at: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: "User",
        tableName: "user",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {
    db.User.hasMany(db.Library, {
      foreignKey: 'user_id',
      sourceKey: 'user_id',
    });
  }
}

module.exports = User;