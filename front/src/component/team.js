import React from "react";
import "../css/team.css";
import "../css/homePage.css";

const Team = () => (
  <div className="wrapper">
    {/* 사장 */}
    <div className="uswer1 profile">
      <li className="team-item">
        <img src="/hsj.jpg" alt="Profile" />
        <div className="profile-contents">
          <h2>
            함석준<span>관리자</span>
          </h2>
          <p>AI / IOT / PM / Back-End</p>
        </div>
      </li>
    </div>
    {/* 매니저 */}
    <ul className="wrapperBox">
      {/* 매니저 1 */}
      <div className="uswer1 profile">
        <li className="team-item">
          <img src="/img03.jpg" alt="Profile" />
          <div className="profile-contents">
            <h2>
              오현우<span>매니저</span>
            </h2>
            <p>Back-End / DB /Front-End</p>
          </div>
        </li>
      </div>
      {/* 매니저 2 */}
      <div className="uswer1 profile">
        <li className="team-item">
          <img src="/kangwoo.jpg" alt="Profile" />
          <div className="profile-contents">
            <h2>
              이강우<span>매니저</span>
            </h2>
            <p>PM / Front-End / Back-End</p>
          </div>
        </li>
      </div>
      {/* 매니저 3 */}
      <div className="uswer1 profile">
        <li className="team-item">
          <img src="/img00.jpg" alt="Profile" />
          <div className="profile-contents">
            <h2>
              박주영<span>매니저</span>
            </h2>
            <p>Front-End/ WebDesign/ PLC</p>
          </div>
        </li>
      </div>
    </ul>
  </div>
);

export default Team;
