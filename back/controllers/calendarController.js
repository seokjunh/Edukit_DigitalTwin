const Calendar = require("../models/Calendar");

exports.getEvents = async (req, res) => {
  try {
    const events = await Calendar.findAll({});
    if (!events) {
      return res.status(400).json({ error: "일정을 찾을 수 없습니다." });
    }
    res.status(200).json({ message: "일정 조회 성공", events });
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

// 새로운 이벤트 추가
exports.addEvent = async (req, res) => {
  try {
    const { title, date } = req.body;

    // 필요한 경우 입력값 검증을 추가합니다.

    const newEvent = await Calendar.create({
      title,
      date,
    });

    if (!newEvent) {
      return res.status(400).json({ error: "일정 생성에 실패했습니다." });
    }

    res.status(201).json({ message: "일정 생성 성공", newEvent });
  } catch (error) {
    console.error(error);
    return next(error);
  }
};
