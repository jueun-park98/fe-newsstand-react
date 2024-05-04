import styled from "styled-components";
import plusSymbol from "../../../../img/plusSymbol.svg";
import { useSubscriptionEvents } from '../../../hooks/useSubscriptionEvents';
import useSubscribeStore from '../../../hooks/useSubscribeStore';

interface SubscribeButtonProps {
  name: string;
  isSubscribed: boolean;
}

function SubscribeButton({ name, isSubscribed }: SubscribeButtonProps) {
  const { handleSubscribeClick } = useSubscriptionEvents(); 
  const { setShowAlert, setAlertMessage } = useSubscribeStore();

  const handleUnsubscribeButtonClick = (name: string) => {
    setShowAlert(true);
    setAlertMessage(name);
  };

  return (
    <>
      {isSubscribed ? (
        <ClickButton onClick={() => handleUnsubscribeButtonClick(name)}>
          <UnsubscribeImage src={plusSymbol} />
        </ClickButton>
      ) : (
        <ClickButton onClick={() => handleSubscribeClick(name)}>
          <PlusImage src={plusSymbol} />
          <div>구독하기</div>
        </ClickButton>
      )}
    </>
  );
}

const ClickButton = styled.button`
  height: 1.4286em;
  background-color: #fff;
  border: 0.0714em solid #d2dae0;
  border-radius: 3.5714em;
  color: #879298;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

const PlusImage = styled.img`
  width: 0.8571em;
  height: 0.8571em;
  margin-left: -0.2857em;
  margin-right: 0.1429em;
`;

const UnsubscribeImage = styled.img`
  width: 0.8571em;
  height: 0.8571em;
  margin-left: -0.2857em;
  margin-right: 0.1429em;
  position: relative;
  left: 0.2143em;
  transform: rotate(45deg);
`;

export default SubscribeButton;
