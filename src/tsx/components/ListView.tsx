import styled from "styled-components";
import leftArrow from "../../img/leftArrow.svg";
import rightArrow from "../../img/rightArrow.svg";
import { ViewProps } from "./constants";
import { useEffect, useState } from "react";
import { decreaseIndex, increaseIndex } from "../utils/Utils";

function ListView({ news, subscriptions, menuSelected }: ViewProps) {
  const [page, setPage] = useState<number>(0);
  const [subscriptionPage, setSubscriptionPage] = useState<number>(0);
  const categories = Array.from(
    news.reduce((acc, cur, index) => {
      if (!acc.has(cur.category)) {
        acc.set(cur.category, { firstIndex: index, count: 1 });
        return acc;
      }
      const current = acc.get(cur.category);
      if (current) acc.set(cur.category, { firstIndex: current?.firstIndex, count: current.count + 1 });
      return acc;
    }, new Map<string, { firstIndex: number; count: number }>())
  );

  return (
    <Container>
      <TabBlock>
        {categories.map(([category, details]) => 
        
        (
          <InactiveTab onClick={() => setPage(details.firstIndex)}>{category}</InactiveTab>
        ))}
      </TabBlock>
      <DetailedNews>
        <NewsInfo>
          <img src={news[page].logoImageSrc} alt="logo" />
          <EditedTime>{news[page].editedTime}</EditedTime>
        </NewsInfo>
        <NewsContent>
          <Headline>
            <Thumbnail src={news[page].headline.thumbnailSrc}></Thumbnail>
            <HeadlineTitle href={news[page].headline.href}>{news[page].headline.title}</HeadlineTitle>
          </Headline>
          <Sidenews>
            {news[page].sideNews.map((element) => (
              <SideNewsTitle href={element.href}>{element.title}</SideNewsTitle>
            ))}
            <span>{news[page].pressName} 언론사에서 직접 편집한 뉴스입니다.</span>
          </Sidenews>
        </NewsContent>
      </DetailedNews>
      <LeftArrow src={leftArrow} onClick={() => setPage(decreaseIndex(page, news.length))}></LeftArrow>
      <RightArrow src={rightArrow} onClick={() => setPage(increaseIndex(page, news.length))}></RightArrow>
    </Container>
  );
}

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
  width: 166px;
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
  width: 134px;
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

const DetailedNews = styled.div`
  height: 300px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const NewsInfo = styled.div`
  display: flex;
  align-items: center;

  > img {
    height: 20px;
  }
`;

const EditedTime = styled.div`
  color: #5f6e76;
  font-size: 12px;
  font-weight: var(--def-font-weight);
  margin-left: 16px;
`;

const NewsContent = styled.div`
  display: flex;
`;

const Headline = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 320px;
  padding-right: 32px;
`;

const Thumbnail = styled.img`
  width: 320px;
  height: 200px;

  &:hover {
    cursor: pointer;
    transform: scale(1.05);
    transition: transform 0.35s;
  }
`;

const HeadlineTitle = styled.a<{}>`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  height: 38.75px;
  font-size: 16px;
  margin-top: 16px;
  color: #14212b;
  text-decoration: none;
  text-overflow: ellipsis;
  white-space: normal;

  &:hover {
    text-decoration: underline;
  }
`;

const Sidenews = styled.div`
  height: 245px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  white-space: nowrap;
  overflow: hidden;

  > span {
    font-weight: 500;
    color: #879298;
  }
`;

const SideNewsTitle = styled.a`
  font-size: 16px;
  font-weight: 500;
  color: #4b5966;
  text-decoration-line: none;
  text-overflow: ellipsis;
  overflow: hidden;

  &:hover {
    text-decoration: underline;
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
