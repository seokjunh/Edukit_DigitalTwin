// 저장 test
const express = require("express");
const router = express.Router();
const { saveMqttData, dataget } = require("../controllers/mqtt");

// MQTT 라우트 정의
router.post("/save", saveMqttData);

//chart.js 전송
router.get("/plcData", dataget);

module.exports = router;
