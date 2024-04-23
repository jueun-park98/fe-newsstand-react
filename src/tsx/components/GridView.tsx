import { useContext, useEffect, useState } from "react";
import { LogoState, MENU_STATES, News, ViewProps } from "./constants";
import leftArrow from "../../img/leftArrow.svg";
import rightArrow from "../../img/rightArrow.svg";
import plusSymbol from '../../img/plusSymbol.svg';
import styled from "styled-components";
import { decreaseIndex, increaseIndex } from "../utils/Utils";
import { NewsContext } from "./NewsProvider";
import { fetchSubscription, postSubscription } from "../api/NewsAPI";
import { SubscribeSnackbar } from "./Notification";

const MAX_PAGE = 4;
const LOGO_COUNT_PER_PAGE = 24;

const shuffle: (array: News[]) => LogoState[] = (array) => {
  return [...array].sort((a, b) => Math.random() - 0.5).map(convertToLogo);
};

const convertToLogo: (news: News) => LogoState = (news) => {
  return { src: news.logoImageSrc, name: news.pressName };
};

function GridView({ menuSelected, setMenuSelected }: ViewProps) {
  const [{ news, subscription }, setNewsState] = useContext(NewsContext);
  const [page, setPage] = useState<number>(0);
  const [subscriptionPage, setSubscriptionPage] = useState<number>(0);
  const [logos, setLogos] = useState<LogoState[]>([]);
  const [showSnackBar, setShowSnackBar] = useState<boolean>(false);

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

  const handleSubscriptionClick = async (logoName: string) => {
    const newsItem = news.find(item => item.pressName === logoName);
    if (!newsItem) {
      console.error(`${logoName} 언론사를 찾지 못했습니다.`);
      return;
    }
    try {
      await postSubscription(newsItem);
      setShowSnackBar(true);
      const newSubscription = await fetchSubscription();
      setTimeout(() => {
        setNewsState({ news, subscription: newSubscription as News[] });
        setShowSnackBar(false);
        setMenuSelected(MENU_STATES.subscribedPress);
      }, 5000);
    } catch (error) {
      console.error("Subscription failed", error);
      alert(`${logoName} 구독 실패!`);
    }
  };

  return (
    <>
      {showSnackBar && <SubscribeSnackbar />}
      <Table>
        {logos.slice(page * LOGO_COUNT_PER_PAGE, (page + 1) * LOGO_COUNT_PER_PAGE).map((logo) => (
          <LogoBox>
            <Logo src={logo.src} name={logo.name}></Logo>
            <SubscriptionButton onClick={() => handleSubscriptionClick(logo.name)}>
              <PlusImage src={plusSymbol}></PlusImage>
              <div>구독하기</div>
            </SubscriptionButton>
          </LogoBox>
        ))}
      </Table>
      <LeftArrow page={page} src={leftArrow} onClick={() => setPage(decreaseIndex(page, MAX_PAGE))} />
      <RightArrow page={page} src={rightArrow} onClick={() => setPage(increaseIndex(page, MAX_PAGE))} />
    </>
  );
}

const Table = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
`;

const LogoBox = styled.div`
  height: 6.7857em;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0.0714em solid #d2dae0;

  &:hover > img {
    display: none;
  }

  &:hover > button {
    display: flex;
    position: absolute;
    justify-content: center;
    align-items: center;
  }
`;

const Logo = styled.img<{ name: string }>`
  height: 1.4286em;
`;

const SubscriptionButton = styled.button`
  height: 20px;
  background-color: #fff;
  border: 1px solid #d2dae0;
  border-radius: 50px;
  color: #879298;
  display: none;
  flex-direction: row;
`;

const PlusImage = styled.img`
  width: 12px;
  height: 12px;
  margin-left: -4px;
  margin-right: 2px;
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
