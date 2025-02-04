const { Sequelize, DataTypes } = require('sequelize');

class Library extends Sequelize.Model {
  static initiate(sequelize) {
    return super.init(
      {
        library_id: {
          type: DataTypes.BIGINT,
          autoIncrement: true,
          primaryKey: true,
        },
        user_id: {
          type: DataTypes.BIGINT,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: "Library",
        tableName: "library",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {
    db.Library.belongsTo(db.User, {
      foreignKey: 'user_id',
      targetKey: 'user_id',
    });
  }
}

module.exports = Library;