import React, { useState } from "react";
import gridIcon from "../../img/gridIcon.svg";
import listIcon from "../../img/listIcon.svg";
import styled from "styled-components";
import { MENU_STATES, PressProps, VIEW_STATES } from "./constants";
import GridView from "./GridView";
import ListView from "./ListView";

function PressContainer({ news, subscriptions }: PressProps) {
  const [menuSelected, setMenuSelected] = useState<string>(MENU_STATES.allPress);
  const [viewSelected, setViewSelected] = useState<string>(VIEW_STATES.grid);

  return (
    <Container>
      <Menu>
        <PressMenu>
          <PressTextMenu
            aria-selected={menuSelected === MENU_STATES.allPress}
            onClick={() => setMenuSelected(MENU_STATES.allPress)}
          >
            전체 언론사
          </PressTextMenu>
          <PressTextMenu
            aria-selected={menuSelected === MENU_STATES.subscribedPress}
            onClick={() => setMenuSelected(MENU_STATES.subscribedPress)}
          >
            내가 구독한 언론사
          </PressTextMenu>
        </PressMenu>
        <ViewMenu>
          <ViewIcon
            aria-selected={viewSelected === VIEW_STATES.list}
            onClick={() => setViewSelected(VIEW_STATES.list)}
            src={listIcon}
            alt="list-icon"
          ></ViewIcon>
          <ViewIcon
            aria-selected={viewSelected === VIEW_STATES.grid}
            onClick={() => setViewSelected(VIEW_STATES.grid)}
            src={gridIcon}
            alt="grid-icon"
          ></ViewIcon>
        </ViewMenu>
      </Menu>
      <View>
        {viewSelected === VIEW_STATES.grid ? (
          <GridView news={news} subscriptions={subscriptions} menuSelected={menuSelected}></GridView>
        ) : (
          <ListView news={news} subscriptions={subscriptions} menuSelected={menuSelected}></ListView>
        )}
      </View>
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
