const DiceData = require("../models/dices");

exports.saveDiceData = async (req, res) => {
  try {
    const data = req.body;
    if (!data) {
      return res.status(400).json({ error: "데이터가 없습니다." });
    }
    const saveData = await DiceData.create(data);
    return res.status(201).json({ message: "저장성공" }, saveData);
  } catch (error) {
    return res.status(500).json({ error: "데이터 저장 실패" });
  }
};

// MQTT 데이터를 조회하는 컨트롤러
exports.dataget = async (req, res) => {
  try {
    const dicedata = await DiceData.aggregate([
      { $unwind: "$DiceNumber" },
      { $sort: { _id: -1 } },
    ]).limit(30);
    if (dicedata) {
      res.status(200).json(dicedata);
    } else {
      res.status(400).json({ error: "데이터가 없습니다" });
    }
  } catch (error) {
    return res.status(500).json({ error: "데이터 조회 실패" });
  }
};
