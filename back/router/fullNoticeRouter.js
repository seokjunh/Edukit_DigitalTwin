const express = require("express");

const { verifyToken } = require("../middlewares/index");
const { isAuthority } = require("../middlewares/position");

const {
  notify,
  getNoticeById,
  getDetailNotice,
  updateNotice,
  deleteNotice,
} = require("../controllers/fullNotice");

const router = express.Router();
//전체공지조회
router.get("/fullNotices", getNoticeById);

//전체공지 상세조회
router.get("/fullPosts", verifyToken, getDetailNotice);

//전체공지
router.post("/notify", verifyToken, isAuthority, notify);

//전체공지수정
router.patch("/updateNotice", verifyToken, isAuthority, updateNotice);

//전체공지삭제
router.delete("/deleteNotice", verifyToken, isAuthority, deleteNotice);

module.exports = router;
