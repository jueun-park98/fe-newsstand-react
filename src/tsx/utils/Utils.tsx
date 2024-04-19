export const increaseIndex: (index: number, maxIndex: number) => number = (index, maxIndex) => {
  return (index + 1) % maxIndex;
};

export const decreaseIndex: (index: number, maxIndex: number) => number = (index, maxIndex) => {
  return (maxIndex + index - 1) % maxIndex;
};