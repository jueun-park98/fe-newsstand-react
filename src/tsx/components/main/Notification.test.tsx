import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { SubscribeSnackbar, UnsubscribeAlert } from './Notification';
import { SubscribeContext } from '../provider/SubscribeProvider';

describe('SubscribeSnackbar 렌더 테스트', () => {
  it('정해진 메시지를 담은 스낵바가 렌더링 되는지 확인', () => {
    //given
    const message = "내가 구독한 언론사에 추가되었습니다.";

    //when
    render(<SubscribeSnackbar />);

    //then
    expect(screen.getByText(message)).toBeInTheDocument();
  });
});

describe('UnsubscribeAlert 렌더 테스트', () => {
  it('언론사의 이름을 담은 알럿이 출력되고 submit, cancel 클릭 이벤트가 호출이 정상적으로 되는지 확인', () => {
    //given
    const mockUnsubscribe = jest.fn();
    const mockDispatch = jest.fn();
    const name = "테스트 언론사";
    const messages = [name, "을(를)", "구독해지 하시겠습니까?"];
    const initialSubscribeState = {
      showSnackBar: false,
      showAlert: false,
      alertMessage: "",
    };

    //when
    render(
      <SubscribeContext.Provider value={[initialSubscribeState, mockDispatch]}>
        <UnsubscribeAlert name={name} onUnsubscribe={mockUnsubscribe} />
      </SubscribeContext.Provider>
    );

    //then
    messages.forEach((message) => {
      expect(screen.getByText(message)).toBeInTheDocument();
    });

    //when (submit click)
    fireEvent.click(screen.getByText(/예, 해지합니다/i));

    //then
    expect(mockUnsubscribe).toHaveBeenCalledWith(name);

    //when (cancel click)
    fireEvent.click(screen.getByText(/아니오/i));

    //then
    expect(mockDispatch).toHaveBeenCalledWith({ type: "SET_SHOW_ALERT", payload: { showAlert: false } });
  });
});