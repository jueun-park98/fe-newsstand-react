import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import PressContainer from "./PressContainer";

describe("PressContainer", () => {
  //given
  const allPressText = "전체 언론사";
  const subscribedPressText = "내가 구독한 언론사";
  const listIconText = "list-icon";
  const gridIconText = "grid-icon";

  it("전체 언론사와 내가 구독한 언론사 메뉴가 정상적으로 렌더링 되는지 확인", () => {
    //when
    render(<PressContainer />);

    //then
    expect(screen.getByText(allPressText)).toBeInTheDocument();
    expect(screen.getByText(subscribedPressText)).toBeInTheDocument();
  });

  it("리스트 아이콘과 그리드 아이콘이 정상적으로 렌더링 되는지 확인", () => {
    //when
    render(<PressContainer />);

    //then
    expect(screen.getByAltText(listIconText)).toBeInTheDocument();
    expect(screen.getByAltText(gridIconText)).toBeInTheDocument();
  });

  it("구독한 언론사가 클릭 되었을 때 aria-selected 속성이 true로 변경 되는지 확인", () => {
    //when
    render(<PressContainer />);
    const subscribedPressMenu = screen.getByText(subscribedPressText);
    fireEvent.click(subscribedPressMenu);

    //then
    expect(subscribedPressMenu).toHaveAttribute("aria-selected", "true");
  });

  it("리스트 아이콘이 클릭 되었을 때 aria-selected 속성이 true로 변경 되는지 확인", () => {
    //when
    render(<PressContainer />);
    const listIcon = screen.getByAltText(listIconText);
    fireEvent.click(listIcon);

    //then
    expect(listIcon).toHaveAttribute("aria-selected", "true");
  });
});
