import styled from "styled-components";
import leftArrow from "../../img/leftArrow.svg";
import rightArrow from "../../img/rightArrow.svg";
import { Category, News, PageAction, PageState, ViewProps } from "./constants";
import { useContext, useEffect, useReducer } from "react";
import { decreaseIndex, increaseIndex } from "../utils/Utils";
import DetailedNews from "./DetailedNews";
import { NewsContext } from "./NewsProvider";
import TabBlock from './TabBlock';

const initialPageState = {
  page: 0,
  subscriptionPage: 0,
  animateProgress: true,
};

const pageReducer = (state: PageState, action: PageAction) => {
  switch (action.type) {
    case "SET_PAGE":
      return { ...state, page: action.payload.page, animateProgress: false };
    case "SET_SUBSCRIPTION_PAGE":
      return { ...state, subscriptionPage: action.payload.subscriptionPage, animateProgress: false };
    case "START_ANIMATION":
      return { ...state, animateProgress: true };
    default:
      return state;
  }
};

const getCategories: (news: News[]) => Category[] = (news) => {
  const categoryMap = news.reduce((acc, cur, index) => {
    if (!acc.has(cur.category)) {
      acc.set(cur.category, { firstIndex: index, count: 1 });
      return acc;
    }
    const current = acc.get(cur.category);
    if (current) acc.set(cur.category, { firstIndex: current.firstIndex, count: current.count + 1 });
    return acc;
  }, new Map<string, { firstIndex: number; count: number }>());

  return Array.from(categoryMap, ([name, details]) => ({name, details}));
};

function ListView({ menuSelected }: ViewProps) {
  const [{ news, subscription }] = useContext(NewsContext);
  const [{ page, subscriptionPage, animateProgress }, dispatch] = useReducer(pageReducer, initialPageState);
  const categories = getCategories(news);

  const setPage = (page: number) => dispatch({ type: "SET_PAGE", payload: { page: page } });
  const increasePage = () => setPage(increaseIndex(page, news.length));
  const decreasePage = () => setPage(decreaseIndex(page, news.length));

  useEffect(() => {
    dispatch({ type: "START_ANIMATION" });
  }, [page]);

  return (
    <Container>
      <TabBlock categories={categories} pageState={{ page, subscriptionPage, animateProgress }} dispatch={dispatch} />
      <DetailedNews newsItem={news[page]} />
      <LeftArrow src={leftArrow} onClick={decreasePage}></LeftArrow>
      <RightArrow src={rightArrow} onClick={increasePage}></RightArrow>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const LeftArrow = styled.img`
  position: relative;
  top: -15.0714em;
  left: -7.1428em;
  visibility: visible;
`;

const RightArrow = styled.img`
  position: relative;
  top: -15.0714em;
  left: 70em;
  visibility: visible;
`;

export default ListView;
