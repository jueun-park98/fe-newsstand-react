import { SubscribeAction } from "../../constants";
import { initialSubscribeState, subscribeReducer } from "./SubscribeProvider";

describe('subscribeReducer 액션 테스트', () => {
  it('SET_SHOW_SNACKBAR 액션 처리', () => {
    const action = { type: 'SET_SHOW_SNACKBAR', payload: { showSnackBar: true } } as SubscribeAction;
    const updatedState = subscribeReducer(initialSubscribeState, action);
    expect(updatedState).toEqual({
      ...initialSubscribeState,
      showSnackBar: true,
    });
  });

  it('SET_SHOW_ALERT 액션 처리', () => {
    const action = { type: 'SET_SHOW_ALERT', payload: { showAlert: true } } as SubscribeAction;
    const updatedState = subscribeReducer(initialSubscribeState, action);
    expect(updatedState).toEqual({
      ...initialSubscribeState,
      showAlert: true,
    });
  });

  it('SET_ALERT_MESSAGE 액션 처리', () => {
    const action = { type: 'SET_ALERT_MESSAGE', payload: { alertMessage: '서울파이낸스' } } as SubscribeAction;
    const updatedState = subscribeReducer(initialSubscribeState, action);
    expect(updatedState).toEqual({
      ...initialSubscribeState,
      alertMessage: '서울파이낸스',
    });
  });

  it('알 수 없는 액션 처리', () => {
    const action = { type: 'UNKNOWN', payload: {} } as SubscribeAction;
    const updatedState = subscribeReducer(initialSubscribeState, action);
    expect(updatedState).toEqual(initialSubscribeState);
  });
});
