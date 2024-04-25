import { decreaseIndex, increaseIndex, isInRange } from "./Utils";

describe("increaseIndex 단위 테스트", () => {
  it("주어진 인덱스가 maxIndex 보다 낮을 때 다음 인덱스를 반환하는지 확인", () => {
    // given
    const index = 0;
    const maxIndex = 5;

    // when
    const result = increaseIndex(index, maxIndex);

    // then
    expect(result).toBe(1);
  });

  it("주어진 인덱스가 maxIndex에 도달하였을 때 0을 반환하는지 확인", () => {
    // given
    const index = 4;
    const maxIndex = 5;

    // when
    const result = increaseIndex(index, maxIndex);

    // then
    expect(result).toBe(0);
  });
});

describe("decreaseIndex 단위 테스트", () => {
  it("주어진 인덱스가 0 보다 크면 현재 인덱스 - 1 을 반환하는지 확인", () => {
    // given
    const index = 1;
    const maxIndex = 5;

    // when
    const result = decreaseIndex(index, maxIndex);

    // then
    expect(result).toBe(0);
  });

  it("주어진 인덱스가 0 이면 maxIndex - 1 을 반환하는지 확인", () => {
    // given
    const index = 0;
    const maxIndex = 5;

    // when
    const result = decreaseIndex(index, maxIndex);

    // then
    expect(result).toBe(4);
  });
});

describe("isInRange 단위 테스트", () => {
  it("주어진 인덱스가 최소 인덱스와 최소 인덱스 + count 사이에 있으면 true를 반환하는지 확인", () => {
    // given
    const index = 1;
    const minIndex = 0;
    const count = 5;

    // when
    const inRange = isInRange(index, minIndex, count);

    // then
    expect(inRange).toBe(true);
  });

  it("주어진 인덱스가 최소 인덱스와 최소 인덱스 + count 시이에 있지 않으면 false를 반환하는지 확인", () => {
    // given
    const index = 5;
    const minIndex = 0;
    const count = 5;

    // when
    const inRange = isInRange(index, minIndex, count);

    // then
    expect(inRange).toBe(false);
  });
});
