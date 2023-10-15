import React, { useState } from "react";
import axios from "axios";
import "../../css/loginPage.css";
import Modal from "../modal";

const Join = (props) => {
  const [isOpneModal, setIsOpneModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const opneModal=() => {
    setIsOpneModal(true);
  };
  const closeModal = () => {
    setIsOpneModal(false);
  };
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 이메일과 비밀번호를 서버로 보내는 POST 요청
      const response = await axios.post(
        `${process.env.REACT_APP_URL}/auth/signup`,
        formData
      );
      console.log(formData);
      console.log(`response: ${response}`);
      setModalMessage("회원 가입 성공");

      // 서버에서 응답을 받으면 원하는 동작을 수행할 수 있습니다.
      // console.log("회원 가입 성공:", response.data);
      

      // 모달 열고 응답 메세지 설정
    } catch (error) {
      //모달을 열고 오류 메세지를 설정
      setModalMessage("회원 가입 실패");
    }
  };

  return (
    <form className="joinBox" onSubmit={handleSubmit}>
      <input
        className="inputStyle"
        type="email"
        id="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="email"
      />
      <input
        className="inputStyle"
        type="name"
        id="name"
        name="name"
        value={formData.nick}
        onChange={handleChange}
        placeholder="Name"
      />
      <input
        className="inputStyle"
        type="password"
        id="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Password"
      />
      <button className="buttonStyle" type="submit" onClick={opneModal}>
        회원가입
      </button>
      
        <Modal isOpen={isOpneModal} onClose={closeModal} Message={modalMessage}>
        </Modal>
      
    </form>
  );
};

export default Join;
