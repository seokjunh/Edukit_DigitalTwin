const Sequelize = require("sequelize");
const dotenv = require("dotenv");
const User = require("./user");
const Position = require("./position");
const FullNotice = require("./fullNotice");
const Answer = require("./answer");
const Calendar = require("./Calendar");
dotenv.config();

const db = {
  username: process.env.DB_ID,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: process.env.DB_DIALECT,
};

const sequelize = new Sequelize(db.database, db.username, db.password, {
  host: db.host,
  port: db.port,
  dialect: db.dialect,
});

db.sequelize = sequelize;

//모델 생성
db.User = User;
db.FullNotice = FullNotice;
db.Answer = Answer;
db.Position = Position;
db.Calendar = Calendar;
//모델 초기화
// User.initiate(sequelize);
Object.keys(db).forEach((modelName) => {
  if (db[modelName].init) {
    db[modelName].init(sequelize);
  }
});

//관계설정
// User.associate(db);
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;
