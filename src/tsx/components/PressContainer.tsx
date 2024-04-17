import React, { useState } from "react";
import gridIcon from "../../img/gridIcon.svg";
import listIcon from "../../img/listIcon.svg";
import styled from "styled-components";

function PressContainer() {
  const [menuSelected, setMenuSelected] = useState<number>(0);
  const [viewSelected, setViewSelected] = useState<number>(1);

  const toggleMenuSelected: (index: number) => void = (index) => {
    setMenuSelected(index);
  };

  const toggleViewSelected: (index: number) => void = (index) => {
    setViewSelected(index);
  };

  return (
    <Container>
      <Menu>
        <PressMenu>
          <PressTextMenu aria-selected={menuSelected === 0} onClick={() => toggleMenuSelected(0)}>
            전체 언론사
          </PressTextMenu>
          <PressTextMenu aria-selected={menuSelected === 1} onClick={() => toggleMenuSelected(1)}>
            내가 구독한 언론사
          </PressTextMenu>
        </PressMenu>
        <ViewMenu>
          <ViewIcon aria-selected={viewSelected === 0} onClick={() => toggleViewSelected(0)} src={listIcon} alt="list-icon"></ViewIcon>
          <ViewIcon aria-selected={viewSelected === 1} onClick={() => toggleViewSelected(1)} src={gridIcon} alt="grid-icon"></ViewIcon>
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
  font-size: 1.14em;
`;

const PressTextMenu = styled.span`
  font-weight: 700;
  color: ${(props) => (props["aria-selected"] === true ? "#14212b" : "#879298")};

  & + & {
    margin-left: 1.7143em;
  }
`;

const ViewMenu = styled.li`
  display: flex;
`;

const ViewIcon = styled.img`
  filter: ${(props) => (props["aria-selected"] === true ? "grayscale(0)" : "grayscale(1)")};
  opacity: ${(props) => (props["aria-selected"] === true ? "1" : "0.7")};

  & + & {
    margin-left: 0.57em;
  }
`;

const View = styled.div`
  width: 66.3em;
  height: 27.57em;
  border: 0.0714em solid #d2dae0;
`;

export default PressContainer;
