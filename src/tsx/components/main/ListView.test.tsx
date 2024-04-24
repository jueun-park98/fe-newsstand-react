import { pageReducer } from "./ListView";

describe('pageReducer 액션 테스트', () => {
  let initialState = {
    page: 0,
    subscriptionPage: 0,
    animateProgress: false,
  };

  describe('SET_PAGE 액션 처리', () => {
    //given
    beforeEach(() => {
      initialState = { page: 0, subscriptionPage: 0, animateProgress: false };
    });

    it('pageReducer가 page 속성을 업데이트하고 animateProgress를 false로 설정하는지 확인', () => {
      //when
      const action = { type: 'SET_PAGE', payload: { page: 2 } };
      const newState = pageReducer(initialState, action);

      //then
      const expectedState = { ...initialState, page: 2, animateProgress: false };
      expect(newState).toEqual(expectedState);
    });
  });

  describe('SET_SUBSCRIPTION_PAGE 액션 처리', () => {
    //given
    beforeEach(() => {
      initialState = { page: 0, subscriptionPage: 0, animateProgress: false };
    });

    it('pageReducer가 subscriptionPage 속성을 업데이트하고 animateProgress를 false로 설정하는지 확인', () => {
      //when
      const action = { type: 'SET_SUBSCRIPTION_PAGE', payload: { subscriptionPage: 3 } };
      const newState = pageReducer(initialState, action);

      //then
      const expectedState = { ...initialState, subscriptionPage: 3, animateProgress: false };
      expect(newState).toEqual(expectedState);
    });
  });

  describe('START_ANIMATION 액션 처리', () => {
    //given
    beforeEach(() => {
      initialState = { page: 0, subscriptionPage: 0, animateProgress: false };
    });

    it('pageReducer가 animateProgress를 true로 설정하는지 확인', () => {
      //when
      const action = { type: 'START_ANIMATION', payload: {} };
      const newState = pageReducer(initialState, action);

      //then
      const expectedState = { ...initialState, animateProgress: true };
      expect(newState).toEqual(expectedState);
    });
  });

  describe('유효하지 않은 액션 처리', () => {
    //given
    beforeEach(() => {
      initialState = { page: 0, subscriptionPage: 0, animateProgress: false };
    });

    it('pageReducer가 상태를 바꾸지 않고 그대로 반환 하는지 확인', () => {
      //when
      const action = { type: 'UNKNOWN', payload: {} };
      const newState = pageReducer(initialState, action);

      //then
      expect(newState).toEqual(initialState);
    });
  });

  describe('payload에 page가 없는 SET_PAGE 액션 처리', () => {
    //given
    beforeEach(() => {
      initialState = { page: 0, subscriptionPage: 0, animateProgress: false };
    });

    it('pageReducer가 상태를 바꾸지 않고 그대로 반환 하는지 확인', () => {
      //when
      const action = { type: 'SET_PAGE', payload: {} };
      const newState = pageReducer(initialState, action);

      //then
      expect(newState).toEqual(initialState);
    });
  });

  describe('payload에 subscriptionPage가 없는 SET_SUBSCRIPTION_PAGE 액션 처리', () => {
    //given
    beforeEach(() => {
      initialState = { page: 0, subscriptionPage: 0, animateProgress: false };
    });

    it('pageReducer가 상태를 바꾸지 않고 그대로 반환 하는지 확인', () => {
      //when
      const action = { type: 'SET_SUBSCRIPTION_PAGE', payload: {} };
      const newState = pageReducer(initialState, action);

      //then
      expect(newState).toEqual(initialState);
    });
  });
});
