import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import SubscribeButton from "./SubscribeButton";

describe("SubscribeButton 테스트", () => {
  it("isSubscribed가 false일 때 구독하기 메시지를 담은 컴포넌트를 렌더링 하는지 확인", () => {
    //given
    const mockButtonProps = {
      name: "테스트 언론사",
      onSubscribe: jest.fn(),
      onUnsubscribe: jest.fn(),
      isSubscribed: false,
    };
    const message = "구독하기";

    //when
    render(
      <SubscribeButton
        name={mockButtonProps.name}
        onSubscribe={mockButtonProps.onSubscribe}
        onUnsubscribe={mockButtonProps.onUnsubscribe}
        isSubscribed={mockButtonProps.isSubscribed}
      />
    );

    //then
    expect(screen.getByText(message)).toBeInTheDocument();
  });

  it("isSubscribed가 true일 때 컴포넌트가 메시지 없이 plusSymbol 이미지만 포함하는지 확인", () => {
    //given
    const mockButtonProps = {
      name: "테스트 언론사",
      onSubscribe: jest.fn(),
      onUnsubscribe: jest.fn(),
      isSubscribed: true,
    };
    const message = "구독하기";

    //when
    render(
      <SubscribeButton
        name={mockButtonProps.name}
        onSubscribe={mockButtonProps.onSubscribe}
        onUnsubscribe={mockButtonProps.onUnsubscribe}
        isSubscribed={mockButtonProps.isSubscribed}
      />
    );
    const buttonText = screen.queryByText(message);

    //then
    expect(buttonText).toBeNull();
  });

  it("구독버튼을 클릭하였을 때 onSubscribe 메서드가 name과 함께 호출되는지 확인", () => {
    //given
    const mockButtonProps = {
      name: "테스트 언론사",
      onSubscribe: jest.fn(),
      onUnsubscribe: jest.fn(),
      isSubscribed: false,
    };
    const message = "구독하기";

    //when
    render(
      <SubscribeButton
        name={mockButtonProps.name}
        onSubscribe={mockButtonProps.onSubscribe}
        onUnsubscribe={mockButtonProps.onUnsubscribe}
        isSubscribed={mockButtonProps.isSubscribed}
      />
    );
    fireEvent.click(screen.getByRole("button"));

    //then
    expect(mockButtonProps.onSubscribe).toHaveBeenCalledWith(mockButtonProps.name);
  });

  it("구독해지 버튼을 클릭하였을 때 onUnsubscribe 메서드가 name과 함께 호출되는지 확인", () => {
    //given
    const mockButtonProps = {
      name: "테스트 언론사",
      onSubscribe: jest.fn(),
      onUnsubscribe: jest.fn(),
      isSubscribed: true,
    };

    //when
    render(
      <SubscribeButton
        name={mockButtonProps.name}
        onSubscribe={mockButtonProps.onSubscribe}
        onUnsubscribe={mockButtonProps.onUnsubscribe}
        isSubscribed={mockButtonProps.isSubscribed}
      />
    );
    fireEvent.click(screen.getByRole("button"));

    //then
    expect(mockButtonProps.onUnsubscribe).toHaveBeenCalledWith(mockButtonProps.name);
  });
});
