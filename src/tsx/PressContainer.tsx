import React from "react";
import gridIcon from "../img/gridIcon.svg";
import listIcon from "../img/listIcon.svg";
import styled from "styled-components";

function PressContainer() {
  return (
    <Container>
      <Menu>
        <PressMenu>
          <PressTextMenu aria-selected="true">전체 언론사</PressTextMenu>
          <PressTextMenu aria-selected="false">내가 구독한 언론사</PressTextMenu>
        </PressMenu>
        <ViewMenu>
          <ViewIcon src={listIcon} alt="list-icon"></ViewIcon>
          <ViewIcon src={gridIcon} alt="grid-icon"></ViewIcon>
        </ViewMenu>
      </Menu>
      <View></View>
    </Container>
  );
}

const Container = styled.div``;

const Menu = styled.ul`
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  margin-top: 2.29em;
`;

const PressMenu = styled.li`
  display: flex;
  justify-content: space-between;
  width: 15.43em;
  font-size: 1.14em;
`;

const PressTextMenu = styled.span`
  font-weight: 700;
  color: ${(props) => (props["aria-selected"] === "true" ? "#14212b" : "#879298")};
`;

const ViewMenu = styled.li`
  display: flex;
`;

const ViewIcon = styled.img`
  & + & {
    margin-left: 0.57em;
  }
`;

const View = styled.div`
  width: 66.3em;
  height: 27.57em;
  border: 1px solid #d2dae0;
`;

export default PressContainer;
