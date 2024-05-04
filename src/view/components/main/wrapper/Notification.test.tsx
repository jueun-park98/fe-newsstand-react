import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { SubscribeSnackbar, UnsubscribeAlert } from "./Notification";

describe("SubscribeSnackbar 렌더 테스트", () => {
  it("정해진 메시지를 담은 스낵바가 렌더링 되는지 확인", () => {
    //given
    const message = "내가 구독한 언론사에 추가되었습니다.";

    //when
    render(<SubscribeSnackbar />);

    //then
    expect(screen.getByText(message)).toBeInTheDocument();
  });
});

describe("UnsubscribeAlert 테스트", () => {
  //given
  const mockUnsubscribe = jest.fn();
  const mockDispatch = jest.fn();
  const name = "테스트 언론사";
  const messages = [name, "을(를)", "구독해지 하시겠습니까?"];

  it("알럿이 언론사의 이름와 함께 렌더링 되는지 확인", () => {
    //when
    render(<UnsubscribeAlert name={name} onUnsubscribe={mockUnsubscribe} />);

    //then
    messages.forEach((message) => {
      expect(screen.getByText(message)).toBeInTheDocument();
    });
  });

  it("알럿이 출력된 후 Submit 클릭 후 Unsubscribe 함수가 호출되는지 확인", () => {
    //when
    render(<UnsubscribeAlert name={name} onUnsubscribe={mockUnsubscribe} />);
    fireEvent.click(screen.getByText(/예, 해지합니다/i));

    //then
    expect(mockUnsubscribe).toHaveBeenCalledWith(name);
  });

  it("알럿이 출력된 후 Cancel 클릭 후 { showAlert: false }를 담은 payload를 디스패치 하는지 확인", () => {
    //when
    render(<UnsubscribeAlert name={name} onUnsubscribe={mockUnsubscribe} />);
    fireEvent.click(screen.getByText(/아니오/i));

    //then
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "SET_SHOW_ALERT",
      payload: { showAlert: false },
    });
  });
});
