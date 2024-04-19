import { useEffect, useState } from "react";
import { LogoState, MENU_STATES, News, ViewProps } from "./constants";
import leftArrow from "../../img/leftArrow.svg";
import rightArrow from "../../img/rightArrow.svg";
import styled from "styled-components";
import { decreaseIndex, increaseIndex } from "../utils/Utils";

const MAX_PAGE = 4;
const LOGO_COUNT_PER_PAGE = 24;

function GridView({ news, subscriptions, menuSelected }: ViewProps) {
  const [page, setPage] = useState<number>(0);
  const [subscriptionPage, setSubscriptionPage] = useState<number>(0);
  const [logos, setLogos] = useState<LogoState[]>([]);

  useEffect(() => {
    if (menuSelected === MENU_STATES.allPress) {
      const logosToSave = shuffle(news).slice(0, MAX_PAGE * LOGO_COUNT_PER_PAGE);
      setLogos(logosToSave);
    }
    if (menuSelected === MENU_STATES.subscribedPress) {
      const logosToSave = subscriptions.map(convertToLogo);
      setLogos(logosToSave);
    }
  }, [news.length, menuSelected]);

  useEffect(() => {});

  return (
    <Table>
      {logos.slice(page * LOGO_COUNT_PER_PAGE, (page + 1) * LOGO_COUNT_PER_PAGE).map((logo) => (
        <LogoBox>
          <Logo src={logo.src} name={logo.name}></Logo>
        </LogoBox>
      ))}
      <LeftArrow page={page} src={leftArrow} onClick={() => setPage(decreaseIndex(page, MAX_PAGE))} />
      <RightArrow page={page} src={rightArrow} onClick={() => setPage(increaseIndex(page, MAX_PAGE))} />
    </Table>
  );
}

const shuffle: (array: News[]) => LogoState[] = (array) => {
  return [...array].sort((a, b) => Math.random() - 0.5).map(convertToLogo);
};

const convertToLogo: (news: News) => LogoState = (news) => {
  return { src: news.logoImageSrc, name: news.pressName };
};

const Table = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
`;

const LogoBox = styled.div`
  height: 95px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #d2dae0;
`;

const Logo = styled.img<{ name: string }>`
  height: 20px;
`;

const LeftArrow = styled.img<{ page: number }>`
  position: relative;
  top: -211px;
  left: -100px;
  visibility: ${(props) => (props.page === 0 ? "hidden" : "visible")};
`;

const RightArrow = styled.img<{ page: number }>`
  position: relative;
  top: -211px;
  left: 860px;
  visibility: ${(props) => (props.page === MAX_PAGE - 1 ? "hidden" : "visible")};
`;

export default GridView;
