import { LOGO_COUNT_PER_PAGE, LogoState, MAX_PAGE } from "../../../constants";
import leftArrow from "../../../../img/leftArrow.svg";
import rightArrow from "../../../../img/rightArrow.svg";
import styled from "styled-components";
import { calculateMaxPage, decreaseIndex, increaseIndex, isSubscribed } from "../../../utils/Utils";
import { SubscribeSnackbar, UnsubscribeAlert } from "../wrapper/Notification";
import SubscribeButton from "../wrapper/SubscribeButton";
import useGridViewLogic from "../../../hooks/useGridViewLogic";

const fillGridLogos = (logos: LogoState[], page: number, countPerPage: number) => {
  const pageLogos = logos.slice(page * countPerPage, (page + 1) * countPerPage);
  const fillCount = countPerPage - pageLogos.length;
  const filledLogos = pageLogos.concat(Array(fillCount).fill({}));

  return filledLogos;
};

const isEmptyObject = (object: object) => Object.keys(object).length === 0;

function GridView() {
  const {
    showSnackBar,
    showAlert,
    alertMessage,
    logos,
    subscription,
    handleUnsubscribeClick,
    togglePage,
    getCurrentPage,
  } = useGridViewLogic();
  const currentPage = getCurrentPage();

  return (
    <>
      {showSnackBar && <SubscribeSnackbar />}
      {showAlert && <UnsubscribeAlert name={alertMessage} onUnsubscribe={handleUnsubscribeClick} />}
      <Table>
        {fillGridLogos(logos, currentPage, LOGO_COUNT_PER_PAGE).map((logo) => (
          <LogoBox>
            {!isEmptyObject(logo) && (
              <>
                <Logo src={logo.src} name={logo.name} />
                <SubscribeButton
                  name={logo.name}
                  isSubscribed={isSubscribed(logo.name, subscription)}
                />
              </>
            )}
          </LogoBox>
        ))}
      </Table>
      <LeftArrow
        page={currentPage}
        maxPage={calculateMaxPage(logos)}
        src={leftArrow}
        onClick={() => togglePage(decreaseIndex(currentPage, MAX_PAGE))}
      />
      <RightArrow
        page={currentPage}
        maxPage={calculateMaxPage(logos)}
        src={rightArrow}
        onClick={() => togglePage(increaseIndex(currentPage, MAX_PAGE))}
      />
    </>
  );
}

const Table = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  border: 0.0714em solid #d2dae0;
`;

const LogoBox = styled.div`
  width: 100%;
  height: 6.8928em;
  display: flex;
  justify-content: center;
  align-items: center;
  outline: 0.0714em solid #d2dae0;

  > button {
    display: none;
  }

  &:hover > img {
    display: none;
  }

  &:hover > button {
    display: flex;
    position: absolute;
  }
`;

const Logo = styled.img<{ name: string }>`
  height: 1.4286em;
`;

const LeftArrow = styled.img<{ page: number; maxPage: number }>`
  position: relative;
  top: -15.0714em;
  left: -7.1429em;
  visibility: ${(props) => (props.page === 0 || props.maxPage === 0 ? "hidden" : "visible")};
`;

const RightArrow = styled.img<{ page: number; maxPage: number }>`
  position: relative;
  top: -15.0714em;
  left: 70em;
  visibility: ${(props) => (props.page === props.maxPage - 1 ? "hidden" : "visible")};
`;

export default GridView;
