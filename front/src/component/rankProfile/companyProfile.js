import React, { useState, useEffect } from "react";
import "../../css/companyProfile.css";
const companies = [
  {
    name: "유비씨",
    homepage: "https://uvc.co.kr/",
    companyInfo: "회사소개서 첨부",
  },
  {
    name: "사이버테크프랜드",
    homepage: "http://www.cyberwin.co.kr/",
    companyInfo: "회사소개서 첨부",
  },
  {
    name: "크로이스",
    homepage: "https://croisadmin.gabia.io",
    companyInfo: "회사소개서 첨부",
  },
  {
    name: "더블유지에스",
    homepage: "https://www.wgslabs.com",
    companyInfo: "홈페이지X",
  },
  {
    name: "디케이랩",
    homepage: "홈페이지X",
    companyInfo: "회사소개서 첨부",
  },
  {
    name: "온더라이브",
    homepage: "https://www.onthelive.kr",
    companyInfo: "회사소개서 첨부",
  },
];

function CompanyProfile() {
  const [selectedCompany, setSelectedCompany] = useState(null);

  // Use useEffect to set selectedCompany to the first company's data initially
  useEffect(() => {
    setSelectedCompany(companies[0]);
  }, []);

  const handleCompanyClick = (companyName) => {
    const selectedCompany = companies.find((c) => c.name === companyName);
    setSelectedCompany(selectedCompany);
  };

  return (
    <div className="companyBackground">
      <ul className="companyHeader">
        {companies.map((company, index) => (
          <li key={index}>
            <button onClick={() => handleCompanyClick(company.name)}>
              {company.name}
            </button>
          </li>
        ))}
      </ul>
      {selectedCompany && (
        <div className="companyBody">
          {/* 추가된 부분: 회사 정보 링크 */}
          <iframe
            src={selectedCompany.homepage}
            title="Company Homepage"
            width="100%"
            height="100%"
            style={{ border: "none" }}
          ></iframe>
        </div>
      )}
    </div>
  );
}

export default CompanyProfile;
