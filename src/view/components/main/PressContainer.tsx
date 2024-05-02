import { VIEW_STATES } from "../../constants";
import GridView from "./grid/GridView";
import ListView from "./list/ListView";
import MenuSelector from "./MenuSelector";
import ViewSelector from "./ViewSelector";
import styled from "styled-components";
import { useNavigation } from "../provider/NavigationProvider";

function PressContainer() {
  const { viewSelected } = useNavigation();
  const viewComponents = {
    [VIEW_STATES.grid]: GridView,
    [VIEW_STATES.list]: ListView,
  };
  const SelectedView = viewComponents[viewSelected] || null;

  return (
    <div>
      <Menu>
        <MenuSelector />
        <ViewSelector />
      </Menu>
      <View>{SelectedView && <SelectedView />}</View>
    </div>
  );
}

const Menu = styled.ul`
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  margin-top: 2.29em;
`;

const View = styled.div`
  width: 66.3em;
  height: 27.57em;
  border: 0.0714em solid #d2dae0;
`;

export default PressContainer;
