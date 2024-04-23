import styled from "styled-components";

export function SubscribeSnackbar() {
  return (
    <>
      <BlurBackGround></BlurBackGround>
      <SnackBar>내가 구독한 언론사에 추가되었습니다.</SnackBar>
    </>
  );
}

const BlurBackGround = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: white;
  opacity: 0.7;
`;

const SnackBar = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 16px;
  font-weight: 500;
  color: #fff;
  padding: 16px 24px;
  background-color: #4362d0;
`;
