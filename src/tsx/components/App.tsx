import React, { useEffect, useState } from "react";
import Header from "./Header";
import RollingContainer from "./RollingContainer";
import PressContainer from "./PressContainer";
import { fetchNews } from "../api/NewsAPI";
import { News } from "./constants";

function App() {
  const [news, setNews] = useState<News[]>([]);
  const [subscriptions, setSubscriptions] = useState<News[]>([]);

  useEffect(() => {
    loadNews(setNews);
  }, []);

  return (
    <div>
      <Header></Header>
      <RollingContainer news={news}></RollingContainer>
      <PressContainer news={news} subscriptions={subscriptions}></PressContainer>
    </div>
  );
}

const loadNews: (setFn: Function) => void = async (setFn) => {
  const loadedNews = await fetchNews();
  setFn(loadedNews);
};

export default App;
