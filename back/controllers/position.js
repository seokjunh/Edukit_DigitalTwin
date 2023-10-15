const User = require("../models/user");
const Position = require("../models/position");
//사장님페이지 유저조회
exports.userGet = async (req, res, next) => {
  try {
    const allUser = await User.findAll({
      attributes: {
        exclude: ["password", "provider", "updatedAt", "deletedAt"],
      },
      include: [{ model: Position, attributes: ["role"], as: "Position" }],
    });

    const user = allUser.filter((item) => {
      return item.dataValues.positionId !== 1;
    });

    return res.status(200).json({ message: "전체조회 성공", user });
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

//직급변경
exports.roleChange = async (req, res, next) => {
  //요청이 boolean값으로 온것으로 가정 (매니저위임,매니저해임)
  const position = req.body.position;

  //변경할 유저
  const changeUser = req.body.userId;

  if (!changeUser) {
    return res.status(400).json({ error: "없는 정보 입니다." });
  }

  try {
    //직급 변경될 유저
    const user = await User.findOne({
      where: { userId: changeUser },
    });

    if (!user) {
      return res.status(400).json({ error: "유저가 존재하지 않습니다." });
    }
    //1 == True 0 ==False
    if (position === "manager") {
      // 매니저 위임
      user.positionId = 2;
    } else if (position === "remove") {
      // 매니저 해임
      user.positionId = 3;
    } else {
      return res.status(400).json({ error: "잘못된 요청입니다." });
    }

    await user.save();

    return res.json({
      message: "직급이 변경되었습니다.",
      roleChangedUserId: changeUser,
    });
  } catch (error) {
    console.error(error);
    return next(error);
  }
};
