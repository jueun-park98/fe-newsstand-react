import styled from "styled-components";
import { LogoBoxProps } from "../../constants";
import plusSymbol from "../../../img/plusSymbol.svg";

const isEmptyObject = (object: object) => Object.keys(object).length === 0;

function LogoBox({ logo, onSubscribe, onUnsubscribe, isSubscribed }: LogoBoxProps) {
  return (
    <Box>
      {!isEmptyObject(logo) && (
        <>
          <Logo src={logo.src} name={logo.name} />
          {isSubscribed ? (
            <SubscribeButton onClick={() => onUnsubscribe(logo.name)}>
              <UnsubscribeImage src={plusSymbol} />
            </SubscribeButton>
          ) : (
            <SubscribeButton onClick={() => onSubscribe(logo.name)}>
              <PlusImage src={plusSymbol} />
              <div>구독하기</div>
            </SubscribeButton>
          )}
        </>
      )}
    </Box>
  );
}

const Box = styled.div`
  width: 100%;
  height: 6.8928em;
  display: flex;
  justify-content: center;
  align-items: center;
  outline: 0.0714em solid #d2dae0;

  &:hover > img {
    display: none;
  }

  &:hover > button {
    display: flex;
    position: absolute;
    justify-content: center;
    align-items: center;
  }
`;

const Logo = styled.img<{ name: string }>`
  height: 1.4286em;
`;

const SubscribeButton = styled.button`
  height: 20px;
  background-color: #fff;
  border: 1px solid #d2dae0;
  border-radius: 50px;
  color: #879298;
  display: none;
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

export default LogoBox;
