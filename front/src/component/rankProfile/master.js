import React, { useState, useEffect } from "react";
import axios from "axios";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import "../../css/calendar.css";
import CompanyProfile from "./companyProfile";
import "../../css/profile.css";
import Button from "@mui/material/Button";
import Logout from "../user/Logout";
import Modal2 from "../modal2";

function MasterProfile() {
  const [events, setEvents] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const openModal = () => {
    setIsOpen(true);
    window.location.reload();
  };
  const closeModal = () => {
    setIsOpen(false);
    window.location.reload();
  };

  const handleDateClick = (info) => {
    const title = prompt("일정의 제목을 입력하세요:");
    if (title) {
      setEvents([...events, { title: title, date: info.dateStr }]);

      // POST 요청 보내기
      axios
        .post(
          `${process.env.REACT_APP_URL}/calendar/events`,
          {
            title: title,
            date: info.dateStr,
          },
          {
            headers: { Authorization: `${localStorage.getItem("token")}` },
          }
        )
        .then((response) => {
          console.log(response.data);
          // 성공적으로 요청이 완료되었을 때 추가 작업 수행 가능
        })
        .catch((error) => console.error("Error:", error));
    }
  };

  useEffect(() => {
    // 서버에서 일정 데이터 가져오기
    axios
      .get(`${process.env.REACT_APP_URL}/calendar/events`, {
        headers: { Authorization: `${localStorage.getItem("token")}` },
      })
      .then((response) => {
        const eventData = response.data.events;
        setEvents(eventData);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  const [users, setUsers] = useState([]);
  const [selectedButton, setSelectedButton] = useState("button1");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_URL}/position/presidentPage`, {
        headers: { Authorization: `${localStorage.getItem("token")}` },
      })
      .then((response) => {
        const usersData = response.data.user;
        setUsers(usersData);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName);
    console.log(`Button ${buttonName} clicked`);
  };

  const handleRoleChange = (userId, newRole) => {
    axios
      .post(
        `${process.env.REACT_APP_URL}/position/roleChange`,
        {
          userId: userId,
          position: newRole,
        },
        {
          headers: { Authorization: `${localStorage.getItem("token")}` },
        }
      )
      .then((response) => {
        console.log(response.data);
        setModalMessage("변경되었습니다");
        openModal(); // 모달 창 열기
      })
      .catch((error) => console.error("Error:", error))
      .finally(() => {
        setTimeout(() => {
          closeModal(); // 일정 시간 후에 모달 창 닫기
        }, 500); // 2000ms (2초) 후에 모달 창 닫음
      });
  };

  return (
    <div className="proFileBackground">
      <div className="profileBox">
        <div className="userProfile">
          <div className="infoBox">
            <div className="logoimg" />
            <Logout />
          </div>
          <Button
            className="B"
            variant="contained"
            color="primary"
            style={{
              width: "100%",
              height: "15%",
              transition: "height 0.2s ease",
            }}
            onMouseEnter={(e) => (e.target.style.height = "40%")} // 마우스를 올렸을 때 높이 증가
            onMouseLeave={(e) => (e.target.style.height = "15%")} // 마우스를 벗어났을 때 높이 감소
            onClick={() => handleButtonClick("button1")}
          >
            직위변경
          </Button>
          <Button
            variant="contained"
            color="primary"
            style={{
              width: "100%",
              height: "15%",
              transition: "height 0.2s ease",
            }}
            onMouseEnter={(e) => (e.target.style.height = "40%")}
            onMouseLeave={(e) => (e.target.style.height = "15%")}
            onClick={() => handleButtonClick("button2")}
          >
            협력업체
          </Button>
          <Button
            variant="contained"
            color="primary"
            style={{
              width: "100%",
              height: "15%",
              transition: "height 0.2s ease",
            }}
            onMouseEnter={(e) => (e.target.style.height = "40%")}
            onMouseLeave={(e) => (e.target.style.height = "15%")}
            onClick={() => handleButtonClick("button3")}
          >
            일정달력
          </Button>
        </div>
        <div className="remainingSpace">
          {selectedButton === "button1" && (
            <div className="remainingSpace">
              <h className="hp">
                change of position
                <p>: 사원 관리</p>
              </h>

              <div className="userBox">
                <p>Name</p>
                <p>Position</p>
                <p>Management</p>
              </div>
              <div className="userInfoBox">
                {users.map((user) => (
                  <div key={user.userId} className="userInfo">
                    <p>{user.name} </p>
                    <p>({user.Position.role})</p>
                    <div className="buttonContainer">
                      <button
                        className="style-buttonM"
                        onClick={() => handleRoleChange(user.userId, "manager")}
                      >
                        <p>임명</p>
                      </button>
                      <button
                        className="style-buttonM2"
                        onClick={() => handleRoleChange(user.userId, "remove")}
                      >
                        <p>삭제</p>
                        <Modal2
                          isOpen={isOpen}
                          onClose={closeModal}
                          Message={modalMessage}
                        />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {selectedButton === "button2" && <CompanyProfile />}
          {selectedButton === "button3" && (
            <div style={{ width: "95%", height: "95%", marginLeft: "2%" }}>
              <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                locale="ko"
                headerToolbar={{
                  left: "prev,next today",
                  center: "title",
                  right: "dayGridMonth,timeGridDay",
                }}
                editable={true}
                selectable={true}
                height={"100%"}
                dateClick={handleDateClick}
                events={events} // 서버에서 받은 일정 데이터를 전달합니다.
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MasterProfile;
