const Answer = require("../models/answer");
const User = require("../models/user");
//댓글달기
exports.answer = async (req, res, next) => {
  const id = req.userId;
  const noticeId = req.query.noticeId;
  const comment = req.body.comment;

  try {
    if (!noticeId) {
      return res.status(400).json({ error: "존재하지않는 전체공지 입니다." });
    }
    if (!comment) {
      return res.status(400).json({ error: "댓글을 달아주세요." });
    }

    if (comment.length > 255) {
      return res.status(404).json({ error: "250자 내외로 작성해 주세요" });
    }
    NewAnswer = await Answer.create({
      content: comment,
      userId: id,
      noticeId: noticeId,
    });

    return res.status(200).json({ message: "댓글달기성공" });
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

//댓글삭제
exports.deleteAnswer = async (req, res, next) => {
  const answerId = req.body.answerId;
  try {
    if (!answerId) {
      return res.status(400).json({ error: "존재하지 않는 댓글입니다." });
    }

    const deletAnswer = await Answer.destroy({
      where: { answerId: answerId },
    });

    if (deletAnswer === 0) {
      return res.status(400).json({ error: "해당 댓글을 찾을수 없습니다." });
    }
    return res.status(200).json({ message: "삭제완료" });
  } catch (error) {
    console.error(error);
    return next(error);
  }
};
