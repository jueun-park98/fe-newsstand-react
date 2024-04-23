import { useContext, useEffect, useState } from "react";
import { LogoState, MENU_STATES, News, SubscribeAction, ViewProps } from "../../constants";
import leftArrow from "../../../img/leftArrow.svg";
import rightArrow from "../../../img/rightArrow.svg";
import styled from "styled-components";
import { decreaseIndex, increaseIndex } from "../../utils/Utils";
import { NewsContext } from "../provider/NewsProvider";
import { SubscribeSnackbar, UnsubscribeAlert } from "./Notification";
import LogoBox from "./LogoBox";
import { SubscribeContext } from "../provider/SubscribeProvider";

const MAX_PAGE = 4;
const LOGO_COUNT_PER_PAGE = 24;

const shuffle: (array: News[]) => LogoState[] = (array) => {
  return [...array].sort((a, b) => Math.random() - 0.5).map(convertToLogo);
};

const convertToLogo: (news: News) => LogoState = (news) => {
  return { src: news.logoImageSrc, name: news.pressName };
};

const isSubscribed = (logoName: string, subscription: News[]) => {
  return subscription.some((item) => item.pressName === logoName);
};

const fillGridLogos = (logos: LogoState[], page: number, countPerPage: number) => {
  const pageLogos = logos.slice(page * countPerPage, (page + 1) * countPerPage);
  const fillCount = countPerPage - pageLogos.length;
  const filledLogos = pageLogos.concat(Array(fillCount).fill({}));

  return filledLogos;
};

const setShowAlert = (showAlert: boolean) =>
  ({
    type: "SET_SHOW_ALERT",
    payload: { showAlert: showAlert },
  } as SubscribeAction);
const setAlertMessage = (alertMessage: string) =>
  ({
    type: "SET_ALERT_MESSAGE",
    payload: { alertMessage: alertMessage },
  } as SubscribeAction);

function GridView({ menuSelected, subscribeState, handleSubscribe, handleUnsubscribe }: ViewProps) {
  const { showSnackBar, showAlert, alertMessage } = subscribeState;
  const [{ news, subscription }] = useContext(NewsContext);
  const [_, subscribeDispatch] = useContext(SubscribeContext);
  const [page, setPage] = useState<number>(0);
  const [logos, setLogos] = useState<LogoState[]>([]);

  useEffect(() => {
    if (menuSelected === MENU_STATES.allPress) {
      const logosToSave = shuffle(news).slice(0, MAX_PAGE * LOGO_COUNT_PER_PAGE);
      setLogos(logosToSave);
    }
    if (menuSelected === MENU_STATES.subscribedPress) {
      const logosToSave = subscription.map(convertToLogo);
      setLogos(logosToSave);
    }
  }, [news, subscription, menuSelected]);

  return (
    <>
      {showSnackBar && <SubscribeSnackbar />}
      {showAlert && <UnsubscribeAlert name={alertMessage} onUnsubscribe={handleUnsubscribe} />}
      <Table>
        {fillGridLogos(logos, page, LOGO_COUNT_PER_PAGE).map((logo) => (
          <LogoBox
            logo={logo}
            onSubscribe={handleSubscribe}
            onUnsubscribe={() => {
              subscribeDispatch(setAlertMessage(logo.name));
              subscribeDispatch(setShowAlert(true));
            }}
            isSubscribed={isSubscribed(logo.name, subscription)}
          />
        ))}
      </Table>
      <LeftArrow
        page={page}
        src={leftArrow}
        onClick={() => setPage(decreaseIndex(page, MAX_PAGE))}
      />
      <RightArrow
        page={page}
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

const LeftArrow = styled.img<{ page: number }>`
  position: relative;
  top: -15.0714em;
  left: -7.1429em;
  visibility: ${(props) => (props.page === 0 ? "hidden" : "visible")};
`;

const RightArrow = styled.img<{ page: number }>`
  position: relative;
  top: -15.0714em;
  left: 70em;
  visibility: ${(props) => (props.page === MAX_PAGE - 1 ? "hidden" : "visible")};
`;

export default GridView;
