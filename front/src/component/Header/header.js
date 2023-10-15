import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Tabs,
  Tab,
  CssBaseline,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Airplay from "@mui/icons-material/Airplay";
import Dashboard from "@mui/icons-material/Dashboard";
import Campaign from "@mui/icons-material/Campaign";
import { Link, useLocation } from "react-router-dom";
import Notice from "../notice/notice";
import "../../css/header.css";
import Logout from "../user/Logout";

// 페이지 로딩시 로컬스토리지에서 토큰 가져와 사용자 인증 상태를 확인
function Header() {
  const [token, setToken] = useState("");
  const location = useLocation();
  const [numValue, setNumValue] = useState(0);
  const [position, setPosition] = useState("");
  const [isToggleOpen, setIsToggleOpen] = useState(false);

  const toggleHandler = () => {
    setIsToggleOpen(!isToggleOpen);
  };

  // 페이지 로딩시 로컬스토리지에서 토큰 가져와 사용자 인증 상태를 확인
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      console.log(storedToken);
    }

    const storedPosition = localStorage.getItem("position");
    if (storedPosition) {
      setPosition(storedPosition);
    }
    console.log(storedPosition);

    if (token && position === "1") {
      if (location.pathname === "/") {
        setNumValue(0);
      } else if (location.pathname === "/dash") {
        setNumValue(1);
      } else if (location.pathname === "/noticeboard") {
        setNumValue(2);
      } else if (location.pathname === "/master") {
        setNumValue(3);
      }

      // 토큰이 있고, 포지션 값이 '2' 또는 '3'일 때
    } else if (token && (position === "2" || position === "3")) {
      if (location.pathname === "/") {
        setNumValue(0);
      } else if (location.pathname === "/dash") {
        setNumValue(1);
      } else if (location.pathname === "/noticeboard") {
        setNumValue(2);
      } else {
        setNumValue(3);
      }
      // 토큰이 없을 때
    } else {
      if (location.pathname === "/") {
        setNumValue(0);
      } else {
        setNumValue(1);
      }
    }
  }, [location.pathname, token]);

  return (
    <div>
      <CssBaseline />
      <AppBar
        position="fixed"
        style={{ backgroundColor: "transparent", boxShadow: "none" }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}
          >
            <Tab
              icon={<Notice sx={{ fontSize: "100%" }} />}
              to={"/notice"}
              sx={{ color: "white", width: "100%" }}
              // component={Link}
            />
          </Typography>
          {token && position === "1" && (
            <Tabs value={numValue}>
              <Tab
                label="홈"
                icon={<HomeIcon />}
                component={Link}
                to="/"
                sx={{ color: "white" }}
              />
              <Tab
                label="대시보드"
                icon={<Dashboard />}
                component={Link}
                to="/dash"
                sx={{ color: "white" }}
              />
              <Tab
                label="공지사항"
                icon={<Campaign />}
                component={Link}
                to="/noticeboard"
                sx={{ color: "white" }}
              />

              <Tab
                label="마스터"
                icon={<AccountCircleIcon />}
                component={Link}
                to="/master"
                sx={{ color: "white" }}
              />
            </Tabs>
          )}

          {token && position === "2" && (
            <Tabs value={numValue}>
              <Tab
                label="홈"
                icon={<HomeIcon />}
                component={Link}
                to="/"
                sx={{ color: "white" }}
              />
              <Tab
                label="대시보드"
                icon={<Dashboard />}
                component={Link}
                to="/dash"
                sx={{ color: "white" }}
              />
              <Tab
                label="공지사항"
                icon={<Airplay />}
                component={Link}
                to="/noticeboard"
                sx={{ color: "white" }}
              />
              <Tab
                label="계정"
                icon={<AccountCircleIcon />}
                component={Link}
                sx={{ color: "white" }}
                onClick={toggleHandler}
              />
            </Tabs>
          )}
          {token && position === "3" && (
            <Tabs value={numValue}>
              <Tab
                label="홈"
                icon={<HomeIcon />}
                component={Link}
                to="/"
                sx={{ color: "white" }}
              />
              <Tab
                label="공지사항"
                icon={<Airplay />}
                component={Link}
                to="/noticeboard"
                sx={{ color: "white" }}
              />
              <Tab
                label="계정"
                icon={<AccountCircleIcon />}
                component={Link}
                sx={{ color: "white" }}
                onClick={toggleHandler}
              />
            </Tabs>
          )}
          {!token && (
            <Tabs value={numValue}>
              <Tab
                label="홈"
                icon={<HomeIcon />}
                component={Link}
                to="/"
                sx={{ color: "white" }}
              />
              <Tab
                label="계정"
                icon={<AccountCircleIcon />}
                component={Link}
                to="/loginPage"
                sx={{ color: "white" }}
              />
            </Tabs>
          )}
        </Toolbar>
      </AppBar>
      {isToggleOpen && (
        <div className="headerBody">
          <p>이름</p>
          <p>이메일</p>
          <Logout />
        </div>
      )}
    </div>
  );
}
export default Header;
