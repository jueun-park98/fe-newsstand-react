import { LogoState, News } from "../constants";

const LOGO_COUNT_PER_PAGE = 24;

export const increaseIndex: (index: number, maxIndex: number) => number = (index, maxIndex) => {
  return (index + 1) % maxIndex;
};

export const decreaseIndex: (index: number, maxIndex: number) => number = (index, maxIndex) => {
  return (maxIndex + index - 1) % maxIndex;
};

export const isInRange: (index: number, minIndex: number, count: number) => boolean = (index, minIndex, count) =>
  index >= minIndex && index < minIndex + count;

export const isSubscribed = (logoName: string, subscription: News[]) => {
  return subscription.some((item) => item.pressName === logoName);
};

export const calculateMaxPage = (items: LogoState[]) => Math.ceil(items.length / LOGO_COUNT_PER_PAGE);
