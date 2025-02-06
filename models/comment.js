const { Sequelize, DataTypes, Model } = require("sequelize");

class Comment extends Model {
  static initiate(sequelize) {
    return super.init(
      {
        comment_id: {
          type: DataTypes.BIGINT,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        comment_parent_id: {
          type: DataTypes.BIGINT,
          allowNull: false,
        },
        comment_text: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        created_at: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW,
        },
        updated_at: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW,
        },
        summary_id: {
          type: DataTypes.BIGINT,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: "Comment",
        tableName: "comment",
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }

  static associate(db) {
    db.Comment.belongsTo(db.Summary, {
      foreignKey: "summary_id",
      targetKey: "summary_id",
      onDelete: "CASCADE",
    });

    db.Comment.hasMany(db.Comment, {
      foreignKey: "comment_parent_id",
      sourceKey: "comment_id",
      as: "replies",
    });
  }
}

module.exports = Comment;