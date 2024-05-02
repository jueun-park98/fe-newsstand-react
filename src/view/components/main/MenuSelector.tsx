import { MENU_STATES } from "../../constants";
import styled from 'styled-components';
import { useNavigation } from '../provider/NavigationProvider';

const MenuSelector = () => {
  const { menuSelected, setMenuSelected } = useNavigation();

  return (
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
  );
};

const PressMenu = styled.li`
  display: flex;
  justify-content: space-between;
  font-size: 1.14em;
`;

const PressTextMenu = styled.span`
  font-weight: 700;
  color: ${(props) => (props["aria-selected"] ? "#14212b" : "#879298")};

  & + & {
    margin-left: 1.7143em;
  }
`;

export default MenuSelector;
