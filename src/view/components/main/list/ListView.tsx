import styled from "styled-components";
import leftArrow from "../../../../img/leftArrow.svg";
import rightArrow from "../../../../img/rightArrow.svg";
import { Category, News } from "../../../constants";
import { isSubscribed } from "../../../utils/Utils";
import DetailedNews from "./DetailedNews";
import TabBlock from "./TabBlock";
import { SubscribeSnackbar, UnsubscribeAlert } from "../wrapper/Notification";
import useListViewLogic from "../../../hooks/useListViewLogic";

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
  const {
    showSnackBar,
    showAlert,
    newsItem,
    menuSelected,
    news,
    subscription,
    handlePageClick,
    handleUnsubscribeClick,
  } = useListViewLogic();

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
