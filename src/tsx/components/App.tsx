import { useContext, useEffect } from "react";
import Header from "./header/Header";
import RollingContainer from "./headline/RollingContainer";
import PressContainer from "./main/PressContainer";
import { fetchNews, fetchSubscription } from "../api/NewsAPI";
import { NewsContext } from "./provider/NewsProvider";
import { News } from "../constants";
import { SubscribeProvider } from "./provider/SubscribeProvider";

function App() {
  const [_, setNewsState] = useContext(NewsContext);

  useEffect(() => {
    const loadNews = async () => {
      const loadedNews = await fetchNews();
      const loadedSubscription = await fetchSubscription();
      setNewsState({ news: loadedNews as News[], subscription: loadedSubscription as News[] });
    };

    loadNews();
  }, []);

  return (
    <div>
      <Header />
      <RollingContainer />
      <SubscribeProvider>
        <PressContainer />
      </SubscribeProvider>
    </div>
  );
}

export default App;
