import React, { useState, useEffect } from "react";

function App() {
  const [imgSrc, setImgSrc] = useState("");

  // 이미지 URL을 갱신하는 함수
  const refreshImage = () => {
    fetch("http://192.168.0.33:5000/detection")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
      })
      .then((data) => {
        setImgSrc(data); // Base64 인코딩된 이미지 데이터를 그대로 사용합니다.
      })
      .catch((error) => console.error("Fetch error:", error));
  };

  // 컴포넌트가 마운트되면 setInterval을 설정하고, 언마운트되면 clearInterval을 호출합니다.
  useEffect(() => {
    const intervalId = setInterval(refreshImage, 50); // 갱신 간격은 밀리초 단위입니다. 여기서는 1초에 한 번 갱신합니다.

    return () => clearInterval(intervalId); // 컴포넌트가 언마운트되는 시점에 타이머를 제거합니다.
  }, []);

  return (
    <div style={{ marginLeft: "5rem", width: "100%", height: "100%" }}>
      {imgSrc && (
        <img src={`data:image/jpeg;base64,${imgSrc}`} alt="YOLO detections" />
      )}
    </div>
  );
}

export default App;
