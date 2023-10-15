const User = require("../models/user");
const Position = require("../models/position");
const Answer = require("../models/answer");

exports.isPresident = async (req, res, next) => {
  //토큰에서 추출한 userid로 직급검사
  const id = req.userId;
  try {
    const userRole = await User.findOne({
      where: { userId: id },
      include: [{ model: Position, as: "Position" }],
    });
    if (!userRole) {
      return res.status(404).json({ message: "없는 유저입니다." });
    }
    const role = userRole.Position.dataValues.role;

    if (role === "사장") {
      return next();
    } else {
      return res.status(404).json({ message: "권한이 없습니다." });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};
exports.isAuthority = async (req, res, next) => {
  //토큰에서 추출한 userid로 권한검사
  const id = req.userId;
  try {
    const userRole = await User.findOne({
      where: { userId: id },
      include: [{ model: Position, as: "Position" }],
    });
    const authority = userRole.Position.dataValues.fullNoticeAuthority;
    if (authority) {
      return next();
    } else {
      return res.status(404).json({ message: "권한이 없습니다." });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.isMine = async (req, res, next) => {
  const id = req.userId;
  try {
    const my = await Answer.findOne({ where: { userId: id } });
    if (!my) {
      return res.status(400).json({ error: "권한이 없습니다." });
    }
    return next();
  } catch (error) {
    console.error(error);
    return next(error);
  }
};
