import { increaseIndex, isInRange } from "../../../utils/Utils";
import styled, { keyframes } from "styled-components";
import { AllPressTabsProps, MENU_STATES, TabProps } from "../../../constants";
import { NewsContext } from "../../provider/NewsProvider";
import { useContext } from "react";
import usePageStore from "../../../hooks/usePageStore";

function AllPressTabs({ categories }: AllPressTabsProps) {
  const [{ news }] = useContext(NewsContext);
  const { page, setPage } = usePageStore();

  const increasePage = () => setPage(increaseIndex(page, news.length));

  return (
    <>
      {categories.map(({ name, details: { firstIndex, count } }) =>
        isInRange(page, firstIndex, count) ? (
          <ActiveTab>
            <ProgressBar key={`press-${page}`} onAnimationEnd={increasePage}></ProgressBar>
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

function SubscribedPressTabs() {
  const [{ subscription }] = useContext(NewsContext);
  const { subscriptionPage, setSubscriptionPage } = usePageStore();

  const increaseSubscriptionPage = () =>
    setSubscriptionPage(increaseIndex(subscriptionPage, subscription.length));

  return (
    <>
      {subscription.map(({ pressName }, index) =>
        subscriptionPage === index ? (
          <ActiveTab>
            <ProgressBar
              key={`subscribed-press-${subscriptionPage}`}
              onAnimationEnd={increaseSubscriptionPage}
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

function TabBlock({ menuSelected, categories }: TabProps) {
  return (
    <Container>
      {menuSelected === MENU_STATES.allPress && <AllPressTabs categories={categories} />}
      {menuSelected === MENU_STATES.subscribedPress && <SubscribedPressTabs />}
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

const ProgressBar = styled.div`
  height: 2.8571em;
  background-color: #4362d0;
  animation: ${increaseWidth} 20s linear;
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
