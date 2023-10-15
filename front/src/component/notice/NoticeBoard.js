// Notice.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import CommonTable from "./CommonTable";
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Pagination from "@mui/material/Pagination";
import "../../css/buttonPosition.css";

const theme = createTheme({
  components: {
    MuiPaginationItem: {
      styleOverrides: {
        page: {
          color: "white", // 페이지 번호 색상
          backgroundColor: "black", // 페이지 번호 배경 색상
          "&.Mui-selected": {
            // 선택된 페이지 번호 스타일
            color: "black",
            backgroundColor: "#334c99",
          },
        },
      },
    },
  },
});

const NoticeBoard = () => {
  const headersName = ["글번호", "제목", "공지날짜", "조회수"];
  const [data, setData] = useState(null);
  const [page, setPage] = useState(1);

  // useNavigate 훅을 사용하여 navigate 함수를 가져옵니다.
  const navigate = useNavigate();

  const formattedDate = (a) => {
    const date = new Date(a);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(date.getDate()).padStart(2, "0")}`;
    // ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_URL}/notice/fullNotices`, {
        headers: { Authorization: `${localStorage.getItem("token")}` },
      })
      .then((response) => {
        // 서버에서 받아온 데이터를 가공하여 포맷된 날짜와 클릭 핸들러까지 포함한 배열을 생성합니다.
        let formattedData = response.data.notices.map((item) => [
          item.noticeId,
          item.title,
          formattedDate(item.createdAt),
          item.readCount,
          () => handleRowClick(item.noticeId),
        ]);

        // noticeId(글번호) 기준으로 내림차순 정렬합니다.
        formattedData.sort((a, b) => b[0] - a[0]);

        // 한 페이지당 아이템 수 설정
        const itemsPerPage = 15;

        let pages = [];

        for (let i = 0; i < formattedData.length; i += itemsPerPage) {
          pages.push(formattedData.slice(i, i + itemsPerPage));
        }

        setData(pages);
      })

      .catch((error) => console.error("Error:", error));
  }, []);

  // 각 row가 클릭되면 해당 게시물의 상세 페이지로 네비게이션하는 핸들러
  const handleRowClick = (noticeId) => {
    navigate(`/postView/${noticeId}`);
  };

  const handleCreatePostButtonClick = () => {
    navigate("/create-post");
  };

  if (!data) return <div>Loading...</div>;

  return (
    <div className="post-back-ground ">
      <div style={{ paddingTop: "73px", height: "100vh", width: "100vw" }}>
        <div style={{ textAlign: "center", margin: "20px 0" }}>
          <h1>공지사항</h1>
        </div>

        {/* headersName과 data를 전달하고 내부에서 thead와 tbody를 관리하도록 함 */}
        <CommonTable headersName={headersName} data={data[page - 1]} />

        <div className="butp">
          <div className="pg">
            <ThemeProvider theme={theme}>
              <Pagination
                count={data.length}
                page={page}
                onChange={(event, value) => setPage(value)}
              />
            </ThemeProvider>
          </div>
          <div className="bt">
            <button type="submit"
              onClick={handleCreatePostButtonClick}  
            >
              게시물 등록
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoticeBoard;
