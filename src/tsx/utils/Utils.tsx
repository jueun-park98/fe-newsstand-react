export const increaseIndex: (index: number, maxIndex: number) => number = (index, maxIndex) => {
  return (index + 1) % maxIndex;
};

export const decreaseIndex: (index: number, maxIndex: number) => number = (index, maxIndex) => {
  return (maxIndex + index - 1) % maxIndex;
};

export const isInRange: (index: number, minIndex: number, count: number) => boolean = (index, minIndex, count) =>
  index >= minIndex && index < minIndex + count;