import styled from "styled-components";
import leftArrow from "../../img/leftArrow.svg";
import rightArrow from "../../img/rightArrow.svg";
import { News, ViewProps } from "./constants";
import { useEffect, useState } from "react";
import { decreaseIndex, increaseIndex } from "../utils/Utils";
import DetailedNews from './DetailedNews';

function ListView({ news, subscriptions, menuSelected }: ViewProps) {
  const [page, setPage] = useState<number>(0);
  const [subscriptionPage, setSubscriptionPage] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);
  const categories = getCategories(news);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          setPage((page + 1) % news.length);
          return 0;
        }
        return prevProgress + 0.01;
      });
    }, 2);

    return () => clearInterval(interval);
  }, [page]);

  useEffect(() => {
    setProgress(0);
  }, [page]);

  return (
    <Container>
      <TabBlock>
        {categories.map(([category, { firstIndex, count }]) =>
          isInRagne(page, firstIndex, count) ? (
            <ActiveTab>
              <ProgressBar progress={progress}></ProgressBar>
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
      <LeftArrow
        src={leftArrow}
        onClick={() => setPage(decreaseIndex(page, news.length))}
      ></LeftArrow>
      <RightArrow
        src={rightArrow}
        onClick={() => setPage(increaseIndex(page, news.length))}
      ></RightArrow>
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

const isInRagne: (index: number, minIndex: number, count: number) => boolean = (
  index,
  minIndex,
  count
) => index >= minIndex && index < minIndex + count;

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const TabBlock = styled.div`
  height: 40px;
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
  width: 180px;
  background-color: #7890e7;
  color: #fff;
  font-weight: 700;
`;

const ProgressBar = styled.div<{ progress: number }>`
  width: ${(props) => props.progress}%;
  height: 40px;
  background-color: #4362d0;
`;

const InactiveTab = styled.div`
  height: 40px;
  padding: 0 16px;
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
  height: 40px;
  position: relative;
  top: -40px;
  justify-content: space-between;
  display: flex;
  padding: 0px 16px;
  align-items: center;

  > div::selection {
    background-color: transparent;
    color: inherit;
  }
`;

const LeftArrow = styled.img`
  position: relative;
  top: -211px;
  left: -100px;
  visibility: visible;
`;

const RightArrow = styled.img`
  position: relative;
  top: -211px;
  left: 980px;
  visibility: visible;
`;

export default ListView;
