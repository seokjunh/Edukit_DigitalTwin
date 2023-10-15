const jwt = require("jsonwebtoken");

exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(403).send("로그인 해주세요");
  }
};

exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    const message = encodeURIComponent("로그인한 상태입니다.");
    res.json(`/?error=${message}`);
  }
};
//토큰 생성
exports.createToken = (user) => {
  const token = jwt.sign(
    {
      userId: user.userId,
      name: user.name,
    },
    process.env.JWT_SECRET,
    { expiresIn: "2h" }
  );
  return token;
};
//토큰 검증
exports.verifyToken = (req, res, next) => {
  try {
    console.log(`token: ${req.headers.authorization}`);
    res.locals.decoded = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.userId = res.locals.decoded.userId;
    return next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(419).json({
        code: 419,
        message: "토큰이 만료되었습니다",
      });
    }
    return res.status(401).json({
      code: 401,
      message: "유효하지 않는 토큰입니다",
    });
  }
};
