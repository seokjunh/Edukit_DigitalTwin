const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const morgan = require("morgan");
const dotenv = require("dotenv");
const passport = require("passport");

dotenv.config();

const { sequelize } = require("./models/index");
const passportConfig = require("./passport/passport");
const authRouter = require("./router/authRouter");
const positionRouter = require("./router/positionRouter");
const fullNoticeRouter = require("./router/fullNoticeRouter");
const answerRouter = require("./router/answerRouter");
const calendarRouter = require("./router/calendarRouter");
const cors = require("cors");
const app = express();

passportConfig();

// port 설정
app.set("port", process.env.PORT || 8080);

// DB연결
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("MYSQL_DB 연결 성공");
  })
  .catch((err) => {
    console.error(err);
  });

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

const allowedOrigins = [
  "http://192.168.0.124:3000",
  "http://192.168.219.101:3000",
  "http://172.30.1.17:3000",
  "http://localhost:3000",
  "http://192.168.0.88:3000",
  "http://192.168.0.28:3000",
  // "http://192.168.0.28:3002",
  // "http://192.168.0.43:3000",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// 라우터
app.use("/auth", authRouter);
app.use("/position", positionRouter);
app.use("/notice", fullNoticeRouter);
app.use("/answer", answerRouter);
app.use("/calendar", calendarRouter);

// 에러 핸들링
app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== "production" ? err : {};
  res.status(err.status || 500).json({ error: err.message });
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기 중");
});
