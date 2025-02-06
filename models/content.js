const { Sequelize, DataTypes } = require('sequelize');

class Content extends Sequelize.Model {
  static initiate(sequelize) {
    return super.init(
      {
        content_id: {
          type: DataTypes.BIGINT,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        content_title: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        content_type: {
          type: DataTypes.ENUM('book', 'drama', 'movie'),
          allowNull: false,
          defaultValue: 'book',
        },
        content_genre: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        content_plot: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        created_at: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: "Content",
        tableName: "content",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  
  static associate(db) {
    db.Content.hasMany(db.Summary, {
      foreignKey: 'content_id',
      sourceKey: 'content_id',
    });
  }
}

module.exports = Content;