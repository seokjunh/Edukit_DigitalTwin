const Sequelize = require("sequelize");

class Answer extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        answerId: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        content: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "Answer",
        tableName: "answers",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {
    //여러댓글은 하나의 유저를 갖는다
    db.Answer.belongsTo(db.User, {
      foreignKey: {
        name: "userId",
        onDelete: "CASCADE",
        as: "User",
      },
    });
    //전체공지엔 여러 댓글이 달린다
    db.Answer.belongsTo(db.FullNotice, {
      foreignKey: {
        name: "noticeId",
        onDelete: "CASCADE",
        as: "FullNotice",
      },
    });
  }
}

module.exports = Answer;
