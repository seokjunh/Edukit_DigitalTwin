import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../../css/notice.css";

const Notice = () => {
  const [rollingItems, setRollingItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_URL}/notice/fullNotices`,
          {
            headers: { Authorization: `${localStorage.getItem("token")}` },
          }
        );

        // noticeId 기준으로 내림차순 정렬 후 최근 5개만 선택
        const latestNotices = response.data.notices
          .sort((a, b) => b.noticeId - a.noticeId)
          .slice(0, 5);

        setRollingItems(latestNotices);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchNotices();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % rollingItems.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [rollingItems]);

  const nextIndex = (currentIndex + 1) % rollingItems.length;

  return (
    <ul className="notice">
      <li
        className={`notice-content ${
          currentIndex === nextIndex ? "active" : ""
        }`}
      >
        <Link
          to={`/postView/${rollingItems[currentIndex]?.noticeId}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <span className="notice-header">📢공지사항:</span>
          <span className="notice-title">
            {rollingItems[currentIndex]?.title}
          </span>
        </Link>
      </li>
      <li
        className={`notice-content ${
          nextIndex === currentIndex ? "active" : ""
        }`}
      >
        <Link
          to={`/postView/${rollingItems[nextIndex]?.noticeId}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <span className="notice-header">📢공지사항:</span>
          <span className="notice-title">{rollingItems[nextIndex]?.title}</span>
        </Link>
      </li>
    </ul>
  );
};

export default Notice;
