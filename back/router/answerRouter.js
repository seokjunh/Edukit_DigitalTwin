const express = require("express");

const { verifyToken } = require("../middlewares/index");
const { isMine } = require("../middlewares/position");

const {
  answer,
  getMyAnswer,
  updateAnswer,
  deleteAnswer,
} = require("../controllers/answer");

const router = express.Router();
//댓글달기
router.post("/answer", verifyToken, answer);

//내댓글 조회
// router.get("/getMyAnswer", verifyToken,isMine, getMyAnswer);

//댓글수정
// router.patch("/updateAnswer", verifyToken,isMine updateAnswer);

//댓글삭제
router.delete("/deleteAnswer", verifyToken, isMine, deleteAnswer);

module.exports = router;
