import { useContext, useEffect } from "react";
import Header from "./Header";
import RollingContainer from "./RollingContainer";
import PressContainer from "./PressContainer";
import { fetchNews } from "../api/NewsAPI";
import { NewsContext, NewsProvider } from "./NewsProvider";
import { News } from "./constants";

function App() {
  const [{ news, subscription }, setNewsState] = useContext(NewsContext);

  useEffect(() => {
    const loadNews = async () => {
      const loadedNews = await fetchNews();
      setNewsState({ news: loadedNews as News[], subscription });
    };

    loadNews();
  }, []);

  return (
    <div>
        <Header />
        <RollingContainer />
        <PressContainer />
    </div>
  );
}

export default App;
