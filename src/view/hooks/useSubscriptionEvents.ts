import { useContext } from "react";
import useSubscription from "../hooks/useSubscription";
import { NewsContext } from "../components/provider/NewsProvider";

export function useSubscriptionEvents() {
  const [{ news, subscription }] = useContext(NewsContext);
  const { postSubscriptionMutation, deleteSubscriptionMutation } = useSubscription();

  const handleSubscribeClick = async (logoName: string) => {
    const newsItem = news.find((item) => item.pressName === logoName);
    if (!newsItem) {
      console.error(`${logoName} 언론사를 찾지 못했습니다.`);
      return;
    }
    postSubscriptionMutation.mutate(newsItem);
  };

  const handleUnsubscribeClick = async (logoName: string) => {
    const subscriptionItem = subscription?.find((item) => item.pressName === logoName);
    if (!subscriptionItem) {
      console.error(`${logoName} 언론사를 찾지 못했습니다.`);
      return;
    }
    deleteSubscriptionMutation.mutate(subscriptionItem._id);
  };

  return { handleSubscribeClick, handleUnsubscribeClick };
}
