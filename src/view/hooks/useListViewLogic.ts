import { useContext, useEffect, useState } from "react";
import { useNavigation } from "../components/provider/NavigationProvider";
import usePageStore from "./usePageStore";
import { useSubscriptionEvents } from "./useSubscriptionEvents";
import { NewsContext } from "../components/provider/NewsProvider";
import useSubscribeStore from "./useSubscribeStore";
import { MENU_STATES, News } from "../constants";
import { decreaseIndex, increaseIndex } from "../utils/Utils";

const FIRST_INDEX = 0;

const useListViewLogic = () => {
  const { page, subscriptionPage, setPage, setSubscriptionPage } = usePageStore();
  const { handleUnsubscribeClick } = useSubscriptionEvents();
  const { menuSelected } = useNavigation();
  const [{ news, subscription }] = useContext(NewsContext);
  const { showSnackBar, showAlert } = useSubscribeStore();
  const [newsItem, setNewsItem] = useState<News>(news[page]);

  const togglePage = (
    pageType: "page" | "subscriptionPage",
    operation: "increase" | "decrease"
  ) => {
    const currentPage = pageType === "page" ? page : subscriptionPage;
    const totalLength = pageType === "page" ? news.length : subscription.length;
    const updatedPage =
      operation === "increase"
        ? increaseIndex(currentPage, totalLength)
        : decreaseIndex(currentPage, totalLength);

    pageType === "page" ? setPage(updatedPage) : setSubscriptionPage(updatedPage);
  };

  const handlePageClick = (operation: "increase" | "decrease") => {
    if (menuSelected === MENU_STATES.allPress) togglePage("page", operation);
    if (menuSelected === MENU_STATES.subscribedPress) togglePage("subscriptionPage", operation);
  };

  useEffect(() => {
    if (menuSelected === MENU_STATES.allPress) setNewsItem(news[page]);
    if (menuSelected === MENU_STATES.subscribedPress) setNewsItem(subscription[subscriptionPage]);
    if (subscriptionPage >= subscription.length) {
      togglePage("subscriptionPage", "increase");
      setNewsItem(subscription[FIRST_INDEX]);
    }
  }, [news, subscription, menuSelected, page, subscriptionPage]);

  return {
    showSnackBar,
    showAlert,
    newsItem,
    menuSelected,
    news,
    subscription,
    handlePageClick,
    handleUnsubscribeClick,
  };
};

export default useListViewLogic;
