const Sequelize = require("sequelize");

class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        userId: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        email: {
          type: Sequelize.STRING(40),
          allowNull: false,
          unique: true,
        },
        name: {
          type: Sequelize.STRING(15),
          allowNull: false,
        },
        password: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        provider: {
          type: Sequelize.ENUM("local", "kakao"),
          allowNull: false,
          defaultValue: "local",
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false, //스네이크케이스
        modelName: "User",
        tableName: "users",
        paranoid: true,
        charset: "utf8", //인코딩방식 유니코드문자를 지원및 다국어 문자를 저장할때 유용
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {
    //유저는 여러 답글을 달수있다
    db.User.hasMany(db.Answer, {
      foreignKey: {
        name: "userId",
        onDelete: "SET NULL",
        as: "Answer",
      },
    });
    //전체공지 권한이 있는 유저는 여러 전체공지를 할수있다
    db.User.hasMany(db.FullNotice, {
      foreignKey: {
        name: "userId",
        onDelete: "SET NULL",
        as: "FullNotice",
      },
    });
    //유저는 하나의 직급만 있다
    db.User.belongsTo(db.Position, {
      foreignKey: {
        name: "positionId",
        onDelete: "CASCADE",
        as: "Position",
      },
    });
  }
}

module.exports = User;
