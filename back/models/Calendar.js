const Sequelize = require("sequelize");

class Calendar extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        calendarId: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        title: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        date: {
          type: Sequelize.DATEONLY, // DATEONLY 타입은 시간 부분을 제외하고 날짜만 저장합니다.
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "Calendar",
        tableName: "calendars",
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
}

module.exports = Calendar;
