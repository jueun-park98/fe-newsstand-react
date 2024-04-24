import styled from "styled-components";
import { SubscribeButtonProps } from "../../constants";
import plusSymbol from "../../../img/plusSymbol.svg";

function SubscribeButton({ name, onSubscribe, onUnsubscribe, isSubscribed }: SubscribeButtonProps) {
  return (
    <>
      {isSubscribed ? (
        <ClickButton onClick={() => onUnsubscribe(name)}>
          <UnsubscribeImage src={plusSymbol} />
        </ClickButton>
      ) : (
        <ClickButton onClick={() => onSubscribe(name)}>
          <PlusImage src={plusSymbol} />
          <div>구독하기</div>
        </ClickButton>
      )}
    </>
  );
}

const ClickButton = styled.button`
  height: 20px;
  background-color: #fff;
  border: 1px solid #d2dae0;
  border-radius: 50px;
  color: #879298;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

const PlusImage = styled.img`
  width: 12px;
  height: 12px;
  margin-left: -4px;
  margin-right: 2px;
`;

const UnsubscribeImage = styled.img`
  width: 12px;
  height: 12px;
  margin-left: -4px;
  margin-right: 2px;
  position: relative;
  left: 3px;
  transform: rotate(45deg);
`;

export default SubscribeButton;
