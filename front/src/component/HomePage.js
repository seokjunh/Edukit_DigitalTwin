import React, { useEffect, useRef, useState } from "react";
import "../css/homePage.css";
import Team from "../component/team";

const HomePage = (props) => {
  const elementRefs = [useRef(null), useRef(null), useRef(null)];
  const [isVisible, setIsVisible] = useState([false, false, false]);
  const outerDivRef = useRef();
  const DIVIDER_HEIGHT = 5;

  useEffect(() => {
    const wheelHandler = (e) => {
      e.preventDefault();
      // 스크롤 행동 구현
      const { deltaY } = e;
      const { scrollTop } = outerDivRef.current; // 스크롤 위쪽 끝부분 위치
      const pageHeight = window.innerHeight; // 화면 세로길이, 100vh와 같습니다.

      if (deltaY > 0) {
        // 스크롤 내릴 때
        if (scrollTop >= 0 && scrollTop < pageHeight) {
          //현재 1페이지
          outerDivRef.current.scrollTo({
            top: pageHeight + DIVIDER_HEIGHT,
            left: 0,
            behavior: "smooth",
          });
        } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 2) {
          //현재 2페이지
          outerDivRef.current.scrollTo({
            top: pageHeight * 2 + DIVIDER_HEIGHT * 2,
            left: 0,
            behavior: "smooth",
          });
        } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 3) {
          // 현재 4페이지
          outerDivRef.current.scrollTo({
            top: pageHeight * 3 + DIVIDER_HEIGHT * 3,
            left: 0,
            behavior: "smooth",
          });
        }
      } else {
        // 스크롤 올릴 때
        if (scrollTop >= 0 && scrollTop < pageHeight) {
          // 현재 1페이지
          outerDivRef.current.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
        } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 2) {
          // 현재 2페이지
          outerDivRef.current.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
        } else if (scrollTop >= pageHeight * 2 && scrollTop < pageHeight * 3) {
          // 현재 3페이지
          outerDivRef.current.scrollTo({
            top: pageHeight,
            left: 0,
            behavior: "smooth",
          });
        } else if (scrollTop >= pageHeight * 3 && scrollTop < pageHeight * 4) {
          // 현재 4페이지
          outerDivRef.current.scrollTo({
            top: pageHeight * 2,
            left: 0,
            behavior: "smooth",
          });
        }
      }
    };

    const outerDivRefCurrent = outerDivRef.current;
    outerDivRefCurrent.addEventListener("wheel", wheelHandler);

    const handleIntersection = (entries, index) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible((prev) => {
            const newVisibility = [...prev];
            newVisibility[index] = true;
            return newVisibility;
          });
          //div 확인용 콘솔
          // console.log(`${entry.target.className} is in the viewport`);
        }
      });
    };

    const observers = elementRefs.map((ref, index) => {
      const observer = new IntersectionObserver(
        (entries) => {
          handleIntersection(entries, index);
        },
        {
          root: null, // 루트 요소를 지정하지 않음 (화면 전체 관찰)
          threshold: 0.1, // 엘리먼트가 화면 뷰포트의 80% 이상 보일 때 실행
        }
      );

      if (ref.current) {
        observer.observe(ref.current);
      }

      return observer;
    });

    return () => {
      outerDivRefCurrent.removeEventListener("wheel", wheelHandler);
      observers.forEach((observer) => {
        observer.disconnect();
      });
    };
  }, []);

  return (
    <div ref={outerDivRef} className="outer">
      {/* 화면1 */}
      <div className="inner homePage1Box">
        {/* 나타나는 애니메이션 */}
        <div
          className={`homePage1 ${isVisible[0] ? "visible" : ""}`}
          ref={elementRefs[0]}
        >
          <div className="homeBox1">
            <div className="homePage1LOGO">
              <p
                style={{
                  fontSize: "16px",
                  marginTop: "150px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                UVC
                <p> Total-Project</p>
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* 화면2 */}
      <div className="inner homePage2Box">
        <div className="homePage2">
          <div className="homeBox2">
            <div className="homePage2LOGO" />
            <p
              className="homePageTextW"
              style={{
                textAlign: "right",
                fontSize: "25px",
                marginRight: "3%",
              }}
            >
              공장 관리와 공정 효율화에 특화된 기술과 솔루션을 제공하는 기업으로
              <br />
              더욱 안전하고 효율적인 생산 환경을 제공합니다.
            </p>
          </div>
        </div>
      </div>
      {/* 화면4 */}
      <div className="inner homePage4Box">
        <div className="homeBody4Icon" />
        <p
          className="homePageTextW"
          style={{
            textAlign: "center",
            fontSize: "25px",
          }}
        >
          이미 작동 중인 공장에서 우리의 솔루션을 도입하면 모니터링이 쉽고
          효율적으로 이루어집니다.
          <br />
          관리자 모니터링 페이지를 통해 실시간으로 공정 데이터를 확인하고 <br />
          오류 및 오차율을 신속하게 감지하여 조치할 수 있습니다.
        </p>
      </div>
      {/* 화면6 역할 팀원 소개 페이지 */}
      <div className="inner homePage6Box">
        <div className="homeBody5Logo" />
        <Team />
      </div>
    </div>
  );
};

export default HomePage;
