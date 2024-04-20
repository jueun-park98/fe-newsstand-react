import styled from 'styled-components';
import { NewsProps } from "./constants";

function DetailedNews({ newsItem }: NewsProps) {
  return (
    <Container>
      <NewsInfo>
        <img src={newsItem.logoImageSrc} alt="logo" />
        <EditedTime>{newsItem.editedTime}</EditedTime>
      </NewsInfo>
      <NewsContent>
        <Headline>
          <Thumbnail src={newsItem.headline.thumbnailSrc}></Thumbnail>
          <HeadlineTitle href={newsItem.headline.href}>{newsItem.headline.title}</HeadlineTitle>
        </Headline>
        <Sidenews>
          {newsItem.sideNews.map((element) => (
            <SideNewsTitle href={element.href}>{element.title}</SideNewsTitle>
          ))}
          <span>{newsItem.pressName} 언론사에서 직접 편집한 뉴스입니다.</span>
        </Sidenews>
      </NewsContent>
    </Container>
  );
}

const Container = styled.div`
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

export default DetailedNews;