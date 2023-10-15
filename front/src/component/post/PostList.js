import React, { useState, useEffect } from "react";
import axios from "axios";
import CommonTable from "../notice/CommonTable";
import { Link } from "react-router-dom";

const PostList = (props) => {
  const headersName = ["글번호", "제목", "등록일", "조회수"];
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_URL}/fullNotices`
        );
        console.log(response.data.notic);
        setData(response.data.notic); // 'posts' 대신 'notic' 사용
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <CommonTable headersName={headersName}>
      {data.map((item, index) => (
        <tr key={index}>
          <td>
            <Link to={`/postView/${item.noticeId}`}>{item.noticeId}</Link>
          </td>
          <td>
            <Link to={`/postView/${item.noticeId}`}>{item.title}</Link>
          </td>
          <td>
            <Link to={`/postView/${item.noticeId}`}>{item.createDate}</Link>
          </td>
          <td>
            <Link to={`/postView/${item.noticeId}`}>{item.readCount}</Link>
          </td>
        </tr>
      ))}
    </CommonTable>
  );
};

export default PostList;
