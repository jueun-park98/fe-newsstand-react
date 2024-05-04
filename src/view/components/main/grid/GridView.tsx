import { useContext, useEffect, useState } from "react";
import { LogoState, MENU_STATES, News, ViewProps } from "../../../constants";
import leftArrow from "../../../../img/leftArrow.svg";
import rightArrow from "../../../../img/rightArrow.svg";
import styled from "styled-components";
import { decreaseIndex, increaseIndex, isSubscribed } from "../../../utils/Utils";
import { NewsContext } from "../../provider/NewsProvider";
import { SubscribeSnackbar, UnsubscribeAlert } from "../wrapper/Notification";
import SubscribeButton from "../wrapper/SubscribeButton";
import { useSubscriptionEvents } from "../../../hooks/useSubscriptionEvents";
import { useNavigation } from "../../provider/NavigationProvider";
import useSubscribeStore from "../../../hooks/useSubscribeStore";

const FIRST_PAGE = 0;
const MAX_PAGE = 4;
const LOGO_COUNT_PER_PAGE = 24;

const shuffle: (array: News[]) => LogoState[] = (array) => {
  return [...array].sort((a, b) => Math.random() - 0.5).map(convertToLogo);
};

const convertToLogo: (news: News) => LogoState = (news) => {
  return { src: news.logoImageSrc, name: news.pressName };
};

const fillGridLogos = (logos: LogoState[], page: number, countPerPage: number) => {
  const pageLogos = logos.slice(page * countPerPage, (page + 1) * countPerPage);
  const fillCount = countPerPage - pageLogos.length;
  const filledLogos = pageLogos.concat(Array(fillCount).fill({}));

  return filledLogos;
};

const calculateMaxPage = (items: LogoState[]) => Math.ceil(items.length / LOGO_COUNT_PER_PAGE);

const isEmptyObject = (object: object) => Object.keys(object).length === 0;

function GridView() {
  const { handleUnsubscribeClick } = useSubscriptionEvents();
  const { menuSelected } = useNavigation();
  const [{ news, subscription }] = useContext(NewsContext);
  const { showSnackBar, showAlert, alertMessage } = useSubscribeStore();
  const [page, setPage] = useState<number>(FIRST_PAGE);
  const [logos, setLogos] = useState<LogoState[]>([]);

  useEffect(() => {
    if (menuSelected === MENU_STATES.allPress) {
      const logosToSave = shuffle(news).slice(0, MAX_PAGE * LOGO_COUNT_PER_PAGE);
      setLogos(logosToSave);
      setPage(FIRST_PAGE);
    }
    if (menuSelected === MENU_STATES.subscribedPress) {
      const logosToSave = subscription.map(convertToLogo);
      setLogos(logosToSave);
      page > calculateMaxPage(logosToSave) - 1 && setPage(calculateMaxPage(logosToSave) - 1);
    }
  }, [news, subscription, menuSelected]);

  return (
    <>
      {showSnackBar && <SubscribeSnackbar />}
      {showAlert && <UnsubscribeAlert name={alertMessage} onUnsubscribe={handleUnsubscribeClick} />}
      <Table>
        {fillGridLogos(logos, page, LOGO_COUNT_PER_PAGE).map((logo) => (
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
        page={page}
        maxPage={calculateMaxPage(logos)}
        src={leftArrow}
        onClick={() => setPage(decreaseIndex(page, MAX_PAGE))}
      />
      <RightArrow
        page={page}
        maxPage={calculateMaxPage(logos)}
        src={rightArrow}
        onClick={() => setPage(increaseIndex(page, MAX_PAGE))}
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
