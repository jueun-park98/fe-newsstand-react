import { useContext, useEffect } from "react";
import { useQuery } from "react-query";
import Header from "./header/Header";
import RollingContainer from "./headline/RollingContainer";
import PressContainer from "./main/wrapper/PressContainer";
import { fetchNews, fetchSubscription } from "../api/NewsAPI";
import { NewsContext } from "./provider/NewsProvider";
import { News } from "../constants";
import { NavigationProvider } from "./provider/NavigationProvider";

function App() {
  const [_, setNewsState] = useContext(NewsContext);

  const {
    data: loadedNews,
    error: newsError,
    isLoading: newsLoading,
  } = useQuery("news", fetchNews);
  const {
    data: loadedSubscription,
    error: subscriptionError,
    isLoading: subscriptionLoading,
  } = useQuery("subscription", fetchSubscription);

  useEffect(() => {
    if (!newsLoading && !subscriptionLoading && !newsError && !subscriptionError) {
      setNewsState({ news: loadedNews as News[], subscription: loadedSubscription as News[] });
    }
  }, [
    loadedNews,
    loadedSubscription,
    newsLoading,
    subscriptionLoading,
    newsError,
    subscriptionError,
  ]);

  if (newsLoading || subscriptionLoading) return <div>Loading...</div>;
  if (newsError || subscriptionError) {
    console.error(`Server request failed!: ${newsError || subscriptionError}`);
    return <div>Error!</div>;
  }

  return (
    <div>
      <Header />
      <RollingContainer />
      <NavigationProvider>
        <PressContainer />
      </NavigationProvider>
    </div>
  );
}

export default App;
