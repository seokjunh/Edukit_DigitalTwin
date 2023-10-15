import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../../css/Post.css";
import jwt_decode from "jwt-decode";

const PostView = () => {
  const token = localStorage.getItem("token");
  let userId;

  if (token) {
    const decodedToken = jwt_decode(token);
    userId = decodedToken.userId;
  }
  const position = localStorage.getItem("position");
  const isAdmin = position !== "3";

  const [data, setData] = useState(null);
  const [answer, setAnswer] = useState(null);
  const [comment, setComment] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedContent, setEditedContent] = useState("");
  const [showModal, setShowModal] = useState(false); // 모달
  const { noticeId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_URL}/notice/fullPosts?noticeId=${noticeId}`,
          {
            headers: { Authorization: token },
          }
        );
        setData(response.data.notic);
        setAnswer(response.data.answer);

        setEditedTitle(response.data.notic.title);
        setEditedContent(response.data.notic.content);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [noticeId]);

  // Function to handle comment submission
  // 댓글달기
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_URL}/answer/answer?noticeId=${noticeId}`,
        { comment: comment },
        {
          headers: { Authorization: token },
        }
      );

      setComment("");
      window.location.reload(navigate(`/postView/${noticeId}`));
    } catch (error) {
      console.error("error", error);
    }
  };

  // 댓글 삭제
  const handleDeleteComment = async (answerId) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_URL}/answer/deleteAnswer`,
        {
          data: { answerId: answerId },
          headers: { Authorization: token },
        }
      );
      if (response.status === 200) {
        // answer 상태 업데이트 전에 댓글을 제거합니다.
        setAnswer(answer.filter((item) => item.answerId !== answerId));
      }
    } catch (error) {
      console.error("error", error);
    }
  };

  // 공지사항 업데이트
  const handleUpdateNotice = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_URL}/notice/updateNotice`,
        { title: editedTitle, content: editedContent, noticeId },
        { headers: { Authorization: token } }
      );
      if (response.status === 200) {
        console.log(response);
        setData({ ...data, title: editedTitle, content: editedContent });
        setEditMode(false);
      }
    } catch (error) {
      console.error("error", error);
    }
  };

  // 공지사항 삭제
  const handleDeleteNotice = async (e) => {
    e.preventDefault(); // 이벤트의 기본 동작 막기
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_URL}/notice/deleteNotice`,
        { data: { noticeId: noticeId }, headers: { Authorization: token } }
      );

      if (response.status === 200) {
        navigate("/noticeboard"); // 또는 다른 경로
      }
    } catch (error) {
      console.error("error", error);
    }
  };

  // 시간 포맷팅 함수
  const formatTime = (isoDateString) => {
    const date = new Date(isoDateString);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(date.getDate()).padStart(2, "0")} ${String(
      date.getHours()
    ).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
  };

  if (!data) return <div>권한없습니다.</div>;

  return (
    <div className="post-back-ground">
      <div className="top-section"></div>
      <div className="content-sectionBox">
        <h3>{data.title}</h3>
        {isAdmin && (
          <div className="changeButton">
            <button type="butto" onClick={() => setEditMode(true)}>
              수정
            </button>
            <button type="butto" onClick={() => setShowModal(true)}>
              삭제
            </button>
          </div>
        )}
        {showModal && (
          <div className="modal">
            <p> 삭제하시겠습니까?</p>
            <div className="modal-button">
              <button type="butto" onClick={handleDeleteNotice}>
                Yes
              </button>
              <button type="butto" onClick={() => setShowModal(false)}>
                NO
              </button>
            </div>
          </div>
        )}
        <div className="content-section">
          <div className="info">
            <div>No: {data.noticeId}</div>
            <div>공지 날짜: {formatTime(data.createdAt)}</div>
            <div>조회 횟수: {data.readCount}</div>
          </div>
          {!editMode ? (
            <div
              style={{
                display: "flex",
                height: "100%",
                justifyContent: "space-between",
                flexDirection: "column",
              }}
            >
              <div className="post-content">{data.content}</div>
              {/* Add a Comment */}
              <form className="commentTxt" onSubmit={handleCommentSubmit}>
                <label>댓글달기</label>
                <input
                  type="text"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <button type="submit" style={{ marginLeft: "1.5rem" }}>
                  Submit
                </button>
              </form>
            </div>
          ) : (
            <form style={{ height: "100%" }} onSubmit={handleUpdateNotice}>
              <input
                className="update-label-1"
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
              />
              <textarea
                className="update-label-2"
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
              />
              <div className="changeButton">
                <button type="butto">변경</button>
                <button type="butto" onClick={() => setEditMode(false)}>
                  취소
                </button>
              </div>
            </form>
          )}
        </div>

        <div className="comment-section">
          {/* 댓글 */}
          {(answer || []).map((answer) => (
            <div className="comment" key={answer.answerId}>
              <strong>{answer.User.name}:</strong>
              <p>{answer.content}</p>
              <p>{formatTime(answer.createdAt)}</p>
              {userId === answer.User.userId && (
                <button onClick={() => handleDeleteComment(answer.answerId)} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostView;
