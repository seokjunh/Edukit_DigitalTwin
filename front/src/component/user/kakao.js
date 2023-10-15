import React from "react";

export default function KakaoOauth() {
  const Rest_api_key = process.env.REACT_APP_KAKAO_ID;
  const redirect_uri = `${process.env.REACT_APP_URL}/auth/kakao/callback`; // Redirect URI

  // oauth 요청 URL
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;

  const handleLogin = () => {
    window.location.href = kakaoURL;
  };

  return <button onClick={handleLogin}>카카오 로그인</button>;
}
