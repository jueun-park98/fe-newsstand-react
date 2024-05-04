import styled from "styled-components";
import leftArrow from "../../../../img/leftArrow.svg";
import rightArrow from "../../../../img/rightArrow.svg";
import { Category, MENU_STATES, News } from "../../../constants";
import { useContext, useEffect, useState } from "react";
import { decreaseIndex, increaseIndex, isSubscribed } from "../../../utils/Utils";
import DetailedNews from "./DetailedNews";
import { NewsContext } from "../../provider/NewsProvider";
import TabBlock from "./TabBlock";
import { SubscribeSnackbar, UnsubscribeAlert } from "../wrapper/Notification";
import { useSubscriptionEvents } from "../../../hooks/useSubscriptionEvents";
import { useNavigation } from "../../provider/NavigationProvider";
import useListPageStore from "../../../hooks/useListPageStore";
import useSubscribeStore from "../../../hooks/useSubscribeStore";

const FIRST_INDEX = 0;

const getCategories: (news: News[]) => Category[] = (news) => {
  const categoryMap = news.reduce((acc, cur, index) => {
    if (!acc.has(cur.category)) {
      acc.set(cur.category, { firstIndex: index, count: 1 });
      return acc;
    }
    const current = acc.get(cur.category);
    if (current)
      acc.set(cur.category, { firstIndex: current.firstIndex, count: current.count + 1 });
    return acc;
  }, new Map<string, { firstIndex: number; count: number }>());

  return Array.from(categoryMap, ([name, details]) => ({ name, details }));
};

function ListView() {
  const { page, subscriptionPage, setPage, setSubscriptionPage } = useListPageStore();
  const { handleUnsubscribeClick } = useSubscriptionEvents();
  const { menuSelected } = useNavigation();
  const [{ news, subscription }] = useContext(NewsContext);
  const { showSnackBar, showAlert } = useSubscribeStore();
  const [newsItem, setNewsItem] = useState<News>(news[page]);

  const togglePage = (
    pageType: "page" | "subscriptionPage",
    operation: "increase" | "decrease"
  ) => {
    const currentPage = pageType === "page" ? page : subscriptionPage;
    const totalLength = pageType === "page" ? news.length : subscription.length;
    const updatedPage =
      operation === "increase"
        ? increaseIndex(currentPage, totalLength)
        : decreaseIndex(currentPage, totalLength);

    pageType === "page" ? setPage(updatedPage) : setSubscriptionPage(updatedPage);
  };

  const handlePageClick = (operation: "increase" | "decrease") => {
    if (menuSelected === MENU_STATES.allPress) togglePage("page", operation);
    if (menuSelected === MENU_STATES.subscribedPress) togglePage("subscriptionPage", operation);
  };

  useEffect(() => {
    if (menuSelected === MENU_STATES.allPress) setNewsItem(news[page]);
    if (menuSelected === MENU_STATES.subscribedPress) setNewsItem(subscription[subscriptionPage]);
    if (subscriptionPage >= subscription.length) {
      togglePage("subscriptionPage", "increase");
      setNewsItem(subscription[FIRST_INDEX]);
    }
  }, [news, subscription, menuSelected, page, subscriptionPage]);

  return (
    <>
      {showSnackBar && <SubscribeSnackbar />}
      {showAlert && (
        <UnsubscribeAlert name={newsItem.pressName} onUnsubscribe={handleUnsubscribeClick} />
      )}
      {newsItem && (
        <Container>
          <TabBlock menuSelected={menuSelected} categories={getCategories(news)} />
          <DetailedNews
            newsItem={newsItem}
            isSubscribed={isSubscribed(newsItem.pressName, subscription)}
          />
          <LeftArrow src={leftArrow} onClick={() => handlePageClick("decrease")}></LeftArrow>
          <RightArrow src={rightArrow} onClick={() => handlePageClick("increase")}></RightArrow>
        </Container>
      )}
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
