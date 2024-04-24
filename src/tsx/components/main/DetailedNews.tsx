import styled from "styled-components";
import { DetailedNewsProps, NewsProps } from "../../constants";
import SubscribeButton from "./SubscribeButton";

function DetailedNews({ newsItem, onSubscribe, onUnsubscribe, isSubscribed }: DetailedNewsProps) {
  const {
    logoImageSrc,
    editedTime,
    headline: { thumbnailSrc, href, title },
    sideNews,
    pressName,
  } = newsItem;

  return (
    <Container>
      <NewsInfo>
        <img src={logoImageSrc} alt="logo" />
        <EditedTime>{editedTime}</EditedTime>
        <SubscribeButton
          name={pressName}
          onSubscribe={onSubscribe}
          onUnsubscribe={onUnsubscribe}
          isSubscribed={isSubscribed}
        ></SubscribeButton>
      </NewsInfo>
      <NewsContent>
        <Headline>
          <Thumbnail src={thumbnailSrc}></Thumbnail>
          <HeadlineTitle href={href}>{title}</HeadlineTitle>
        </Headline>
        <Sidenews>
          {sideNews.map((element) => (
            <SideNewsTitle href={element.href}>{element.title}</SideNewsTitle>
          ))}
          <span>{pressName} 언론사에서 직접 편집한 뉴스입니다.</span>
        </Sidenews>
      </NewsContent>
    </Container>
  );
}

const Container = styled.div`
  height: 21.4286em;
  padding: 1.7143em;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const NewsInfo = styled.div`
  display: flex;
  align-items: center;

  > img {
    height: 1.4286em;
  }
`;

const EditedTime = styled.div`
  color: #5f6e76;
  font-size: 0.8571em;
  font-weight: 500;
  margin-left: 1.1429em;
  margin-right: 1.1429em;
`;

const NewsContent = styled.div`
  display: flex;
`;

const Headline = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 22.8571em;
  padding-right: 2.2857em;
`;

const Thumbnail = styled.img`
  width: 22.8571em;
  height: 14.2857em;

  &:hover {
    cursor: pointer;
    transform: scale(1.05);
    transition: transform 0.35s;
  }
`;

const HeadlineTitle = styled.a`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  height: 2.7679em;
  font-size: 1.1429em;
  margin-top: 1.1429em;
  color: #14212b;
  text-decoration: none;
  text-overflow: ellipsis;
  white-space: normal;

  &:hover {
    text-decoration: underline;
  }
`;

const Sidenews = styled.div`
  height: 17.5em;
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
  font-size: 1.1429em;
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
