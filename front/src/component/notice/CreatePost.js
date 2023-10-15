import React, { useState } from "react";
import axios from "axios";
import "../../css/CreatePost.css";
import { useNavigate } from "react-router-dom";

const CreatePostPage = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post(
        `${process.env.REACT_APP_URL}/notice/notify`,
        {
          title: title,
          content: content,
        },
        {
          headers: { Authorization: `${localStorage.getItem("token")}` },
        }
      )
      .then((response) => {
        console.log("게시글이 성공적으로 등록되었습니다.");
        navigate("/noticeboard");
      })
      .catch((error) => console.error("Error:", error));

    setTitle("");
    setContent("");
  };

  return (
    <div className="post">
      <div>
        <form onSubmit={handleSubmit}>
          <div className="title-1">제목</div>
          <label className="post-label-1">
            <input
              className="post-height"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <div className="content">내용</div>
          <label className="post-label-2">
            <input
              className="post-height"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </label>
          <div className="button-center">
            <button type="submit">등록하기</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePostPage;
