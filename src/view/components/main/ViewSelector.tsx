import gridIcon from "../../../img/gridIcon.svg";
import listIcon from "../../../img/listIcon.svg";
import { VIEW_STATES } from "../../constants";
import styled from 'styled-components';
import { useNavigation } from '../provider/NavigationProvider';

const ViewSelector = () => {
  const { viewSelected, setViewSelected } = useNavigation();

  return (
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
  );
};

const ViewMenu = styled.li`
  display: flex;
`;

const ViewIcon = styled.img`
  filter: ${(props) => (props["aria-selected"] ? "grayscale(0)" : "grayscale(1)")};
  opacity: ${(props) => (props["aria-selected"] ? "1" : "0.7")};

  & + & {
    margin-left: 0.57em;
  }
`;

export default ViewSelector;
