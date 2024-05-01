import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import DetailedNews from "./DetailedNews";
import { DetailedNewsProps } from "../../../constants";

const mockNewsItem: DetailedNewsProps = {
  newsItem: {
    _id: "1234",
    category: "Test Category",
    logoImageSrc: "logo.png",
    editedTime: "2024-04-24",
    headline: {
      thumbnailSrc: "thumbnail.png",
      href: "https://example.com",
      title: "Example Headline",
    },
    sideNews: [
      { href: "https://example.com/side1", title: "Side News 1" },
      { href: "https://example.com/side2", title: "Side News 2" },
    ],
    pressName: "Example Press",
  },
  onSubscribe: jest.fn(),
  onUnsubscribe: jest.fn(),
  isSubscribed: false,
};

describe("DetailedNews 렌더 테스트", () => {
  it("DetailedNews가 mockNewsItem의 내용을 담은 하위 컴포넌트와 함께 렌더링 되는지 확인", () => {
    //given
    const { newsItem, onSubscribe, onUnsubscribe, isSubscribed } = mockNewsItem;

    //when
    render(
      <DetailedNews
        newsItem={newsItem}
        onSubscribe={onSubscribe}
        onUnsubscribe={onUnsubscribe}
        isSubscribed={isSubscribed}
      />
    );

    //then
    expect(screen.getByText(newsItem.headline.title)).toBeInTheDocument();
    newsItem.sideNews.forEach((sideNews) => {
      expect(screen.getByText(sideNews.title)).toBeInTheDocument();
    });
    expect(screen.getByText(newsItem.editedTime)).toBeInTheDocument();
    expect(screen.getByText(`${newsItem.pressName} 언론사에서 직접 편집한 뉴스입니다.`)).toBeInTheDocument();
  });

  it("DetailedNews의 하위 컴포넌트 attributes에 값이 저장되는지 확인 ", () => {
    //given
    const { newsItem, onSubscribe, onUnsubscribe, isSubscribed } = mockNewsItem;

    //when
    render(
      <DetailedNews
        newsItem={newsItem}
        onSubscribe={onSubscribe}
        onUnsubscribe={onUnsubscribe}
        isSubscribed={isSubscribed}
      />
    );

    //then
    expect(screen.getByAltText("logo")).toHaveAttribute("src", newsItem.logoImageSrc);
    expect(screen.getByText(newsItem.headline.title)).toHaveAttribute("href", newsItem.headline.href);
    newsItem.sideNews.forEach((sideNews) => {
      expect(screen.getByText(sideNews.title)).toHaveAttribute("href", sideNews.href);
    });
  });
});
