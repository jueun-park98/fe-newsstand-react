import styled, { css, keyframes } from "styled-components";
import leftArrow from "../../img/leftArrow.svg";
import rightArrow from "../../img/rightArrow.svg";
import { News, ViewProps } from "./constants";
import { useEffect, useState } from "react";
import { decreaseIndex, increaseIndex } from "../utils/Utils";
import DetailedNews from "./DetailedNews";

function ListView({ news, subscriptions, menuSelected }: ViewProps) {
  const [page, setPage] = useState<number>(0);
  const [subscriptionPage, setSubscriptionPage] = useState<number>(0);
  const [animateProgress, setAnimateProgress] = useState<boolean>(true);
  const categories = getCategories(news);

  const increasePage = () => {
    setAnimateProgress(false);
    setPage(increaseIndex(page, news.length));
  };
  const decreasePage = () => {
    setAnimateProgress(false);
    setPage(decreaseIndex(page, news.length));
  };

  useEffect(() => {
    setAnimateProgress(true);
  }, [page]);

  return (
    <Container>
      <TabBlock>
        {categories.map(([category, { firstIndex, count }]) =>
          isInRange(page, firstIndex, count) ? (
            <ActiveTab>
              <ProgressBar animate={animateProgress} onAnimationIteration={increasePage}></ProgressBar>
              <TabDescription>
                <div>{category}</div>
                <div>
                  {page - firstIndex + 1} / <span style={{ opacity: 0.7 }}>{count}</span>
                </div>
              </TabDescription>
            </ActiveTab>
          ) : (
            <InactiveTab onClick={() => setPage(firstIndex)}>{category}</InactiveTab>
          )
        )}
      </TabBlock>
      <DetailedNews newsItem={news[page]} />
      <LeftArrow src={leftArrow} onClick={decreasePage}></LeftArrow>
      <RightArrow src={rightArrow} onClick={increasePage}></RightArrow>
    </Container>
  );
}

const getCategories: (news: News[]) => [string, { firstIndex: number; count: number }][] = (
  news
) => {
  return Array.from(
    news.reduce((acc, cur, index) => {
      if (!acc.has(cur.category)) {
        acc.set(cur.category, { firstIndex: index, count: 1 });
        return acc;
      }
      const current = acc.get(cur.category);
      if (current)
        acc.set(cur.category, { firstIndex: current?.firstIndex, count: current.count + 1 });
      return acc;
    }, new Map<string, { firstIndex: number; count: number }>())
  );
};

const isInRange: (index: number, minIndex: number, count: number) => boolean = (
  index,
  minIndex,
  count
) => index >= minIndex && index < minIndex + count;

const increaseWidth = keyframes`
  from {
    width: 0%;
  }
  to {
    width: 100%;
  }
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const TabBlock = styled.div`
  height: 2.8571em;
  background-color: #f5f7f9;
  border-bottom: 0.0714em solid rgb(210, 218, 224);
  display: flex;
  font-weight: 500;
  overflow-x: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const ActiveTab = styled.div`
  width: 12.8571em;
  background-color: #7890e7;
  color: #fff;
  font-weight: 700;
`;

const ProgressBar = styled.div<{ animate: boolean }>`
  height: 2.8571em;
  background-color: #4362d0;
  ${({ animate }) =>
    animate &&
    css`
      animation: ${increaseWidth} 20s infinite linear;
    `};
`;

const InactiveTab = styled.div`
  height: 2.8571em;
  padding: 0 1.1428em;
  display: flex;
  align-items: center;
  color: #879298;
  white-space: nowrap;

  &:hover {
    text-decoration: underline;
  }

  &::selection {
    background-color: transparent;
    color: inherit;
  }
`;

const TabDescription = styled.div`
  width: 82%;
  height: 2.8571em;
  position: relative;
  top: -2.8571em;
  justify-content: space-between;
  display: flex;
  padding: 0 1.1428em;
  align-items: center;

  > div::selection {
    background-color: transparent;
    color: inherit;
  }
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
