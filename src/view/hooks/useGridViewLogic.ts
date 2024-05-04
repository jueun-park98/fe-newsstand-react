import { useContext, useEffect, useState } from "react";
import { useNavigation } from "../components/provider/NavigationProvider";
import { useSubscriptionEvents } from "./useSubscriptionEvents";
import { NewsContext } from "../components/provider/NewsProvider";
import useSubscribeStore from "./useSubscribeStore";
import usePageStore from "./usePageStore";
import { LOGO_COUNT_PER_PAGE, LogoState, MAX_PAGE, MENU_STATES, News } from "../constants";
import { calculateMaxPage } from "../utils/Utils";

const FIRST_PAGE = 0;

const shuffle: (array: News[]) => News[] = (array) =>
  [...array].sort((a, b) => Math.random() - 0.5);

const convertToLogo: (news: News) => LogoState = (news) => ({
  src: news.logoImageSrc,
  name: news.pressName,
});

const useGridViewLogic = () => {
  const { handleUnsubscribeClick } = useSubscriptionEvents();
  const { menuSelected } = useNavigation();
  const [{ news, subscription }] = useContext(NewsContext);
  const { showSnackBar, showAlert, alertMessage } = useSubscribeStore();
  const [logos, setLogos] = useState<LogoState[]>([]);
  const { page, subscriptionPage, setPage, setSubscriptionPage } = usePageStore();

  const togglePage = (page: number) => {
    menuSelected === MENU_STATES.allPress ? setPage(page) : setSubscriptionPage(page);
  };

  const getCurrentPage = () => (menuSelected === MENU_STATES.allPress ? page : subscriptionPage);

  useEffect(() => {
    if (menuSelected === MENU_STATES.allPress) {
      const logosToSave = shuffle(news)
        .slice(0, MAX_PAGE * LOGO_COUNT_PER_PAGE)
        .map(convertToLogo);
      setLogos(logosToSave);
      setPage(FIRST_PAGE);
    }
    if (menuSelected === MENU_STATES.subscribedPress) {
      const logosToSave = subscription.map(convertToLogo);
      setLogos(logosToSave);
      setSubscriptionPage(FIRST_PAGE);
      page > calculateMaxPage(logosToSave) - 1 && setPage(calculateMaxPage(logosToSave) - 1);
    }
  }, [news, subscription, menuSelected]);

  return {
    showSnackBar,
    showAlert,
    alertMessage,
    logos,
    subscription,
    handleUnsubscribeClick,
    togglePage,
    getCurrentPage,
  };
};

export default useGridViewLogic;
