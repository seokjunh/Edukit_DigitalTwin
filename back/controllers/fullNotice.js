const FullNotice = require("../models/fullNotice");
const Answer = require("../models/answer");
const User = require("../models/user");
//전체공지조회
exports.getNoticeById = async (req, res, next) => {
  try {
    const notices = await FullNotice.findAll({});

    if (!notices) {
      return res.status(400).json({ error: "공지사항을 찾을 수 없습니다." });
    }

    res.status(200).json({ message: "게시물조회성공", notices });
  } catch (error) {
    console.error(error);
    return next(error);
  }
};
//전체공지 상세조회
exports.getDetailNotice = async (req, res, next) => {
  try {
    const noticeId = req.query.noticeId;
    const notic = await FullNotice.findOne({ where: { noticeId: noticeId } });

    if (!notic) {
      return res.status(400).json({ error: "존재하지 않는 공지사항 입니다." });
    }
    //조회수 증가
    updateNotic = await notic.update({ readCount: notic.readCount + 1 });

    //해당전체공지의 댓글 추가
    const answer = await Answer.findAll({
      where: { noticeId: noticeId },
      include: [{ model: User, attributes: ["name", "userId"], as: "User" }],
    });

    return res.status(200).json({ message: "상세조회성공", notic, answer });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

//전체공지
exports.notify = async (req, res, next) => {
  const { title, content } = req.body;
  const userId = req.userId;

  if (!title) {
    return res.status(400).json({ error: "제목을 입력해주세요" });
  }

  if (!content) {
    return res.status(400).json({ error: "내용을 입력해주세요" });
  }

  if (title.length > 100) {
    res.status(404).json({ error: "100자 이상은 입력 불가능 합니다" });
  }

  if (content.length > 255) {
    res.status(404).json({ error: "255자 이상은 입력 불가능 합니다" });
  }

  try {
    const newNotice = await FullNotice.create({
      title,
      content,
      userId,
    });

    res.status(201).json({ notice: newNotice });
  } catch (error) {
    console.error(error);
    return next(error);
  }
};
// 전체공지 수정
exports.updateNotice = async (req, res, next) => {
  const newTitle = req.body.title;
  const newContent = req.body.content;
  const noticeId = req.body.noticeId;
  const userId = req.userId; //수정자
  try {
    if (!newTitle) {
      return res.status(400).json({ error: "제목을 입력해주세요" });
    }
    if (!newContent) {
      return res.status(400).json({ error: "내용을 입력해주세요" });
    }

    if (!noticeId) {
      return res.status(400).json({ error: "없는 공지사항 입니다." });
    }

    update = await FullNotice.update(
      {
        title: newTitle,
        content: newContent,
        readCount: 0, //조회수 초기화
        userId: userId,
      },
      { where: { noticeId: noticeId } }
    );

    return res.status(200).json({ message: "수정완료" });
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

//전체공지삭제
exports.deleteNotice = async (req, res, next) => {
  try {
    const deleteNoticeId = req.body.noticeId;

    if (!deleteNoticeId) {
      return res.status(400).json({ error: "존재하지않는 공지사항입니다." });
    }

    const deleteNotic = await FullNotice.destroy({
      where: { noticeId: deleteNoticeId },
    });

    if (deleteNotic === 0) {
      return res
        .status(400)
        .json({ error: "해당 공지사항을 찾을수 없습니다." });
    }

    return res.status(200).json({ message: "삭제완료" });
  } catch (error) {
    console.error(error);
    return next(error);
  }
};
