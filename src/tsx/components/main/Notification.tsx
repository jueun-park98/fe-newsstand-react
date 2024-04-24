import styled from "styled-components";
import { AlertProps } from "../../constants";
import { useContext } from "react";
import { SubscribeContext } from "../provider/SubscribeProvider";

export function SubscribeSnackbar() {
  return (
    <>
      <BlurBackGround></BlurBackGround>
      <SnackBar>내가 구독한 언론사에 추가되었습니다.</SnackBar>
    </>
  );
}

export function UnsubscribeAlert({ name, onUnsubscribe }: AlertProps) {
  const [_, subscribeDispatch] = useContext(SubscribeContext);

  return (
    <AlertContainer>
      <AlertContent>
        <span>
          <strong>{name}</strong>을(를)
        </span>
        <span>구독해지 하시겠습니까?</span>
      </AlertContent>
      <AlertClickable>
        <AlertSubmit onClick={() => onUnsubscribe(name)}>예, 해지합니다</AlertSubmit>
        <AlertCancel
          onClick={() =>
            subscribeDispatch({ type: "SET_SHOW_ALERT", payload: { showAlert: false } })
          }
        >
          아니오
        </AlertCancel>
      </AlertClickable>
    </AlertContainer>
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
  z-index: 10;
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
  z-index: 11;
`;

const AlertContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 16px;
  font-weight: 500;
  border: 1px solid #d2dae0;
  z-index: 10;
`;

const AlertContent = styled.div`
  width: 320px;
  height: 92px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  color: #5f6e76;
  border: 1px solid #d2dae0;

  & > span > strong {
    font-size: 700;
    color: #14212b;
  }
`;

const AlertClickable = styled.div`
  height: 48px;
  display: flex;
  background-color: #f5f7f9;
`;

const AlertSubmit = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #5f6e76;
  border: 1px solid #d2dae0;

  &:hover {
    text-decoration: underline;
  }
`;

const AlertCancel = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #14212b;
  border: 1px solid #d2dae0;

  &:hover {
    text-decoration: underline;
  }
`;
