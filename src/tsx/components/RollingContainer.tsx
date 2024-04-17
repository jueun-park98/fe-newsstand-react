import React, { useEffect, useState } from "react";
import styled, { css, keyframes } from "styled-components";
import { RollingProps } from "./Interfaces";

const LEFT_START_INDEX = 1;
const RIGHT_START_INDEX = 2;
const INTERVAL_DELAY = 5000;
const TIMEOUT_DELAY = 1000;
const ITEM_TOP_START = 8;
const ITEM_TOP_INCREMENT = 20;

function RollingContainer({ news }: RollingProps) {
  const [leftIndex, setLeftIndex] = useState<number>(LEFT_START_INDEX);
  const [rightIndex, setRightIndex] = useState<number>(news.length - RIGHT_START_INDEX);
  const [animateRight, setAnimateRight] = useState<boolean>(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setLeftIndex(toggleLeftIndex(leftIndex, news.length));
    }, INTERVAL_DELAY);
    return () => clearInterval(interval);
  }, [leftIndex, news.length]);

  useEffect(() => {
    if (news.length > 0 && rightIndex < 1) {
      setRightIndex(news.length - RIGHT_START_INDEX);
      setTimeout(() => setAnimateRight(true), 1000);
      return;
    }

    const timer = setTimeout(() => {
      setRightIndex((prevIndex) => toggleRightIndex(prevIndex, news.length));
    }, TIMEOUT_DELAY);
    return () => clearTimeout(timer);
  }, [leftIndex, news.length]);

  return (
    <Container>
      <TextBox>
        {news.slice(leftIndex - 1, leftIndex + 1).map((element, index) => (
          <RollingText animate={true} style={{ top: `${ITEM_TOP_START + ITEM_TOP_INCREMENT * index}px` }}>
            <Press>{element?.pressName}</Press>
            <Title href={element?.headline?.href}>{element?.headline?.title}</Title>
          </RollingText>
        ))}
      </TextBox>
      <TextBox>
        {news
          .slice(rightIndex, rightIndex + 2)
          .reverse()
          .map((element, index) => (
            <RollingText animate={animateRight} style={{ top: `${ITEM_TOP_START + ITEM_TOP_INCREMENT * index}px` }}>
              <Press>{element?.pressName}</Press>
              <Title href={element?.headline?.href}>{element?.headline?.title}</Title>
            </RollingText>
          ))}
      </TextBox>
    </Container>
  );
}

const toggleLeftIndex: (prevLeftIndex: number, maxIndex: number) => number = (prevLeftIndex, maxIndex) => {
  return (prevLeftIndex + 1) % maxIndex;
};

const toggleRightIndex: (prevRightIndex: number, maxIndex: number) => number = (prevRightIndex, maxIndex) => {
  return (maxIndex + prevRightIndex - 1) % maxIndex;
};

const rollingAnimation = css`
  ${keyframes`
      0%, 80% {
        transform: translateY(0);
      }
      90%, 100% {
        transform: translateY(-2.7143em);
      }
    `} 5s infinite;
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

const RollingText = styled.div<{ animate: boolean }>`
  position: relative;
  display: flex;
  animation: ${(props) => (props.animate ? rollingAnimation : "none")};
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
