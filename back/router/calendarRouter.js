const express = require("express");
const { verifyToken } = require("../middlewares/index");

// 여기에 Calendar 컨트롤러를 가져옵니다.
const { getEvents, addEvent } = require("../controllers/calendarController");

const router = express.Router();

// 전체 일정 조회
router.get("/events", verifyToken, getEvents);

// 새로운 일정 추가
router.post("/events", verifyToken, addEvent);

module.exports = router;
