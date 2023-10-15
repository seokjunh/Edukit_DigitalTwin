const Sequelize = require("sequelize");

class Position extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        positionId: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        role: {
          type: Sequelize.STRING(5),
          defaultValue: "일반",
          allowNull: false,
        },
        fullNoticeAuthority: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
      },
      {
        sequelize,
        modelName: "Position",
        tableName: "positions",
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {
    //하나의 직급은 여러 유저를 가질수있다
    db.Position.hasMany(db.User, {
      foreignKey: {
        name: "positionId",
        onDelete: "SET NULL",
        as: "User",
      },
    });
  }
}

module.exports = Position;
