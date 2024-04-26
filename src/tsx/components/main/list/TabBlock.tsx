import { increaseIndex, isInRange } from "../../../utils/Utils";
import styled, { css, keyframes } from "styled-components";
import {
  AllPressTabsProps,
  MENU_STATES,
  SubscribedPressTabsProps,
  TabProps,
} from "../../../constants";
import { NewsContext } from "../../provider/NewsProvider";
import { useContext, useEffect } from "react";

function AllPressTabs({
  categories,
  page,
  animateProgress,
  increasePage,
  setPage,
}: AllPressTabsProps) {
  return (
    <>
      {categories.map(({ name, details: { firstIndex, count } }) =>
        isInRange(page, firstIndex, count) ? (
          <ActiveTab>
            <ProgressBar
              animate={animateProgress}
              onAnimationIteration={increasePage}
            ></ProgressBar>
            <TabDescription>
              <div>{name}</div>
              <div>
                {page - firstIndex + 1} / <NewsCount>{count}</NewsCount>
              </div>
            </TabDescription>
          </ActiveTab>
        ) : (
          <InactiveTab onClick={() => setPage(firstIndex)}>{name}</InactiveTab>
        )
      )}
    </>
  );
}

function SubscribedPressTabs({
  subscription,
  subscriptionPage,
  animateProgress,
  increaseSubscriptionPage,
  setSubscriptionPage,
}: SubscribedPressTabsProps) {
  return (
    <>
      {subscription.map(({ pressName }, index) =>
        subscriptionPage === index ? (
          <ActiveTab>
            <ProgressBar
              animate={animateProgress}
              onAnimationIteration={increaseSubscriptionPage}
            ></ProgressBar>
            <TabDescription>
              <div>{pressName}</div>
            </TabDescription>
          </ActiveTab>
        ) : (
          <InactiveTab onClick={() => setSubscriptionPage(index)}>{pressName}</InactiveTab>
        )
      )}
    </>
  );
}

function TabBlock({ menuSelected, categories, pageState, dispatch }: TabProps) {
  const [{ news, subscription }] = useContext(NewsContext);
  const { page, subscriptionPage, animateProgress } = pageState;

  const setPage = (page: number) => dispatch({ type: "SET_PAGE", payload: { page } });
  const increasePage = () => setPage(increaseIndex(page, news.length));
  const setSubscriptionPage = (subscriptionPage: number) =>
    dispatch({ type: "SET_SUBSCRIPTION_PAGE", payload: { subscriptionPage } });
  const increaseSubscriptionPage = () =>
    setSubscriptionPage(increaseIndex(subscriptionPage, subscription.length));

  useEffect(() => {
    dispatch({ type: "START_ANIMATION" });
  }, [page, subscriptionPage]);

  return (
    <Container>
      {menuSelected === MENU_STATES.allPress && (
        <AllPressTabs
          categories={categories}
          page={page}
          animateProgress={animateProgress}
          increasePage={increasePage}
          setPage={setPage}
        />
      )}
      {menuSelected === MENU_STATES.subscribedPress && (
        <SubscribedPressTabs
          subscription={subscription}
          subscriptionPage={subscriptionPage}
          animateProgress={animateProgress}
          increaseSubscriptionPage={increaseSubscriptionPage}
          setSubscriptionPage={setSubscriptionPage}
        />
      )}
    </Container>
  );
}

const increaseWidth = keyframes`
  from {
    width: 0%;
  }
  to {
    width: 100%;
  }
`;

const Container = styled.div`
  width: 100%;
  height: 2.8571em;
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
  flex: 0 0 12.8571em;
  background-color: #7890e7;
  color: #fff;
  font-weight: 700;
`;

const ProgressBar = styled.div<{ animate: boolean }>`
  height: 2.8571em;
  background-color: #4362d0;
  ${({ animate }) =>
    animate &&
    css`
      animation: ${increaseWidth} 20s infinite linear;
    `};
`;

const InactiveTab = styled.div`
  height: 2.8571em;
  padding: 0 1.1428em;
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
  width: 82%;
  height: 2.8571em;
  position: relative;
  top: -2.8571em;
  justify-content: space-between;
  display: flex;
  padding: 0 1.1428em;
  align-items: center;

  > div::selection {
    background-color: transparent;
    color: inherit;
  }
`;

const NewsCount = styled.span`
  opacity: 0.7;
`;

export default TabBlock;
