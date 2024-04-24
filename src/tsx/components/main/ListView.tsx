import styled from "styled-components";
import leftArrow from "../../../img/leftArrow.svg";
import rightArrow from "../../../img/rightArrow.svg";
import { Category, News, PageAction, PageState, ViewProps } from "../../constants";
import { useContext, useEffect, useReducer } from "react";
import { decreaseIndex, increaseIndex, isSubscribed } from "../../utils/Utils";
import DetailedNews from "./DetailedNews";
import { NewsContext } from "../provider/NewsProvider";
import TabBlock from "./TabBlock";
import { SubscribeContext } from "../provider/SubscribeProvider";
import { SubscribeSnackbar, UnsubscribeAlert } from "./Notification";

const initialPageState = {
  page: 0,
  subscriptionPage: 0,
  animateProgress: true,
};

const pageReducer = (state: PageState, { type, payload }: PageAction) => {
  switch (type) {
    case "SET_PAGE":
      return { ...state, page: payload.page, animateProgress: false };
    case "SET_SUBSCRIPTION_PAGE":
      return { ...state, subscriptionPage: payload.subscriptionPage, animateProgress: false };
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

  return Array.from(categoryMap, ([name, details]) => ({ name, details }));
};

function ListView({ menuSelected, subscribeState, handleSubscribe, handleUnsubscribe }: ViewProps) {
  const { showSnackBar, showAlert } = subscribeState;
  const [{ news, subscription }] = useContext(NewsContext);
  const [_, subscribeDispatch] = useContext(SubscribeContext);
  const [{ page, subscriptionPage, animateProgress }, pageDispatch] = useReducer(pageReducer, initialPageState);
  const categories = getCategories(news);

  const setPage = (page: number) => pageDispatch({ type: "SET_PAGE", payload: { page: page } });
  const increasePage = () => setPage(increaseIndex(page, news.length));
  const decreasePage = () => setPage(decreaseIndex(page, news.length));

  useEffect(() => {
    pageDispatch({ type: "START_ANIMATION" });
  }, [page]);

  return (
    <>
      {showSnackBar && <SubscribeSnackbar />}
      {showAlert && <UnsubscribeAlert name={news[page].pressName} onUnsubscribe={handleUnsubscribe} />}
      <Container>
        <TabBlock
          categories={categories}
          pageState={{ page, subscriptionPage, animateProgress }}
          dispatch={pageDispatch}
        />
        <DetailedNews
          newsItem={news[page]}
          onSubscribe={handleSubscribe}
          onUnsubscribe={() => {
            subscribeDispatch({ type: "SET_SHOW_ALERT", payload: { showAlert: true } });
            subscribeDispatch({ type: "SET_ALERT_MESSAGE", payload: { alertMessage: news[page].pressName } });
          }}
          isSubscribed={isSubscribed(news[page].pressName, subscription)}
        />
        <LeftArrow src={leftArrow} onClick={decreasePage}></LeftArrow>
        <RightArrow src={rightArrow} onClick={increasePage}></RightArrow>
      </Container>
    </>
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
