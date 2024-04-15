import React from "react";
import logo from "../../img/logo.svg";
import styled from "styled-components";

const WEEKDAY = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
const INCREMENT = 1;
const CHAR_COUNT = 2;

const reloadPage = () => window.location.reload();

const renderCurrentDate = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + INCREMENT;
  const date = currentDate.getDate();
  const day = WEEKDAY[currentDate.getDay()];

  return `${year}. ${month.toString().padStart(CHAR_COUNT, "0")}. ${date
    .toString()
    .padStart(CHAR_COUNT, "0")}. ${day}`;
};

function Header() {
  return (
    <HeaderContainer>
      <HeaderTitle>
        <img onClick={reloadPage} src={logo} alt="logo"></img>
        <HeaderTitleText>뉴스 스탠드</HeaderTitleText>
      </HeaderTitle>
      <div>
        <HeaderDate>{renderCurrentDate()}</HeaderDate>
      </div>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const HeaderTitle = styled.div`
  display: flex;
  align-items: center;
`;

const HeaderTitleText = styled.span`
  font-size: 24px;
  font-weight: bold;
  margin-left: 8px;
`;

const HeaderDate = styled.span`
  font-size: 16px;
  color: #5f6e76;
  position: relative;
  top: 50%;
`;

export default Header;
