import React, { useEffect, useState } from "react";
import styled, { css, keyframes } from "styled-components";
import { RollingProps } from "./Interfaces";

const LEFT_START_INDEX = 2;
const RIGHT_START_INDEX = 3;
const INTERVAL_DELAY = 5000;
const TIMEOUT_DELAY = 1000;
const ITEM_TOP_START = -20;
const ITEM_TOP_INCREMENT = 20;

function RollingContainer({ news }: RollingProps) {
  const [leftIndex, setLeftIndex] = useState<number>(LEFT_START_INDEX);
  const [rightIndex, setRightIndex] = useState<number>(news.length - RIGHT_START_INDEX);

  useEffect(() => {
    const interval = setInterval(() => {
      setLeftIndex(toggleLeftIndex(leftIndex, news.length));
    }, INTERVAL_DELAY);
    return () => clearInterval(interval);
  }, [news.length]);

  useEffect(() => {
    if (news.length > 0 && rightIndex < 0) {
      setTimeout(() => setRightIndex(news.length - RIGHT_START_INDEX), TIMEOUT_DELAY);
      return;
    }

    const timer = setTimeout(() => {
      setRightIndex(toggleRightIndex(rightIndex, news.length));
    }, TIMEOUT_DELAY);
    return () => clearTimeout(timer);
  }, [leftIndex, news.length]);

  return (
    <Container>
      <TextBox key={leftIndex}>
        {news
          .slice(leftIndex - 2, leftIndex + 1)
          .map((element, index) => (
            <RollingText style={{ top: `${ITEM_TOP_START + ITEM_TOP_INCREMENT * index}px` }}>
              <Press>{element?.pressName}</Press>
              <Title href={element?.headline?.href}>{element?.headline?.title}</Title>
            </RollingText>
        ))}
      </TextBox>
      <TextBox key={rightIndex}>
        {news
          .slice(rightIndex - 1, rightIndex + 2)
          .reverse()
          .map((element, index) => (
            <RollingText style={{ top: `${ITEM_TOP_START + ITEM_TOP_INCREMENT * index}px` }}>
              <Press>{element?.pressName}</Press>
              <Title href={element?.headline?.href}>{element?.headline?.title}</Title>
            </RollingText>
          ))}
      </TextBox>
    </Container>
  );
}

const toggleLeftIndex: (prevLeftIndex: number, maxIndex: number) => number = (prevLeftIndex, maxIndex) => {
  return prevLeftIndex === maxIndex - 1 ? LEFT_START_INDEX : prevLeftIndex + 1;
};

const toggleRightIndex: (prevRightIndex: number, maxIndex: number) => number = (prevRightIndex, maxIndex) => {
  return prevRightIndex < 1 ? maxIndex - RIGHT_START_INDEX : prevRightIndex - 1;
};

const rollingAnimation = css`
  ${keyframes`
      0% {
        transform: translateY(0);
      }
      90% {
        transform: translateY(0);
      }
      100% {
        transform: translateY(-2.7142em);
      }
    `} 5s linear;
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
  border: 1px solid #d2dae0;
  background-color: #f5f7f9;
  overflow: hidden;
`;

const RollingText = styled.div`
  position: relative;
  display: flex;
  animation: ${rollingAnimation};
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
