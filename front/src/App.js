import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GraphComponent from "./component/Chart/Graph";
import Dash from "./component/Chart/dash";
import KakaoOauth from "./component/user/kakao";
import HomePage from "./component/HomePage";
import LoginPage from "./component/loginPage";
import Profile from "./component/user/proflie";
import MasterProfile from "./component/rankProfile/master";
import "./css/App.css";
import Notice from "./component/notice/notice";
import Header from "./component/Header/header";
import NoticeBoard from "./component/notice/NoticeBoard";
import PostView from "./component/post/PostView";
import PostMain from "./component/post/PostMain";
import CreatePostPage from "./component/notice/CreatePost";
import { checkSever } from "./component/user/checkServer";

function App() {
  useEffect(() => {
    // 일정 간격으로 서버 상태 확인 1시간
    const intervalId = setInterval(checkSever, 3600000);
    return () => {
      // 컴포넌트 언마운트시 간격 확인 해제
      clearInterval(intervalId);
    };
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dash" element={<Dash />} />
          <Route path="/noticeboard" element={<NoticeBoard />} />
          <Route path="/chart" element={<GraphComponent />} />
          <Route path="/kakao" element={<KakaoOauth />} />
          <Route path="/loginPage" element={<LoginPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/master" element={<MasterProfile />} />
          <Route path="/notice" element={<Notice />} />
          <Route path="/noticeBoard" element={<NoticeBoard />} />
          <Route path="/posts" element={<PostMain />} />
          <Route path="/postView/:noticeId" element={<PostView />} />
          <Route path="/create-post" element={<CreatePostPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
