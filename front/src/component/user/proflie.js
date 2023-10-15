import React from "react";
import Logout from "./Logout";
import FullCalendar from '@fullcalendar/react';

import "../../css/profile.css";

export default function Profile() {
  return (
    <div className="proFileBackground">
      <div className="profileBox">
        <div className="userProfile">
          <p className="userTextBox"
          style={{marginTop: '50%'}}>
            <p>사람 </p>
            <p
              style={{
                fontSize: "5px",
              }}
            >
              123@email.com
            </p>
          </p>
          <Logout />
        </div>
        
        {/* 공지사항 */}
        <div className="dataBox"></div>
      </div>
    </div>
  );
}
