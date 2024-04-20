import React, { useEffect, useState } from "react";
import styled, { css, keyframes } from "styled-components";
import { News, RollingProps } from "./constants";
import { increaseIndex, decreaseIndex } from "../utils/Utils";

const LEFT_START_INDEX = 1;
const RIGHT_START_INDEX = 2;
const INTERVAL_DELAY = 5000;
const TIMEOUT_DELAY = 1000;
const ITEM_TOP_START = 0.5714;
const ITEM_TOP_END = -2.0714;
const ITEM_TOP_INCREMENT = 1.4286;

function RollingContainer({ news }: RollingProps) {
  const [leftIndex, setLeftIndex] = useState<number>(LEFT_START_INDEX);
  const [rightIndex, setRightIndex] = useState<number>(news.length - RIGHT_START_INDEX);
  const [animateLeft, setAnimateLeft] = useState<boolean>(false);
  const [animateRight, setAnimateRight] = useState<boolean>(false);

  const updateLeftStates = () => {
    setLeftIndex(increaseIndex(leftIndex, news.length));
    setAnimateLeft(true);
  };
  const updateRightStates = () => {
    setRightIndex((prevIndex) => decreaseIndex(prevIndex, news.length));
    setAnimateRight(true);
  };

  useEffect(() => {
    const timer = setTimeout(updateLeftStates, INTERVAL_DELAY);
    return () => clearTimeout(timer);
  }, [leftIndex, news.length]);

  useEffect(() => {
    if (news.length > 0 && rightIndex < 1) {
      setRightIndex(news.length - RIGHT_START_INDEX);
      return;
    }

    const timer = setTimeout(updateRightStates, TIMEOUT_DELAY);
    return () => clearTimeout(timer);
  }, [leftIndex, news.length]);

  return (
    <Container>
      <TextBox>
        {news
          .slice(leftIndex - 1, leftIndex + 1)
          .map((element, index) => renderRollingText(element, index, animateLeft, setAnimateLeft))}
      </TextBox>
      <TextBox>
        {news
          .slice(rightIndex, rightIndex + 2)
          .reverse()
          .map((element, index) => renderRollingText(element, index, animateRight, setAnimateRight))}
      </TextBox>
    </Container>
  );
}

const renderRollingText = (
  news: News,
  index: number,
  animate: boolean,
  setAnimationState: (state: boolean) => void
) => {
  return (
    <RollingText animate={animate} index={index} onAnimationEnd={() => setAnimationState(false)}>
      <Press>{news.pressName}</Press>
      <Title href={news.headline.href}>{news.headline.title}</Title>
    </RollingText>
  );
};

const rollingAnimation = keyframes`
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-2.6428em);
  }
`;

const Container = styled.div`
  margin-top: 2.8571em;
  display: flex;
  justify-content: space-between;
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 32.85em;
  height: 3.43em;
  border: 0.0714em solid #d2dae0;
  background-color: #f5f7f9;
  overflow: hidden;
`;

const RollingText = styled.div<{ animate: boolean; index: number }>`
  position: relative;
  display: flex;
  ${({ animate }) =>
    animate &&
    css`
      animation: ${rollingAnimation} 0.5s ease-out;
      animation-fill-mode: forwards;
    `};
  top: ${({ animate, index }) =>
    animate
      ? `${ITEM_TOP_START + ITEM_TOP_INCREMENT * index}em;`
      : `${ITEM_TOP_END + ITEM_TOP_INCREMENT * index}em;`};
`;

const Press = styled.span`
  margin-left: 1.1429em;
  font-size: 1em;
  font-weight: 700;
  color: #14212b;
  white-space: nowrap;
`;

const Title = styled.a`
  margin-left: 1.1429em;
  font-size: 1em;
  font-weight: 500;
  color: #4b5966;
  text-decoration: none;
  margin-right: 1.4286em;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;

  &:hover {
    text-decoration: underline;
  }
`;

export default RollingContainer;
