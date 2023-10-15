import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../css/loginPage.css";

const Logout = (props) => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 서버에 로그아웃 요청
      const response = await axios.get(
        `${process.env.REACT_APP_URL}/auth/logout`,
        {
          headers: { Authorization: `${localStorage.getItem("token")}` },
        }
      );
      localStorage.removeItem("token");

      console.log("로그아웃:", response.data);
      window.location.reload(navigate("/"));
    } catch (error) {
      // 오류 처리
      console.error("로그아웃오류:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <button
        className="buttonStyleW"
        style={{
          fontSize: "10px",
          fontWeight: "10px",
        }}
        type="submit"
      >
        로그아웃
      </button>
    </form>
  );
};

export default Logout;
